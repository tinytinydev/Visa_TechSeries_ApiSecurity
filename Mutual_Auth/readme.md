# Mutual Authentication
Mutual Authentication is a two-way authentication which allows a Server and Client to authenticate each other before any communication happens.
This is usually done via a SSL Cert from both parties.

# Server
The server (Producer) exposes API(s) that can be called by a client (Consumer). In this example the server expose a API for Push Payment (/payment/push).

# Client
The client has to provide their Public Cert to gain access to the API exposed. 

# Objective
Implement the required configurations to ensure that Server checks if the Client's cert is valid and is signed by a trusted Certification Authority(CA).
Both app.js in Server and Client needs to be modified to get Mutual Authentication working.

Upon successful implementation, these messages will be displayed accordingly

## Server
```
    ===== Mututal Authentication Success ! =====
```
## Client
```
    ===== Mututal Authentication Success ! =====
    Response Status Code:  200
    Server Host Name: server.visa.io
    {"status":"Push Payment from bankA to bankB Success!"}
```
