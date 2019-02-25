let sha256 = require('crypto-js/sha256')
let aes = require('crypto-js/aes')
let crypto = require('crypto-js')
let encrypt_data=(data,key)=>{

  let hashed=sha256(key)
  let encrypted_data=aes.encrypt(JSON.stringify(data),hashed.toString())
  console.log(encrypted_data.toString())
  console.log({
    data:encrypted_data.toString(),
    stamp:sha256(encrypted_data).toString(),
    encryption_stamp:Date.now()
  })

}
encrypt_data("hello","stomp");
let decrypt_data = (data,key)=>{
  let hashed_key = sha256(key)
  let decryption = aes.decrypt(data,hashed_key.toString());
  console.log(decryption.toString(crypto.enc.Utf8))
  return{
    data:decryption.toString()
  }
}
decrypt_data("U2FsdGVkX19DxYwzPs5WGK2OrWgPRIBOAH08/GlUebE=","sdfsdafsdf sfasfasf")

module.exports = {encrypt_data,decrypt_data}
