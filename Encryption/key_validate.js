let sha256=require('cypto-js/sha256');
let getData = require('../Block_Actions/block_state_retrieve');
let validate = (pass_key)=>{
  let hashed_key = sha256(pass_key).toString();
  getData()
    .then(obj=>{
      console.log(obj)
    })

}
