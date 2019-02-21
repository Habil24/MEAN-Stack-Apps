
var mongoose = require('mongoose');
var userSchema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: {type:String,lowerCase:true,required:true, unique: true},
    password: {type:String,required: true},
    email:{type:String,required:true,lowerCase:true,unique:true}
});

userSchema.pre('save', function(next) {
    // do stuff
    var user = this;
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err){
            return next(err);
        }
        user.password = hash;
    });
    next();
  });

module.exports = mongoose.model('User',userSchema);