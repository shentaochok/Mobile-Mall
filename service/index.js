const Koa=require('koa')
const app=new Koa()
const {connect,initDatabase} =require('./database/init.js')
const Router=require('koa-router')
const user=require('./appApi/user.js')
const good=require('./appApi/goods.js')
const cors=require('koa2-cors')
app.use(cors())
const bodyParser=require('koa-bodyparser')
app.use(bodyParser())

const router=new Router()

//立即执行函数
;(async ()=>{
    await connect();
    initDatabase()
})();
router.use('/good',good.routes(),good.allowedMethods())
router.use('/user',user.routes(),user.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
     console.log("服务开启成功");
})