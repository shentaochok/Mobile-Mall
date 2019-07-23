const Router=require('koa-router')
const router=new Router()
const mongoose=require('mongoose')

//用户模块
router.get('/',async ctx=>{
    ctx.body="用户的首页"
})
router.post('/register',async ctx=>{
    let data=ctx.request.body;
    let User=mongoose.model('User');
    let newUser=new User(data);
    await newUser.save().then(function(){
            ctx.body={
                code:200,
                message:"注册成功"
            }
    }).catch(()=>{
        ctx.body={
            code:500,
            message:"服务器异常"
        }
    })
})

router.post('/login',async ctx=>{
    let data=ctx.request.body;
    let username=data.username;
    let password=data.password;
    let User=mongoose.model('User');
    await User.findOne({username:username}).then(async res=>{
         if(res){
             let _password=res.password;
             let oneUser=new User();
            await oneUser.compare(password,_password).then(isMatch=>{
                   ctx.body={
                       code:200,
                       message:isMatch
                   }
             }).catch((err)=>{
                  ctx.body={
                      code:200,
                      message:err
                  }
             })
         }
         else{
            ctx.body={
                code:200,
                message:"不存在此用户"
            } 
         }
    })
})
module.exports=router;