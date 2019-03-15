let express = require('express')
let router = express.Router();
let bip39 = require('bip39');
let uuid1 = require('uuid/v1');
let md5 = require('crypto-js/md5');

const transact = require('../../../Block_Actions/block_transaction_dispatch');
const {getData,allData }= require('../../../Block_Actions/block_state_retrieve');
router.get('/',(req,res)=>{
  res.status(200).send("<div>Welcome to Ridge Storage Network</div>")
})
//getting the whole current state
router.get('/allData',(req,res)=>{
  allData().then(obj=>{
    res.status(200).json({data:obj})
  })
  .catch(err=>{
    res.status(400).json({error:err})
  })
})
//getting per userID
router.get('/userData/:uid',(req,res)=>{
  getData(req.params.uid).then(obj=>{
    res.status(200).json({data:obj})
  })
  .catch(err=>{
    res.status(400).json({error:err})
  })
})
//creating a new user
router.get('/createNewUser',(req,res)=>{
  let uid= uuid1()
  let mneumonic = bip39.generateMnemonic();
  let transaction_Block={
    uid:uid,
    type:"addUser",
    key:md5(mneumonic).toString()
  }
  transact(transaction_Block).then(obj=>{
    transaction_Block.key_phrase=mneumonic;
    res.status(200).json({data:obj,details:transaction_Block})
  }).catch(err=>{
    res.status(400).json({error:err})
  })
})

//creating a new branch
router.post('/createNewBranch',(req,res)=>{
  let transaction_Block={
    uid:req.body.uid,
    name:req.body.name,
    type:"addBranch"
  }
  transact(transaction_Block).then(obj=>{
    res.status(200).json({data:obj,details:transaction_Block})
  }).catch(err=>{
    res.status(400).json({error:err})
  })

})
//adding data to a branch
router.post('/addData',(req,res)=>{
  let transaction_Block={
    uid:req.body.uid,
    name:req.body.name,
    data:req.body.data,
    type:"addData"
  }
  transact(transaction_Block).then(obj=>{
res.status(200).json({data:obj,details:transaction_Block})
  }).catch(err=>{

    res.status(400).json({error:err})
  })

})

//erasing userID
router.get('/eraseUser/:uid',(req,res)=>{
  let block = {
    type:"deleteUser",
    uid:req.params.uid
  }
  transact(block).then(obj=>{
    res.status(200).json({data:obj})
  })
  .catch(err=>{
    res.status(400).json({error:err})
  })
})

//erase a branch completely
router.get('/eraseBranch/:uid/:name',(req,res)=>{
  let block = {
    type:"deleteBranch",
    uid:req.params.uid,
    branch:req.params.name
  }
  transact(block).then(obj=>{
    res.status(200).json({data:obj})
  })
  .catch(err=>{
    res.status(400).json({error:err})
  })
})

//erase data completely
router.get('/eraseBranch/:uid/:name/:key',(req,res)=>{
  let block = {
    type:"deleteData",
    uid:req.params.uid,
    branch:req.params.name,
    key:req.params.key
  }
  transact(block).then(obj=>{
    res.status(200).json({data:obj})
  })
  .catch(err=>{
    res.status(400).json({error:err})
  })
})

module.exports = router;
