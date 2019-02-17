let express = require("express");
let router = express.Router();
let { connect } = require("lotion");
let uuid1 = require("uuid/v1");
let GCI = "442a563d48e0347d4cf1666055ad1ed4ef8b053b2a929755c6b29b7e87660ba0";
router.get("/", (req, res) => {
  res.status(200);
});

//creating a new User
router.get("/createNewUser", (req, res) => {
  let uid = uuid1();
  let data = {
    type: "addUser",
    uid: uid
  };

  transactionDispatch(data)
    .then(obj =>
      res.status(200).json({ status: "successful", payload: obj, uid: uid })
    )
    .catch(err => res.status(400).json({ error: err }));
});
//@desc creating a new store in your user storage

router.post("/:user/createBranch", (req, res) => {
  let uid = req.params.user;
  let data = {
    name: req.body.name,
    uid: uid,
    type: "createNewStore"
  };
  transactionDispatch(data).then(obj => {
    res.status(200).json({
      status: "success",
      message: "New Store created",
      transactionDetails: obj
    });
  });
});

//@desc storing data in the specified datastore

router.post("/:user/:branch/addData", (req, res) => {
  let uid = req.params.user;
  let branch = req.params.branch;
  let payload = req.body;
  let data = {
    name: req.body,
    data: payload,
    uid: uid,
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

//fuction to get the respective user state

const getData = async uid => {
  const { state } = await connect(GCI);
  let data = await state[uid];
  return data;
};

//function for transaction dispatch

const transactionDispatch = async data => {
  const { send } = await connect(GCI);
  let result = await send(data);
  return result;
};
