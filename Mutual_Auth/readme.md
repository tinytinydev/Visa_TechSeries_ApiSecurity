# Mutual Authentication
Mutual Authentication is a two-way authentication (2-Way SSL) which allows a Server and Client to authenticate each other before any communication happens.
This is usually done via a SSL Cert from both parties. Both parties have to cross check with each other's Certification Authority (CA) to ensure that the certs presented by each other is trusted.
For this exercise, all the required certs has been included in the project.

## Server
The server (Producer) exposes API(s) that can be called by a client (Consumer). In this example the server expose a API for Push Payment (/payment/push).

## Client
The client has to provide their Public Cert to gain access to the API exposed. 

## Objective
Implement the required configurations to ensure that Server checks if the Client's cert is valid and is signed by a trusted CA.
The client should also cross check with Server's CA to ensure that the cert which is presented by the server is valid and trusted.

Modify between Line 13 to Line 21 for Server/app.js to include the relevant certs and CA. Cert Authentication should also be enabled (Cert Request).
Modify between Line 16 to Line 21 for Client/app.js to configure the relevant certs and CA

Both app.js in Server and Client needs to be modified to get Mutual Authentication working.

Upon successful implementation, these messages will be displayed accordingly

### Server/app.js
```
    ===== Mututal Authentication Success ! =====
```
### Client/app.js
```
    ===== Mututal Authentication Success ! =====
    Response Status Code:  200
    Server Host Name: server.visa.io
    {"status":"Push Payment from bankA to bankB Success!"}
```
## Testing the Code
Run app.js on both Server and Client folder to see the output.

