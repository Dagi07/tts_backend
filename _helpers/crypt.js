var CryptoJS = require("crypto-js");
const cryptLib = require('@skavinvarnan/cryptlib');
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

function encrypt(text, key) {
    const cipherText = cryptLib.encryptPlainTextWithRandomIV(text, key);
    console.log('cipherText %s', cipherText);
    // var encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return cipherText;
}
function decrypt(text, key) {

    const decryptedString = cryptLib.decryptCipherTextWithRandomIV(text, key);
    console.log('decryptedString %s', decryptedString);
    // var bytes = CryptoJS.AES.decrypt(text, key).toString();
    // var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedString;
}

module.exports = {
    encrypt,
    decrypt
}


function encryptRSA(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
    const publicKey = fs.readFileSync(absolutePath, 'utf8')
    const buffer = Buffer.from(toEncrypt, 'utf8')
    const encrypted = crypto.publicEncrypt(publicKey, buffer)
    return encrypted.toString('base64')
}

function decryptRSA(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey)
    const privateKey = fs.readFileSync(absolutePath, 'utf8')
    const buffer = Buffer.from(toDecrypt, 'base64')
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: '',
        },
        buffer,
    )
    return decrypted.toString('utf8')
}

// const enc = encrypt('hello', `<public.pem>`)
// console.log('enc', enc)

// const dec = decrypt(enc, `<private.pem>`)
// console.log('dec', dec)