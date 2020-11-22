const {app, BrowserWindow,remote} = require('electron');
const path = require('path');
const $ = require('jquery');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const { electron } = require('process');



function encodeItem(text) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  };


function submitCreds() {

    var email = $("#email").val();
    var password = $("#password").val();

    const emailEncode = encodeItem(email);
    const PassEncode = encodeItem(password);

    fs.readdir(__dirname + '/creds', (error, file_names) => {
        if (error) {
            fs.mkdir(__dirname + '/creds', (error) => {
                if (error) {
                    alert(error);
                }
            });
        }else{
            fs.writeFileSync(__dirname+'/creds/creds.joel', '=='+emailEncode+':'+PassEncode+'==');
            setTimeout(()=>{
                reloadWindow();
            },2000);
        }
    });
}



