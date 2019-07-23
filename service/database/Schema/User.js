const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectId=Schema.Types.ObjectId
const bcrypt=require('bcrypt')

let UserSchema=new Schema({
     userId:ObjectId,
     username:String,
     password:String,
     createAt:{type:Date,default:Date.now()},
     lastLoginAt:{type:Date,default:Date.now()}
})

UserSchema.pre('save',function(next){
     bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            next();
        })
     })
})
UserSchema.method('compare',function(password,_password){
     return new Promise((resolve,reject)=>{
          bcrypt.compare(password,_password,(err,res)=>{
             if(!err){
                 console.log(_password,password)
                 resolve(res)
             }else{
                 reject(err)
             }
          })
     })
})
const User=mongoose.model("User",UserSchema)