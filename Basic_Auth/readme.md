# Basic Authentication
Basic Authentication is a API Authorization which takes in a username and password in the Authorization header. The username and password is concatenated and converted to Base64 before sending to the server.

## Server
The server (Producer) exposes API(s) that can be called by a client (Consumer). In this example the server expose a API for Push Payment (/payment/push).

## Client
The client has to provide their username and password to call the API successfully.

## Objective
Implement Basic Authentication to ensure that only authenticated users can call the API successfully.

Modify Line 31 in Server/app.js to obtain the user authentication object from the authorization header. The package basic-auth has been imported and can be used to obtain the authentication details.
Referring to the [documentation](https://www.npmjs.com/package/basic-auth) of basic-auth may be useful to help you solve this exercise.

Upon successful implementation, these messages will be displayed accordingly

### Server/app.js
```
    {
    authorization: 'Basic dGVzdFVzZXI6VmlzYUBTbXVUZWNoU2VyaWVzMjAyMQ==',
    'content-type': 'application/json',
    'user-agent': 'PostmanRuntime/7.28.3',
    accept: '*/*',
    'cache-control': 'no-cache',
    'postman-token': '2b506ed3-1ae1-4206-a44f-6132880defef',
    host: 'server.visa.io:3001',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive',
    'content-length': '42'
    }

    ===== Basic Authentication Success ! =====
```
### Client/app.js
```
    ===== Basic Authentication Success ! =====
    Response Status Code:  200
    Server Host Name: server.visa.io
    {"status":"Push Payment from bankA to bankB Success!"}
```
## Testing the Code
Run app.js on both Server and Client folder to see the output.

You can also run the startup script to test the output: 

Start the shell script (startup.sh) on a Mac machine using this command
```
    ./start.sh
```

Start the powershell script (startup.ps1) on a Windows machine using this command
```
    powershell .\startup.ps1
```
Enter Basic_Auth when prompted for which project to start.

