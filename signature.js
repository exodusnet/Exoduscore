/*jslint node: true */
"use strict";
var ecdsa = require('secp256k1');

/**
 * 签名
 * @param hash
 * @param priv_key
 * @returns {string}
 */
exports.sign = function(hash, priv_key){
	var res = ecdsa.sign(hash, priv_key);
	return 32 + res.signature.toString("base64");
};

/**
 * 验证
 * @param hash
 * @param b64_sig
 * @param b64_pub_key
 * @returns {*}
 */
exports.verify = function(hash, b64_sig, b64_pub_key){
	try{
		var signature = new Buffer(b64_sig.substring(2), "base64"); // 64 bytes (32+32)
		return ecdsa.verify(hash, signature, new Buffer(b64_pub_key, "base64"));
	}
	catch(e){
		console.log('signature verification exception: '+e.toString());
		return false;
	}
};

/**
 * 恢复公钥
 * @param hash
 * @param b64_sig
 * @param recovery
 * @returns {*}
 */
exports.recover = function(hash, b64_sig, recovery){
    try{
		var signature = new Buffer(b64_sig.substring(2), "base64");
		return ecdsa.recover(hash,signature,recovery);
    }
    catch(e){
        console.log('recover publickey exception: '+e.toString());
        return false;
    }
};






