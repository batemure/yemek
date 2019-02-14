var mongoose 	= require("mongoose");
var Yemek 		= require("./models/yemek");
var Yorum 		= require("./models/yorum");

var data = [
	{
		adi:"test1",
		resim:"https://t4.ftcdn.net/jpg/00/70/25/31/240_F_70253118_CLtjwUYruTYS0COsrMszsk12IEIxb46d.jpg"
	},
	{
		adi:"test2",
		resim:"https://t3.ftcdn.net/jpg/00/92/72/74/240_F_92727406_ndLGzmV1P1X5FbbwPvbqpHGdfomBKHqy.jpg"
	},	
	{
		adi:"test3",
		resim:"https://t3.ftcdn.net/jpg/00/75/75/88/240_F_75758806_9lpzs9FdVB5bTQ8s1AxmYeFVMgDU8pe8.jpg"
	}
];

function cerezData(){
	Yemek.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("yemekler silindi.");
			data.forEach(function(degisken){
				Yemek.create(degisken, function(err, yemek){
					if(err) {
						console.log(err);
					}else{
						console.log("yeni yemek eklendi");
						Yorum.create({
							text:"Bur bir deneme yorumu.",
							yazar:"Batuhan Karaköse"
						}, function(err,yorum){
							if(err){
								console.log(err);
							}else{
								yemek.yorumlar.push(yorum);
								yemek.yorumlar.push(yorum);
								yemek.save();
								console.log("Yeni Yorum  eklendi");
							}
						});
					}
				});
			});
		}
	});
};

module.exports = cerezData;