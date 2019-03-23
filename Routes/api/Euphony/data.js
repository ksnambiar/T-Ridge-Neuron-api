let express = require('express')
let router = express.Router();
let bip39 = require('bip39');
let uuid1 = require('uuid/v1');
let uuid4 = require("uuid/v4");
let md5 = require('crypto-js/md5');
const {getData,allData }= require('../../../Block_Actions/block_state_retrieve');
const transact = require('../../../Block_Actions/block_transaction_dispatch');

let config = require('./config')
//intro route
router.get("/",(req,res)=>{
  res.status(200).json({message:"euphony data handling route"})
})
//all data route
router.get("/allData",(req,res)=>{
  getData(config.uid).then(obj=>{
    res.status(200).json({data:obj})
  }).catch(err=>{
    res.status(400).json({error:err})
  })
})
router.get("/content/:id",(req,res)=>{
  getData(config.uid).then(obj=>{
    let keys=Object.keys(obj.contents)
    let found=0
    for(var i=0;i<keys.length;++i){
      if(req.params.id===keys[i]){
        found=1
      }
    }
    if(found===1){
      res.status(200).json({data:obj.contents[req.params.id]})
    }else{
      res.status(404).json({error:"content not found"})
    }
  }).catch(err=>{
    res.status(400).json({error:err})
  })
})

// adding contents
router.post('/addContent',(req,res)=>{
  const data1=req.body
  let parcel = {
    type:"addData",
    uid:config.uid,
    name:"contents",
    data:data1
  }
  transact(parcel).then(obj=>{
    res.status(200).json({det:obj})
  }).catch(err=>{
    res.status(400).json({err:error})
  })
  res.status(200)
})


module.exports = router
