const express = require('express');
const path = require('path');
<<<<<<<< HEAD:app.js
========
const cors = require('cors')
const router = require('./router.cjs');
>>>>>>>> f6e1a19 (refactor: :truck: Change of the arquitecture of the files in the repository):api/app.cjs
const app = express();

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'css')));
app.use('/js', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'js')));
app.use('/storage', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'storage')));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, 'index.html'));
})
app.get("/service", (req, res)=>{
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, 'views/service.html'));
})


app.use((req, res)=>{
    res.status(403).json({message: "No tiene autorizacion"})
})
let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}
app.listen(config, ()=>{
    console.log(`http://${config.host}:${config.port}`);
});