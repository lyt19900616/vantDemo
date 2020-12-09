import Mock from 'mockjs'
// 获取列表信息
let { createList } = Mock.mock({
  'createList|0-36': [
    {
      id: '@increment()',
      title: '@ctitle(3,8)',
      content: '@cparagraph()',
      imgUrl: "@image('100x100', '#4169E1', '#FFFFFF', 'Mock')",
      createTime: '@date(yyyy-MM-dd)'
    }
  ]
})
Mock.mock(/\/list\/getList/, 'get', (options) => {
  const pageIndex = getQuery(options.url, 'pageIndex')
  const pageSize = getQuery(options.url, 'pageSize')
  const start = (pageIndex - 1) * pageSize
  const end = pageIndex * pageSize
  const totalPage = Math.ceil(createList.length / pageSize)
  const list = pageIndex > totalPage ? [] : createList.slice(start, end)
  return {
    status: 200,
    msg: '成功',
    list: list,
    total: createList.length
  }
})

// 用户登录
Mock.mock('/user/login', 'post', (options) => {
  console.log(options)
  return {
    status: 200,
    msg: '成功',
    result: JSON.parse(options.body)
  }
})
// 根据 query 获取传递的参数
const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (let i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')
      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}
