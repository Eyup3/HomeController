//read all directories to make appropiate buttons

const fs = require('fs');

function getDirectories(path) {
    return fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

let HtmlEditor = () => {

    let basehtml = fs.readFileSync(__dirname + '/public/index.html', 'utf8')

    let arr = getDirectories(__dirname + "/..")

    let btns = "";
    arr.forEach(element => {
        if (element != "index") {

            btns += `<button class="btn" onclick="sendCmd('` + element + `'); ">` + element + `</button>`
        }
    })

    let Variable = ("PS4GAMERBOI")
    let indexOfVariable = basehtml.indexOf(Variable)
    let txt1 = basehtml.slice(0, indexOfVariable) + btns + basehtml.slice(indexOfVariable);
    let txt2 = txt1.replace(Variable, ' ')
    return txt2;
}

module.exports = {
    HTML: HtmlEditor()
}
