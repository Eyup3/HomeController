const express = require('express');
const app = express();
const spawn = require('child_process').spawn;
const fs = require('fs')


let editetHtml = require('./htmlEditor').HTML;

app.get('/', (req, res) => {
    res.send(editetHtml)
})

app.post('/:cmd', (req, res) => {
    callScript(req.params.cmd)
})

app.listen(3000);

const callScript = (command) => {
    try {
        let path = __dirname + '\\..\\' + command
        let proc = spawn('node', [path.toString() + '\\index.js'], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
        }).on('message', (data) => {
            console.log(data);
        });
        setTimeout(() => {
            proc.kill()
        }, JSON.parse((fs.readFileSync(path + "\\" + "params.json")).maxlength || 5) * 1000, 0)

    } catch (e) { console.log(e.message) }

}