// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env:'cloud1-3g5lz5kx4a8e9ad1',
        traceUser: true,
      });
    }

	this.globalData = {};
	const db=wx.cloud.database()
	db.collection('user').get().then(res=>{
		console.log(res)
		var placelist={}
		var imagelist={}
		var namelist={}
		var pricelist={}
		var imagelist={}
		var itemlist={}
		var reslist=res.data
		reslist.forEach(element => {
			namelist[element._id]=element.name
			imagelist[element._id]=element.image
			wx.setStorageSync('namelist', namelist)
			wx.setStorageSync('imagelist', imagelist)

		});
	})
  }
});
