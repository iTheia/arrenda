const { generateKeyPair } = require('crypto');
const { writeFileSync } = require('fs');

const options = {
  modulusLength: 530,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
};
generateKeyPair('rsa', options, (err, publicKey, privateKey) => {
  if (!err) {
    writeFileSync('./certs/access-token.private.pem', privateKey);
    writeFileSync('./certs/access-token.public.pem', publicKey);
  } else {
    console.log('Errr is: ', err);
  }
});

generateKeyPair('rsa', options, (err, publicKey, privateKey) => {
  if (!err) {
    writeFileSync('./certs/refresh-token.private.pem', privateKey);
    writeFileSync('./certs/refresh-token.public.pem', publicKey);
  } else {
    console.log('Errr is: ', err);
  }
});
