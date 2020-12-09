var LINK = '://';
// 定义蓝信jssdk的LanxinJSBridge用于实现js对native的调用和native对js的调用
var LanxinJSBridge;
!function () {
    //	if (window.LanxinJSBridge) {
    if (LanxinJSBridge) {
        return;
    }
    var messagingIframe;
    // sendMessageQueue:为消息队列
    var sendMessageQueue = [];
    // native回调的消息队列
    var receiveMessageQueue = [];
    var messageHandlers = {};

    var CUSTOM_PROTOCOL_SCHEME = 'lt';
    var QUEUE_HAS_MESSAGE = '__has_msg__/';

    // native回调js的“回调方法定义”列表
    var responseCallbacks = {};
    var runtimeContext = {};
    var uniqueId = 1;


    function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
    }

    function isAndroid() {
        var ua = navigator.userAgent.toLowerCase();
        var isA = ua.indexOf("android") > -1;
        if (isA) {
            return true;
        }
        return false;
    }
    function isIphone() {
        var ua = navigator.userAgent.toLowerCase();
        var isIph = ua.indexOf("iphone") > -1;
        if (isIph) {
            return true;
        }
        return false;
    }
    function isWindow() {
        var ua = navigator.userAgent.toLowerCase();
        var Win = ua.indexOf("blueprintPC") > -1;
        if (Win) {
            return true;
        }
        return false;
    }
    // set default messageHandler
    function init() {
        if (LanxinJSBridge._messageHandler) {
            throw new Error('LanxinJSBridge.init called twice');
        }
        // 默认的回调方法
        LanxinJSBridge._messageHandler = function messageHandler(data, responseCallback) {
            alert(JSON.stringify(data));
        };
        var receivedMessages = receiveMessageQueue;
        receiveMessageQueue = null;
        for (var i = 0; i < receivedMessages.length; i++) {
            _dispatchMessageFromNative(receivedMessages[i]);
        }
    }
    // 保存消息到队列responseCallbacks中，同时通知native有新的消息，native通过IO函数去队列中取消息
    function send(data, responseCallback) {
        _doSend({
            data: data
        }, responseCallback);
    }
    function registerHandler(handlerName, handler) {
        messageHandlers[handlerName] = handler;
    }
    // handlerName:jssdk的API接口方法名
    // responseCallback：回调方法定义,注意：responseCallback是一个json，其内容为0~n个函数，供native选择调用
    function callHandler(handlerName, data, responseCallback) {
        var newData = {
            sign: handlerName,
            args: data
        };
        _doSend.call(this, {
            handlerName: 'IO',
            data: newData
        }, responseCallback);
    }
    // sendMessage add message, 触发native处理 sendMessage
    // message中有三个信息：接口名：handlerName；参数：data；消息的id：callbackId
    // 如果有responseCallback则给message增加一个callbackId，如果没有则直接放入消息队列，并通知native去取
    function _doSend(message, responseCallback) {
        if (responseCallback) {
            var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
            responseCallbacks[callbackId] = responseCallback;
            runtimeContext[callbackId] = this;
            message.callbackId = callbackId;
            responseCallback.currentFun = message.handlerName;
        }
        sendMessageQueue.push(message);

        /*if((window&&window.JsBridgeObject)||JsBridgeObject){
            var testValue1=document?document.title:'';
            var testValue2=event?event.target.id:'';
            JsBridgeObject.jsObjectCallBack(message.data.sign, message.data.args, responseCallback, callbackId,testValue1,testValue2);
        }else{
	   	messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + LINK+ QUEUE_HAS_MESSAGE;
        }*/
        try {
            //iOS新接口。通过handler直接传送数据
            if (window && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.JSBridge) {
                window.webkit.messageHandlers.JSBridge.postMessage(sendMessageQueue);
                sendMessageQueue = [];
                return;
            }

            //android使用crosswalk后新接口。
            if (window && window.JSBridge) {
                window.JSBridge.postMessage(JSON.stringify(message));
                sendMessageQueue = [];
                return;
            }

            var testValue1 = '';
            var testValue2 = '';
            try {
                testValue1 = document ? document.title : '';
                testValue2 = event ? event.target.id : '';
            } catch (e) { }
            JsBridgeObject.jsObjectCallBack(message.data.sign, JSON.stringify(message.data.args), callbackId, testValue1, testValue2);
        } catch (e) {
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + LINK + QUEUE_HAS_MESSAGE;
        }
    }

    //native调用js
    function nativeCallHandler(message) {
        console.log("js native send:" + JSON.stringify(message));
        if (message == null) return;
        if (!window.ltn) {
            var result = {
                responseId: message.callbackId,
                responseData: "ltn没有初始化！",
                status: "fail",
            }
            sendToNative(result);
        }
        var fun = window.ltn[message.handlerName];
        if (!fun) {
            var result = {
                responseId: message.callbackId,
                responseData: "没有此方法：" + message.handlerName,
                status: "fail",
            }
            sendToNative(result);
            return;
        }

        fun(message.data, function (successData) {
            if (message.callbackId == null) return;
            var result = {
                responseId: message.callbackId,
                responseData: successData,
                status: "success",
            }
            sendToNative(result);
        }, function (failData) {
            if (message.callbackId == null) return;
            var result = {
                responseId: message.callbackId,
                responseData: failData,
                status: "fail",
            }
            sendToNative(result);
        })
    }

    function sendToNative(message) {
        console.log("js native return :" + message);
        _doSend(message, null);
    }

    // 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url
    // shouldOverrideUrlLoading 的方式返回内容
    function _fetchQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        // add by hq

        if (isIphone()) {
            return messageQueueString;
            // android can't read directly the return data, so we can reload
            // iframe src to communicate with java
        } else if (isAndroid()) {
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + LINK + 'return/_fetchQueue/' + encodeURIComponent(messageQueueString);
        } else if (isWindow()) {
            bridge.notify(messageQueueString);
        } else {
            return messageQueueString;
        }

    }

    // 提供给native使用, 也就是native处理完之后回调jssdk的方法，并把返回的结果以messageJSON的格式返回
    // messageJSON中的内容：
    // responseId的值与callbackId一致
    function _dispatchMessageFromNative(messageJSON) {
        //		setTimeout(function() {
        //            alert('返回结果messageJSON：'+messageJSON);
        var message = messageJSON;
        if (typeof messageJSON == "string") {
            message = JSON.parse(messageJSON);
        }
        var responseCallback;
        var callerContext;
        // java call finished, now need to call js callback function
        if (message.responseId) {
            // 这里的responseCallback是个类
            responseCallback = responseCallbacks[message.responseId];
            callerContext = runtimeContext[message.responseId];
            if (!responseCallback) {
                return;
            }
            // 回调函数有多个时根据约定的status去取得相应的函数，如：status 为success
            // 则执行成功之后的函数，fail则执行失败后的回调函数
            // var callBackFun = eval("responseCallback." + message.status);
            var mesStatus = message.status;
            // native出现错误或者异常时，status置为error，直接由jsbridge抛出异常
            if ("error" == mesStatus) {
                _error(message.responseData);
                return;
            }
            var callBackFun = responseCallback[mesStatus];
            if (!callBackFun && mesStatus != 'cancel') {
                _error("no such callback function :" + mesStatus);
                return;
            }
            //				callBackFun(message.responseData);
            callBackFun.call(callerContext, message.responseData);
            if (message.sign != "initIdCardNfc") {
                  delete responseCallbacks[message.responseId];
                  delete runtimeContext[message.responseId];
            }
        } else if (message.callbackId) { //native call js
            nativeCallHandler(message);
        }
        //		});
    }
    // 提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null
    // receiveMessageQueue是native发给jssdk的消息队列，用于存储native返回的待处理的消息队列
    function _handleMessageFromNative(messageJSON) {
        if (receiveMessageQueue) {
            receiveMessageQueue.push(messageJSON);
            init();
        } /*
			 * else { _dispatchMessageFromNative(messageJSON); }
			 */
    }
    function _handleMenuFromNative(messageJSON) {
        alert('_handleMenuFromNative messageJSON:' + messageJSON);
        var message = JSON.parse(messageJSON);
        var responseCallback = menuHandlers[message.menuItem];
        if (!responseCallback) {
            return;
        }
        var mesStatus = message.status;
        // native出现错误或者异常时，status置为error，直接由jsbridge抛出异常
        if ("error" == mesStatus) {
            _error(message.responseData);
            return;
        }
        var callBackFun = responseCallback[mesStatus];
        if (!callBackFun && mesStatus != 'cancel') {
            _error("no such callback function :" + mesStatus);
            return;
        }
        if (LanxinJSBridge.debug) {
            message.responseData.errMsg = responseCallback.currentFun + ":ok";
            alert(JSON.stringify(message.responseData));
        }
        callBackFun(message.responseData);

    }
    function _error(mess) {
        if (!mess)
            alert("Unknown error");
        else
            alert(mess);
    }
    // 声明LanxinJSBridge对象
    try {
        if (window) {
            LanxinJSBridge = window.LanxinJSBridge = {
                debug: true,
                init: init,
                send: send,
                nativeSend: nativeCallHandler,
                registerHandler: registerHandler,
                callHandler: callHandler,
                _fetchQueue: _fetchQueue,
                _handleMessageFromNative: _handleMessageFromNative,
                _handleMenuFromNative: _handleMenuFromNative,
                _dispatchMessageFromNative: _dispatchMessageFromNative,
                _error: _error
            };
        }
    } catch (e) {
        LanxinJSBridge = {
            debug: true,
            init: init,
            send: send,
            nativeSend: nativeCallHandler,
            registerHandler: registerHandler,
            callHandler: callHandler,
            _fetchQueue: _fetchQueue,
            _handleMessageFromNative: _handleMessageFromNative,
            _handleMenuFromNative: _handleMenuFromNative,
            _dispatchMessageFromNative: _dispatchMessageFromNative,
            _error: _error
        };
    }

    try {
        var doc = document;
        _createQueueReadyIframe(doc);
    } catch (e) { }
}();
// /////////////////////////////////////////////下面定义供客户端程序调用的api////////////////////////////////////////
var lt = {
    wifiDeviceInfo: wifiDeviceInfo,   //网络接口
    chooseImage: chooseImage,        //拍照
    previewImage: previewImage,   //图片预览
    openVoiceRecorder: openVoiceRecorder,//开始录音
    openVoicePlayer: openVoicePlayer, //播放音频
    recordVideo: recordVideo,  //录视频接口
    openVideo: openVideo,  //播放视频接口
    getLocation: getLocation,  //获得当前地址接口
    selectLocation: selectLocation,  //选择地址接口
    displayLocation: displayLocation,  //选择地址接口
    scanQRCode: scanQRCode,  //扫码接口
    makeCode: makeCode,  //生成二维码或条形码接口
    handWrite: handWrite,  //手写签名接口
    getUserInfo: getUserInfo,  //获取系统信息接口
    checkNFC: checkNFC,  //NFC接口
    initIdCardNfc: initIdCardNfc, // 初始化NFC，用于身份核验
    setIdCardNfcQueryAddress : setIdCardNfcQueryAddress, // 设置身份核验app的查询地址
    setIdCardNfcVerifyAddress : setIdCardNfcVerifyAddress, // 设置身份核验app的校验地址
    checkBlueTooth: checkBlueTooth,  //蓝牙接口
    pickDate: pickDate,  //时间接口
    ajax: ajax,  //提交接口
    data: data,  //调用数据库接口
    registerMenu: registerMenu, //注册菜单并通知客户端创建菜单
    transferMess: transferMess, //转发
    recombineNotify: recombineNotify, //发送通知
    chooseReceiver: chooseReceiver, //选人接口
    exploreFile: exploreFile, //PC端查看本地文件
    getAppSetting: getAppSetting, //获取应用配置
    getExpressionValue: getExpressionValue, //表达式取数据接口
    setExpressionValue: setExpressionValue, //表达式存数据接口
    notifyInputEvent: notifyInputEvent, //传递用户行为接口
    notifySizeChanged: notifySizeChanged, //布局交互接口
    finish: finish, //结束接口
    IO: IO,//输入输出接口
    bpLog: bpLog,
    call: call, //电话
    sendSMS: sendSMS, //发短信
    sendWX: sendWX, //发微信
    error: error, //错误提示
    uploadBehaviorData: uploadBehaviorData, // 上传行为数据
    downloadFile: downloadFile, // 文件下载
    remoteData: remoteData, // 查询远端数据
    bpCloseWindow: bpCloseWindow, // 关闭当前 BrowserView
    uploadFiles: uploadFiles, //上传文件接口
    fileExist: fileExist, //判断文件是否存在
    openCard: openCard, //打开蓝名片
    openFile: openFile, //打开文件
    sendMessage: sendMessage, //发送消息到总线服务
    setStatusBar: setStatusBar, //配置状态栏
    shareMessage: shareMessage // 分享消息
};

// 网络接口
function wifiDeviceInfo(param) {
    formateJsonAndCallHander.call(this, "wifiDeviceInfo", param);
}
// 拍照
function chooseImage(param) {
    formateJsonAndCallHander.call(this, "chooseImage", param);
}
// 图片预览
function previewImage(param) {
    formateJsonAndCallHander.call(this, "previewImage", param);
}
// 开始录音接口
function openVoiceRecorder(param) {
    formateJsonAndCallHander.call(this, "openVoiceRecorder", param);
}
// 播放语音接口
function openVoicePlayer(param) {
    formateJsonAndCallHander.call(this, "openVoicePlayer", param);
}
// 录视频接口
function recordVideo(param) {
    formateJsonAndCallHander.call(this, "recordVideo", param);
}
// 播放视频接口
function openVideo(param) {
    formateJsonAndCallHander.call(this, "openVideo", param);
}
// 获得当前地址接口
function getLocation(param) {
    formateJsonAndCallHander.call(this, "getLocation", param);
}
// 选择地址
function selectLocation(param) {
    formateJsonAndCallHander.call(this, "selectLocation", param);
}
// 显示地址
function displayLocation(param) {
    formateJsonAndCallHander.call(this, "displayLocation", param);
}
// 扫码接口
function scanQRCode(param) {
    formateJsonAndCallHander.call(this, "scanQRCode", param);
}
// 生成二维码或条形码接口
function makeCode(param) {
    formateJsonAndCallHander.call(this, "makeCode", param);
}
// 手写签名接口
function handWrite(param) {
    formateJsonAndCallHander.call(this, "handWrite", param);
}
// 获取系统信息接口
function getUserInfo(param) {
    formateJsonAndCallHander.call(this, "getUserInfo", param);
}
// NFC接口
function checkNFC(param) {
    formateJsonAndCallHander.call(this, "checkNFC", param);
}
// 初始化NFC，用于身份核验
function initIdCardNfc(param) {
    formateJsonAndCallHander.call(this, "initIdCardNfc", param);
}
// 设置身份核验app的查询地址
function setIdCardNfcQueryAddress(param) {
    formateJsonAndCallHander("setIdCardNfcQueryAddress", param)
}
// 设置身份核验app的校验地址
function setIdCardNfcVerifyAddress(param) {
    formateJsonAndCallHander("setIdCardNfcVerifyAddress", param);
}
// 蓝牙接口
function checkBlueTooth(param) {
    formateJsonAndCallHander.call(this, "checkBlueTooth", param);
}
// 时间接口
function pickDate(param) {
    formateJsonAndCallHander.call(this, "pickDate", param);
}
// 提交接口
function ajax(param) {
    formateJsonAndCallHander.call(this, "ajax", param);
}
// 时间接口
function IO(param) {
    formateJsonAndCallHander.call(this, "IO", param);
}
// 调用数据库接口
function data(param) {
    formateJsonAndCallHander.call(this, "data", param);
}
// 转发
function transferMess(param) {
    formateJsonAndCallHander.call(this, "transferMess", param);
}
// 通知
function recombineNotify(param) {
    formateJsonAndCallHander.call(this, "recombineNotify", param);
}
// 选人接口
function chooseReceiver(param) {
    formateJsonAndCallHander.call(this, "chooseReceiver", param);
}
// PC端查看本地文件
function exploreFile(param) {
    formateJsonAndCallHander.call(this, "exploreFile", param);
}
// 获取应用配置
function getAppSetting(param) {
    formateJsonAndCallHander.call(this, "getAppSetting", param);
}
// 表达式取数据接口
function getExpressionValue(param) {
    formateJsonAndCallHander.call(this, "getExpressionValue", param);
}
// 表达式存数据接口
function setExpressionValue(param) {
    formateJsonAndCallHander.call(this, "setExpressionValue", param);
}
// 传递用户行为接口
function notifyInputEvent(param) {
    formateJsonAndCallHander.call(this, "notifyInputEvent", param);
}
// 布局交互接口
function notifySizeChanged(param) {
    formateJsonAndCallHander.call(this, "notifySizeChanged", param);
}
// 结束接口
function finish(param) {
    formateJsonAndCallHander.call(this, "finish", param);
}
//日志
function bpLog(param) {
    formateJsonAndCallHander.call(this, "bpLog", param);
}
function call(param) {
    formateJsonAndCallHander.call(this, "call", param);
}
function sendSMS(param) {
    formateJsonAndCallHander.call(this, "sendSMS", param);
}
function sendWX(param) {
    formateJsonAndCallHander.call(this, "sendWX", param);
}
// 上传文件接口
function uploadFiles(param) {
    formateJsonAndCallHander.call(this, "uploadFiles", param);
}
//判断资源是否存在
function fileExist(param) {
    formateJsonAndCallHander.call(this, "fileExist", param);
}
// 打开名片
function openCard(params) {
    formateJsonAndCallHander.call(this, "openCard", param);
}
function setStatusBar(param) {
    formateJsonAndCallHander.call(this,"setStatusBar",param);
}
// 注册菜单并通知客户端创建菜单
function registerMenu(param) {
    formateJsonAndCallHander("createMenu", param);
}
function error(param) {
    var res;
    if (param) {
        if (typeof (param) == "string")
            res = param;
        else if (typeof (param) == "object")
            res = param.errMsg;
        else if (typeof (param) == "function") {
            var json = {};
            json.success = param;
            formateJsonAndCallHander("error", json);
            return;
        }
        LanxinJSBridge._error(res);
    }
}

function uploadBehaviorData(param) {
    formateJsonAndCallHander.call(this, "uploadBehaviorData", param);
}

//文件下载接口
function downloadFile(param) {
    formateJsonAndCallHander.call(this, "downloadFile", param);
}

function remoteData(param) {
    formateJsonAndCallHander.call(this, "remoteData", param);
}

function bpCloseWindow(param) {
    formateJsonAndCallHander.call(this, "bpCloseWindow", param);
}

function openCard(param) {
    formateJsonAndCallHander.call(this, "openCard", param);
}
function openFile(param) {
    formateJsonAndCallHander.call(this, "openFile", param);
}

function sendMessage(param) {
    formateJsonAndCallHander.call(this, "sendMessage", param);
}

function setStatusBar(param) {
    formateJsonAndCallHander.call(this, "setStatusBar", param);
}

function shareMessage(param) {
    formateJsonAndCallHander.call(this, "shareMessage", param);
}

//名值对转换为字符串
function _params(data) {
    var arr = [];
    for (var k in data) {
        //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
        arr.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
    }
    return arr.join('&');
}
function formateJsonAndCallHander(handlerName, param) {
    var dataJson = {};
    for (var key in param) {
        var value = param[key];
        if (typeof (value) != "undefined" && typeof (value) != "function") {
            dataJson[key] = value;
        }
    }
    LanxinJSBridge.callHandler.call(this, handlerName, dataJson, param);
}

var ltn = {
    dbChanged: null,
    gotoRoot: null
}