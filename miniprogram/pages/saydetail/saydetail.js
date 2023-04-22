const db = wx.cloud.database();
const _ = db.command; // pages/saydetail/saydetail.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],
        time: ''
    },
    formatDate(time) {
        var date = new Date(time);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        // return YY + MM + DD + " " + hh + mm + ss;
        return YY + MM + DD;
    },
    toDetail(e) {
        const login = '1';
        if (login) {
            const { item } = e.currentTarget.dataset;
            // 第一种:
            wx.navigateTo({
              url: `../infoDetail/infoDetail?info=${JSON.stringify(item)}`,
            })
        
            // 第二种: 
            // wx.navigateTo({
            //   url: `../infoDetail/infoDetail?id=${item._id}`,
            // })
        } else {
            wx.showToast({
              title: '请去个人中心登录',
              icon: 'none'
            })
        }
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showLoading({
            title: '正在加载',
        })

        db.collection('publish').get().then(res => {
            console.log(res)
            this.setData({
                data: res.data,
                time: this.formatDate(res.data._createTime)
            })
            wx.hideLoading()
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})