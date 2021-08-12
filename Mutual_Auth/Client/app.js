//Hands on Exercise is adapted from https://www.matteomattei.com/client-and-server-ssl-mutual-authentication-with-nodejs/ 

const fs = require("fs");
const https = require("https");
const message = {from:"bankA",to:"bankB"};

const server_addr = "server.visa.io";
const port = 3001;

const req = https.request(
  {
    host: server_addr,
    port: port,
    secureProtocol: "TLSv1_2_method",
    //Modify START
    //Configure your certificate options here
    /**
     * Hint: You will need a Private Key, Public Key (Cert) and Server's Certification Authority Cert to send the request
     * You can also test with the unauthorized certs to make sure an unauthorized client is not able to access the server
     **/
    //Modify END
    path: "/payment/push",
    data: JSON.stringify(message),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(message))
    }
  },
  function(response) {
    console.log("Response Status Code: ", response.statusCode);
    console.log(
      "Server Host Name: " + response.socket.getPeerCertificate().subject.CN
    );
    if (response.statusCode !== 200) {
      console.log(`Wrong status code`);
      return;
    }
  }
);

//DO NOT MODIFY CODES BELOW
req.on("socket", function(socket) {
  socket.on("secureConnect", function() {
    if (socket.authorized === false) {
      console.log(`SOCKET AUTH FAILED ${socket.authorizationError}`);
    }
    console.log("");
    console.log("Congratulations! Mutual Auth Success!");
  });
});

req.on("error", function(err) {
  console.log(`TLS Socket ERROR (${err})`);
  req.end();
  return;
});

req.write(JSON.stringify(message));