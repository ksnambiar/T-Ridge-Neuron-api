let {connect} = require('lotion')
let GCI = "442a563d48e0347d4cf1666055ad1ed4ef8b053b2a929755c6b29b7e87660ba0";
//fuction to get the respective user state

const getData = async uid => {
  const { state } = await connect(GCI);
  let data = await state[uid];
  return data;
};

module.exports = getData;
