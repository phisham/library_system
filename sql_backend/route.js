var mysql=require('mysql');
const express=require('express');
const e = require('express');
const router =express.Router();

var con=mysql.createConnection({

    user:"phisham100",
    password:"Hisham@20",
    database:"sql_project"
});

router.post('/create',async(req,res)=>{
    var token;
    con.query("select count(*) as cnt from library",(err,result)=>{
            if(err) return res.json(err);
            console.log(result[0].cnt);
            token=result[0].cnt;
            token+=1000;
            con.query(`insert into library VALUES('${req.body.bookName}','${req.body.author}',${token})`,(err,result)=>{
                if(err) return res.json(err);
                return res.json("book added to library");
            })
    })
    
})

router.post('/createn',async(req,res)=>{
    con.query(`delete from oldStock`,(err,result)=>{
        if(err) return res.json(err);
        return res.json("created");
    })
})

router.post('/newStock',async(req,res)=>{
    con.query(`insert into newStock VALUES('${req.body.bookName}','${req.body.token}','${req.body.stockNumber}')`,(err,result)=>{
        if(err) return res.json(err);
        return res.json("new stock added");
    })
})

router.post('/oldStock',async(req,res)=>{
    con.query(`insert into oldStock VALUES('${req.body.bookName}','${req.body.token}','${req.body.stockNumber}')`,(err,result)=>{
        if(err) return res.json(err);
        return res.json("old stock added");
    })
})

router.get('/',(req,res)=>{
    res.send("Working!!");
})
router.post('/priceList',async(req,res)=>{
    con.query(`insert into priceList VALUES('${req.body.bookName}',${req.body.price})`,(err,result)=>{
        if(err) return res.json(err);
        return res.json("price added");
    })
})

router.post('/issued',async(req,res)=>{
    var isno;
    con.query("select count(*) as cnt from issued",(err,result)=>{
            if(err) return res.json(err);
            console.log(result[0].cnt);
            isno=result[0].cnt;
            isno+=800;
            con.query(`insert into issued VALUES('${req.body.bookName}',${isno})`,(err,result)=>{
                if(err) return res.json(err);
                return res.json("price added");
            })
    })
    
})
router.get('/getOldStock',async(req,res)=>{
    
    con.query("select * from oldStock",(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);

    })
})

router.get('/getNewStock',async(req,res)=>{
    
    con.query("select * from newStock",(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);

    })
})

router.get('/getPriceList',async(req,res)=>{
    
    con.query("select * from priceList",(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);

    })
})
router.get('/getIssued',async(req,res)=>{
    
    con.query("select * from issued",(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);

    })
})
router.get('/getAllData',async(req,res)=>{
    
    con.query("select * from library",(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);

    })
})

router.delete('/delete/:token',(req,res)=>{
    
    con.query(`Delete from library WHERE token=${req.params.token}`,(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);
    })
})

router.delete('/deleteAll',(req,res)=>{
    
    con.query(`Delete from library`,(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);
    })
})
router.patch('/update/:token',(req,res)=>{
    const token=req.params.token;
    console.log(token);
    con.query(`UPDATE library SET bookName='${req.body.bookName}',author='${req.body.author}' WHERE token=${token}`,(err,result)=>{
            if(err) return res.json(err);
            console.log(result);
            return res.json(result);
    })
})
module.exports=router;