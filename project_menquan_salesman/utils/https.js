var rootDocment = 'https://mengquan.live/salesman';

function post(url, data, callback) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'GET', //大写
    header: {
      'Content-Type': 'application/json'
    },
    success(res) {
      callback(null, res)
    },
    fail(e) {
      console.error(e)
      callback(e)
    }
  })
}


module.exports = {
  post: post
}