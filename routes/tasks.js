/**
 * Created by michal on 13.05.17.
 */
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds025459.mlab.com:25459/smoothie',['mailing_list']);

router.get('/mailing_list', function (req, res, next) {
    db.mailing_list.find(function (err, mailing_list) {
        if(err){
            res.send(err);
        }
        res.json(mailing_list);
    });
})

module.exports = router;