/**
 * Created by michal on 13.05.17.
 */
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds025459.mlab.com:25459/smoothie',['mailing_list']);

// Get All addresses
router.get('/mailing_list', function (req, res, next) {
    db.mailing_list.find(function (err, mailing_list) {
        if(err){
            res.send(err);
        }
        res.json(mailing_list);
    });
})

//Get single address
router.get('/mailing_list/:id', function (req, res, next) {
    db.mailing_list.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, email_address) {
        if(err){
            res.send(err);
        }
        res.json(email_address);
    });
})

// Email validation
function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

//Save email address
router.post('/mailing_list', function (req, res, next) {
    var address = req.body;
    if(!address.name || !validateEmail(address.email)){
        res.status(400);
        res.json({
            "error": "Username or mail is not correct"
        })
    }else{
        db.mailing_list.save(address,function (err, address) {
            if(err){
                res.send(err);
            }
            res.json(address);
        });
    }
})
module.exports = router;