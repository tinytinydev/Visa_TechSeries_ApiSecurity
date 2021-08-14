const fs = require("fs");
const https = require("https");
const auth = require('basic-auth'); //https://www.npmjs.com/package/basic-auth 

var express = require('express')
var app = express()
const server_addr = "server.visa.io";

app.use(express.json());

const options = {
  key: fs.readFileSync(`./certs/server-key.pem`),
  cert: fs.readFileSync(`./certs/server-crt.pem`)
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
    console.log(req.headers);
    /** Modify START */
    //Hint: https://www.npmjs.com/package/basic-auth 
    var user =  null; //Replace the null with relevant code to obtain the user object from the basic Auth Header
    /** Modify END */

    if(user.name == "testUser" && user.pass == "Visa@SmuTechSeries2021"){
      console.log();
      console.log("===== Basic Authentication Success ! =====");
      console.log();

      let from = req.body.from;
      let to = req.body.to;
      let amount = req.body.amount;
      res.send({"status":"Push Payment from " + from + " to "+ to + " Success!"})
    }
    else{
      res.status(400);
      res.send({status:"unauthorized"})
    } 


});
