const express = require('express');
const path = require('path');
const fs = require('fs');
const { resolve } = require('path');
const { readdir } = require('fs').promises;
require('dotenv/config');

const app = express();

app.use(express.json({ limit: '1kb' }));
files = getFiles('./public');

files.forEach(file => {
    app.get(file.substring(8, file.len), (req, res) => {
        res.status(200).sendFile(path.join(__dirname, file));
    });
})

let port = process.env.PORT;

if (port == null || port == "") {
    port = 8000;
}

app.listen(port);

function getFiles(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else {
            results.push(file);
        }
    });
    return results;
}