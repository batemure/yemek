var express 		= require("express"),
	 app 			= express(),
	 bodyParser 	= require("body-parser"),
	 mongoose 		= require("mongoose"),
	 Yemek 			= require("./models/yemek"),
	 Yorum 			= require("./models/yorum"),
	 cerezData		= require("./cerez");

mongoose.connect("mongodb://localhost/yemekSitesi");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

cerezData();
// ============HOME==============
app.get("/",function(req,res){
	res.render("home");
});

app.get("/yemekler",function(req,res){
	Yemek.find({},function(err,yemeklerDB){
		if(err){
			console.log(err);
		}else{
			res.render("yemekler/yemekler",{yemekler:yemeklerDB});
		}
	});
	
});

app.post("/yemekler",function(req,res){
	Yemek.create(req.body.yeniYemek,function(err,yeniOlusturulmusYemek){
		if(err){
			console.log(err);
		}else{

			res.redirect("/yemekler");
		}
	})
});

app.get("/yemekler/yeni",function(req,res){
	res.render("yemekler/yeni");
});

app.get("/yemekler/:id",function(req,res){
	Yemek.findById(req.params.id).populate("yorumlar").exec(function(err,bulunanYemek){
		if(err){
			console.log(err);
		}else{
			res.render("yemekler/listeleme",{yemek:bulunanYemek});
		}
	});	
});


// ============YORUM ROUTE===============
app.get("/yemekler/:id/yorumlar/yeni", function(req,res){
	Yemek.findById(req.params.id,function(err,bulunanYemek){
		if(err){
			console.log(err);
		}else{
			res.render("yorumlar/yeni",{yemek : bulunanYemek});
		}
	});
});

app.post("/yemekler/:id/yorumlar", function(req,res){
	Yemek.findById(req.params.id,function(err,bulunanYemek){
		if(err){
			console.log(err);
			res.redirect("/yemekler");
		}else{
			Yorum.create(req.body.yorum,function(err, yorum){
				bulunanYemek.yorumlar.push(yorum);
				bulunanYemek.save();
				res.redirect("/yemekler/" + bulunanYemek._id);
			});
		}
	});
});




// ===================================================
var server = app.listen(3000,function(){
	console.log("Sunucu Portu : %d", server.address().port);
});
