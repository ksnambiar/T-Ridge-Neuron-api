let express = require("express");
let router = express.Router();
let uuid1 = require("uuid/v1");
let bip39 = require('bip39');
let sha256 = require('crypto-js/sha256');
let md5 = require('crypto-js/md5');
let getData = require('../Block_Actions/block_state_retrieve');
let transactionDispatch = require('../Block_Actions/block_transaction_dispatch')
router.get("/", (req, res) => {
  res.status(200).json({data:"welcome to Neuron Deca Data Centre"});
});
//creating a new User
router.get("/createNewUser", (req, res) => {
let uid = uuid1();
let mneumonic = bip39.generateMnemonic()
  let data = {
    type: "addUser",
    uid: uid,
    key_hash:md5(mneumonic).toString()
  };
  transactionDispatch(data)
    .then(obj =>
      res.status(200).json({ status: "successful", payload: obj, uid: uid ,keyPhrase:mneumonic})
    )
    .catch(err => res.status(400).json({ error: err }));
});
//@desc creating a new store in your user storage

router.post("/:user/createBranch", (req, res) => {
  let uid = req.params.user;
  let mneumonic = req.body.keyPhrase
  let data = {
    name: req.body.name,
    uid: uid,
    key:mneumonic,
    type: "createNewStore"
  };
    transactionDispatch(data).then(obj => {
      res.status(200).json({
        status: "success",
        message: "New Store created",
        transactionDetails: obj
      });
    }).catch(err=>{
      res.status(400).json({
        error:err
      })
    })

});

//@desc storing data in the specified datastore

router.post("/:user/:branch/addData", (req, res) => {
  let uid = req.params.user;
  let branch = req.params.branch;
  let payload = req.body.data;
  let mneumonic = req.body.keyPhrase;
  let data = {
    name: req.body,
    data: payload,
    uid: uid,
    key:mneumonic,
    dataStore: branch,
    type: "addData"
  };
  transactionDispatch(data)
    .then(obj => {
      res.status(200).json({
        status: "success",
        message: "data added",
        transactionDetails: obj
      });
    })
    .catch(err => res.status(400).json({ error: err }));
});

//@desc getting all of the userdata

router.get("/:user/allData", (req, res) => {
  let userID = req.params.user;
  getData(userID)
    .then(obj => {
      res.status(200).json({ status: "success", payload: obj });
    })
    .catch(err => {
      res.status(400).json({ status: "error", error: err });
    });
});

module.exports = router;
