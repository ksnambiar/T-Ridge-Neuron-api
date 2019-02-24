let {connect} = require('lotion')
let GCI = "442a563d48e0347d4cf1666055ad1ed4ef8b053b2a929755c6b29b7e87660ba0";
//function for transaction dispatch

const transactionDispatch = async data => {
  const { send } = await connect(GCI);
  let result = await send(data);
  return result;
};

module.exports = transactionDispatch;
