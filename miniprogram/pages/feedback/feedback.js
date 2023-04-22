const db = wx.cloud.database();
const _ = db.command;
let app = getApp()
Page({
    data: {
        list: [],
        imagelist: wx.getStorageSync('imagelist'),
        namelist: wx.getStorageSync('namelist'),
    },
    onShow() {
        wx.showLoading({
            title: '正在加载',
        })
        const db = wx.cloud.database()
        db.collection('user').get().then(res => {
            console.log(res)
            var placelist = {}
            var imagelist = {}
            var namelist = {}
            var pricelist = {}
            var imagelist = {}
            var itemlist = {}
            var reslist = res.data
            reslist.forEach(element => {
                namelist[element._id] = element.name
                imagelist[element._id] = element.image
                wx.setStorageSync('namelist', namelist)
                wx.setStorageSync('imagelist', imagelist)
                this.setData({
                    namelist,
                    imagelist,
                })
            });
        })
        db.collection('feedback').get().then(res => {
            console.log(res)
            this.setData({
                list: res.data
            })
            wx.hideLoading()
        })
    },
    input(e) {
        console.log(e)
        this.setData({
            content: e.detail.value
        })
    },
    submit(e) {
        console.log(e)
        var content = e.detail.value

        var loginid = wx.getStorageSync('loginId')
        this.setData({
            loginid,
        })
        db.collection('user').doc(loginid).get().then(res => {
            console.log(res)
            var test = res.data
            var arr = []
            arr.push(res.data.image)
            this.setData({
                res: res.data,
                imgUrl: arr //头像
            })
            db.collection('feedback').add({
                data: {
                    content,
                    image: test.image,
                    name: test.name,
                    userid: test._id
                }
            }).then(Res => {
                wx.showToast({
                    title: '上传成功',
                    icon: "none"
                })
                this.onShow()
            })
        })

    }
})