//Imports and other const resources
const JSONdb = require('simple-json-db');
const fs = require('fs');
const db = new JSONdb('database.json');
const uuid_db = new JSONdb('protected_database.json');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync("./cert/server-key.pem");
const publicKey = fs.readFileSync('./cert/server-crt.pem');  // get public key
const currentUserObj = {
    userId : 1,
    orgId : 1
}

//Simulate a token for current user
let currentUserToken = jwt.sign(currentUserObj,privateKey,{algorithm: 'RS256'})

//Set up mock DB for simulation
const docs_dir ="./secretdocs/";
if(db.get(1) == undefined){
    console.log("Initialising DB....")
    db.set(1,{id:1,orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    db.set(2,{id:2,orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    db.set(3,{id:3,orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    db.set(4,{id:4,orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    db.set(5,{id:5,orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    db.set(6,{id:6,orgId: 2, name: "Document for Bank B",filepath: docs_dir+"bankB.txt"});
    console.log("Initialising DB....DONE")
}else{
    console.log("DB already intialised previously. DB will not be created again.")
}

if(uuid_db.get("00a2553f-cf87-477a-8d66-d495ccaae864") == undefined){
    console.log("Intialising UUID DB....")
    uuid_db.set("00a2553f-cf87-477a-8d66-d495ccaae864",{id:"00a2553f-cf87-477a-8d66-d495ccaae864",orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    uuid_db.set("c311630d-4839-43ce-bcff-88f8a0d66cdd",{id:"c311630d-4839-43ce-bcff-88f8a0d66cdd",orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    uuid_db.set("596e9ade-bdd8-47cd-9000-89384aa72de0",{id:"596e9ade-bdd8-47cd-9000-89384aa72de0",orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    uuid_db.set("256482c0-7a66-4365-9b0c-47e92f1772ca",{id:"256482c0-7a66-4365-9b0c-47e92f1772ca",orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    uuid_db.set("12efac03-55ab-4303-9b03-9218a3859bed",{id:"12efac03-55ab-4303-9b03-9218a3859bed",orgId: 1, name: "Document for Bank A",filepath: docs_dir+"bankA.txt"});
    uuid_db.set("69ce9470-0467-4b35-89f2-b163164ebe99",{id:"69ce9470-0467-4b35-89f2-b163164ebe99",orgId: 2, name: "Document for Bank B",filepath: docs_dir+"bankB.txt"});
    console.log("Intialising UUID DB....DONE")
}{
    console.log("UUID DB already intialised previously. UUID DB will not be created again.")
}

const express = require('express');
const app = express();

app.use((req,res,next)=>{
    res.set('Cache-Control', 'no-store')
    next()
})
app.use(express.static('secretdocs')); //Used to serve static files

app.get("/secretdoc/:id",function(req,res){
    var id = req.params.id;
    var dbObj = db.get(parseInt(id));

    if(dbObj != undefined){
        var filePath = dbObj.filepath;
        res.download(filePath);
    }else{
        res.status(404);
        res.send({"message":"File do not exist"})
    }
});

app.get("/secretdoc/protected/:id",function(req,res){
    var id = req.params.id;
    var dbObj = db.get(parseInt(id));
    var currentUser = jwt.verify(currentUserToken,publicKey)

    if(dbObj != undefined){
        if(dbObj.orgId != currentUser.orgId){
            res.status(403)
            res.send({"message":"unauthorized"});
            return;
        }
        var filePath = dbObj.filepath;
        res.download(filePath);
    }
    else{
        res.status(404);
        res.send({"message":"File do not exist"})
    }
});

app.get("/secretdoc/uuid/:id",function(req,res){
    var id = req.params.id;
    var dbObj = uuid_db.get(id);
    var currentUser = jwt.verify(currentUserToken,publicKey)

    if(dbObj != undefined){
        if(dbObj.orgId != currentUser.orgId){
            res.status(403)
            res.send({"message":"unauthorized"});
            return;
        }
        var filePath = dbObj.filepath;
        res.download(filePath);
    }
    else{
        res.status(404);
        res.send({"message":"File do not exist"})
    }
});

app.listen(3000,function(){
    console.log("Listening on port 3000!");
});