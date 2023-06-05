export const isLogin = () => {
  let tk = getAuthentication();
  // if (tk.result && tk.result.access_token) {
  //   return true;
  // }
  if (tk.result) {
    return true;
  }
  return false;
};

var secretText = "#!argt!#";
export const setUserData = (UserData) => {
  var CryptoJS = require("crypto-js");
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(UserData), secretText);
  window.localStorage.setItem("GUD", ciphertext);
};

export const getUserData = () => {
  var CryptoJS = require("crypto-js");
  let UserDataCiphertext = window.localStorage.getItem("GUD");
  if (!UserDataCiphertext) {
    return {};
  }
  var bytes = CryptoJS.AES.decrypt(UserDataCiphertext, secretText);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
};

export const setAuthentication = (Authentication) => {
  var CryptoJS = require("crypto-js");
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(Authentication),
    secretText
  );
  window.localStorage.setItem("GAT", ciphertext);
};

export const getAuthentication = () => {
  var CryptoJS = require("crypto-js");
  let AuthenticationCiphertext = window.localStorage.getItem("GAT");
  if (!AuthenticationCiphertext) {
    return {};
  }
  var bytes = CryptoJS.AES.decrypt(AuthenticationCiphertext, secretText);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
};
