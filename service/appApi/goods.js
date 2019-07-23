const Router=require('koa-router')
const router=new Router()
const mongoose=require('mongoose')
const fs=require('fs')

router.get('/insertAllGoodsInfo',async ctx=>{
    ctx.body='开始导入数据';
    fs.readFile('./data_json/newGoods.json','utf8',function(err,data){
         data=JSON.parse(data);
         let saveCount=0;
         const Goods=mongoose.model('Goods')
         data.map((item)=>{
             let newGoods=new Goods(item)
             newGoods.save().then(()=>{
                saveCount=saveCount+1;
                console.log('成功')
             }).catch(err=>{
                 console.log('失败'+err)
             })
         })
    })
})
router.get('/insertCategory',async ctx=>{
    ctx.body="开始导入分类的数据";
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
         data=JSON.parse(data);
         let saveCount=0;
         const Category=mongoose.model('Category');
         data.RECORDS.map(item=>{
               let newCategory=new Category(item);
               newCategory.save().then(()=>{
                   console.log("成功")
                   saveCount=saveCount+1;
               }).catch(err=>{
                   console.log(err)
               })
         })
    })
})
router.get('/insertCategorySub',async ctx=>{
    ctx.body="开始导入大类";
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
         data=JSON.parse(data);
         let saveCount=0;
         const CategorySub=mongoose.model('CategorySub');
         data.RECORDS.map(item=>{
               let newCategory=new CategorySub(item);
               newCategory.save().then(()=>{
                   console.log("成功")
                   saveCount=saveCount+1;
               }).catch(err=>{
                   console.log(err)
               })
         })
    })
})
router.post('/getDetailGoodInfo',async ctx=>{
    let goodsId=ctx.request.body.goodsId;
    const Goods=mongoose.model('Goods');
    await Goods.findOne({ID:goodsId}).then(res=>{
            ctx.body={
                code:200,
                message:res
            }
    }).catch(err=>{
        console.log(err)
    })
})
router.get('/getCategory',async ctx=>{
    const Category=mongoose.model('Category');
    await Category.find().then(res=>{
         ctx.body={
             code:200,
             message:res
         }
    }).catch(err=>{
        ctx.body={
            code:500,
            message:err
        }
    })
})
router.post('/getCategorySub',async ctx=>{
    let subId=ctx.request.body.subId;
    const CategorySub=mongoose.model('CategorySub');
    await CategorySub.find({MALL_CATEGORY_ID:subId}).then(res=>{
         ctx.body={
             code:200,
             message:res
         }
    }).catch(err=>{
        ctx.body={
            code:500,
            message:err
        }
    })
})
router.post('/getCategoryGoods',async ctx=>{
    let goodsId=ctx.request.body.goodsId;
    let num=10;
    let page=ctx.request.body.page;
    let start=(page-1)*num;
    const CategorySub=mongoose.model('Goods');
    await CategorySub.find({SUB_ID:goodsId}).skip(start).limit(num).then(res=>{
         ctx.body={
             code:200,
             message:res
         }
    }).catch(err=>{
        ctx.body={
            code:500,
            message:err
        }
    })
})
router.post('/searchGoods',async ctx=>{
    let word=ctx.request.body.word;
    let num=10;
    let page=ctx.request.body.page;
    let start=(page-1)*num;
    const CategorySub=mongoose.model('Goods');
    await CategorySub.find({NAME:{$regex:word}}).skip(start).limit(num).then(res=>{
        ctx.body={
            code:200,
            message:res
        }
   }).catch(err=>{
       ctx.body={
           code:500,
           message:err
       }
   })
})
module.exports=router;