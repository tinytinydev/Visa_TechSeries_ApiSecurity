
const fs = require("fs");
const https = require("https");
const server_addr = "server.visa.io";

var express = require('express')
var app = express()

app.use(express.json());

const options = {
  //Modify START
  //Configure your certificate options here
  /**
   * Hint: You will need the Servers' Private Key, Public Cert and Client's Certification Authority Cert
   * You also will need to tell https server to always request for a cert (Hint: Google request cert nodeJs)
   * Possible fields in RequestOptions: http://definitelytyped.org/docs/node--node-0.8.8/interfaces/https.requestoptions.html
   * It might be helpful to refer to https://www.matteomattei.com/client-and-server-ssl-mutual-authentication-with-nodejs/ 
  **/
 //Modify END
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
