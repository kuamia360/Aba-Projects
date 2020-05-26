var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');//*
const Data = require('./data');//*


const dbRoute =
    'mongodb+srv://kuamUser:pleaseworkk@cluster0-hfgd9.mongodb.net/test?retryWrites=true&w=majority';//*
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });//*
let db = mongoose.connection;//*

db.once('open', () => console.log('connected to the database'));//*

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//*


// GET users listing.
router.get('/', function (req, res, next) {
    Data.find(function(err,data){
        if(err){
            return res.json({success: false, error:err});
        }else{
            return res.json({success:true, info: data})
        }
    });
    
});

//Post 
router.post('/', function (req, res, next) {
    let p = new Data();
    p.name = req.body.name;
    p.genre = req.body.genre;
    p.season = req.body.season;
    p.character = req.body.character;
    p.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


//Delete
router.delete('/', function (req, res, next) {
    Data.findOneAndRemove({name: req.body.name}, (err)=>{
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

});

//put or update
router.put('/', function (req, res, next) {
    Data.updateOne({name: req.body.name}, {season: req.body.season}, (err)=>{
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

});


module.exports = router;
