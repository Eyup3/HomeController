const express = require('express');
const app = express();
const spawn = require('child_process').spawn;
const fs = require('fs')

console.log('Parse Config');
let config = JSON.parse((fs.readFileSync("./config.json")))

console.log("Get edited Html")
let editetHtml = require('./htmlEditor').HTML;

app.get('/', (req, res) => {
    res.send(editetHtml)
    console.log("Served Website")
})

app.post('/:cmd', (req, res) => {
    console.log("Get command " + req.params.cmd)
    callScript(req.params.cmd)
})

app.listen(config.port, () => { console.log("Server is listening") });

const callScript = (command) => {
    try {
        let path = __dirname + '/../' + command
        let proc = spawn('node', [path.toString() + '\\index.js'], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
        }).on('message', (data) => {
            console.log(data);
        });
console.log("Spawned " + path)
        setTimeout(() => {
            proc.kill()
        }, JSON.parse((fs.readFileSync(path + "/" + "params.json")).maxlength || 5) * 1000, 0)

    } catch (e) { console.log(e) }

}
