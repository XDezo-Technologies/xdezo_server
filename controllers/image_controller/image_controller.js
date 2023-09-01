const Offer = require("../../models/offers_model/offer_model.js");

exports.getFile=function(req,res){
    res.download('../assets/images/'+req.params.path);
    console.log(req.params.path);
}