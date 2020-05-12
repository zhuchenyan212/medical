let requestLoading = function(url, data, method) {
  return new Promise((resolve) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      "content-type": "application/x-www-form-urlencoded",
      success: function(res) {
        resolve(res)
      },
    })
  })
}

module.exports = {
  requestLoading
}