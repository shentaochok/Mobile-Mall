const mongoose=require('mongoose')
const db='mongodb://127.0.0.1:27017/smileVue'
const glob=require('glob')
const {resolve}=require('path')

exports.connect=()=>{
     return new Promise((resolve,reject)=>{
          let maxConnectTimes=3;
          mongoose.connect(db,{useNewUrlParser:true})
          mongoose.connection.on('error',function(){
              if(maxConnectTimes==0){
                  reject()
                  throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
              }else{
                maxConnectTimes--;
                mongoose.connect(db,{useNewUrlParser:true})
              }
          })
          mongoose.connection.on('disconnected',function(){
            if(maxConnectTimes==0){
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }else{
              maxConnectTimes--;
              mongoose.connect(db,{useNewUrlParser:true})
            }
        })
        mongoose.connection.once('open',function(){
             console.log("服务端开启成功");
             resolve()
        })
     })
}
exports.initDatabase=()=>{
     glob.sync(resolve(__dirname,'./Schema/','**/*.js')).forEach(require)
}