<template>
    <div>
      <!-- 车牌号   -->
      <van-field center readonly v-model="value" :label="ytTitle" :placeholder="ytPlaceholder" :required="ytStar" :maxlength="8" :error="ytError" @touchstart.native.stop="carKeyBoardShow = true"></van-field>
      <!-- 车牌键盘   -->
      <van-popup
        v-model="carKeyBoardShow"
        closeable
        round
        close-icon="cross"
        :overlay=false
        position="bottom"
        :style="{ height: '16rem', 'padding-top': '3rem'}"
      >
        <!--汉字选择-->
        <div v-if="keyBoardType === 1">
          <div>
            <van-button class="vat-button" size="mini" v-for="(item,index) in provinces[0]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
          </div>
          <div class="mT14_z">
            <van-button class="vat-button" size="mini" v-for="(item,index) in provinces[1]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
          </div>
          <div class="mT14_z">
            <van-button class="vat-button" size="mini" v-for="(item,index) in provinces[2]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
          </div>
          <div class="mT14_z">
            <van-button class="vat-button" size="mini" color="#AAB2BA" style="min-width: 12%;" @click="onSwitchKey()">切换</van-button>
            <van-button class="vat-button" size="mini" v-for="(item,index) in provinces[3]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
            <van-button class="vat-button del" size="mini" color="#AAB2BA" style="min-width: 12%;" @click="onDeleteKey()">&nbsp;</van-button>
          </div>
        </div>
        <!--字母数字选择-->
        <div v-if="keyBoardType === 2">
          <div>
            <van-button class="vat-button" size="mini" v-for="(item,index) in numLetters[0]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
          </div>
          <div class="mT14_z">
            <van-button class="vat-button" size="mini" v-for="(item,index) in numLetters[1]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
          </div>
          <div class="mT14_z">
            <van-button class="vat-button" size="mini" v-for="(item,index) in numLetters[2]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
          </div>
          <div class="mT14_z">
            <van-button class="vat-button" size="mini" color="#AAB2BA" style="min-width: 12%;" @click="onSwitchKey()">切换</van-button>
            <van-button class="vat-button" size="mini" v-for="(item,index) in numLetters[3]" @click="selectPlate(item)" :key="index">{{ item }}</van-button>
            <van-button class="vat-button del" size="mini" color="#AAB2BA" style="min-width: 12%;" @click="onDeleteKey()">&nbsp;</van-button>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<script>
export default {
  name: 'CarNum',
  model: {
    prop: 'modelValue',
    event: 'valueChange'
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    ytTitle: String,
    ytPlaceholder: {
      type: String,
      default: '请输入车牌号码'
    },
    ytStar: {
      type: Boolean,
      default: false
    },
    ytError: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: this.modelValue,
      keyBoardType: 1,
      carKeyBoardShow: false,
      provinces: [
        ['蒙', '京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑'],
        ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤'],
        ['琼', '川', '云', '贵', '陕', '甘', '青', '桂', '宁', '信'],
        ['藏', '港', '澳', '学', '警', '领', '挂']
      ],
      numLetters: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ]
    }
  },
  watch: {
    value (val) {
      // console.log(val)
      this.$emit('valueChange', val)
    }
  },
  methods: {
    // 键盘切换
    onSwitchKey () {
      if (this.value.length > 0) {
        if (this.keyBoardType === 1) {
          this.keyBoardType = 2
        } else {
          this.keyBoardType = 1
        }
      }
    },
    // 删除号码
    onDeleteKey () {
      this.value = this.value.substring(0, this.value.length - 1)
      // 清空键盘切换到省份键盘
      if (this.value.length === 0) {
        this.keyBoardType = 1
      }
    },
    // 号码选择
    selectPlate (item) {
      if (this.value.length < 8) {
        this.value += item
      }
      // 输入完省市，切换键盘
      if (/[\u4E00-\u9FA5]/i.test(item)) {
        this.onSwitchKey()
      }
    }
  }
}
</script>

<style scoped>
  /** 车牌号码 */
  .mT14_z {
    margin-top: 0.77778rem;
  }
  .van-popup {
    background-color: #f2f3f5 !important;
    padding-top: .2rem;
    text-align: center;
  }
  .van-button--mini {
    min-width: 8.8%;
    height: 50px;
    font-size: 16px;
  }
  .vat-button {
    border-radius: 4px;
  }
  .van-button--default {
    border: 0 solid #FFFFFF !important;
  }
  .del {
    background-image: url(../../static/img/del.png)!important;
    background-repeat:no-repeat!important;
    background-position:center!important;
    background-size:23px!important;
  }
</style>
