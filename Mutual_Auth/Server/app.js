//Hands on Exercise is adapted from https://www.matteomattei.com/client-and-server-ssl-mutual-authentication-with-nodejs/ 

const fs = require("fs");
const https = require("https");
const server_addr = "server.visa.io";

var express = require('express')
var app = express()

app.use(express.json());

const options = {
  //Configure your certificate options here
  /**
   * Hint: You will need a Private Key, Public Key (Cert) and Client's Certification Authority Cert
   * You also will need to tell https server to only allow authorized users and also to always request for a cert
  **/
};

https
  .createServer(options,app)
  .listen(3001,()=>{
    console.log(`Example app listening at https://${server_addr}:3001`)
  });

app.get('/hello', function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
});

app.post('/payment/push', function (req, res) {
    let from = req.body.from;
    let to = req.body.to;
    let amount = req.body.amount;
    console.log("====Mutual Authentication Success!====")
    console.log();
    console.log("Certificate found for: ",req.socket.getPeerCertificate().subject.CN)
    res.send({"status":"Push Payment from " + from + " to "+ to + " Success!"})
});
