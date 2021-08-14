const express = require('express');
const path = require('path');
const fs = require('fs');
const { resolve } = require('path');
const { readdir } = require('fs').promises;
require('dotenv/config');

const app = express();

app.use(express.json({ limit: '1kb' }));
const files = * getFiles('./public/').then(() => console.log(files));
;
console.log(files);


// Public dir stuff: The only challenge is gonna be remembering to keep private keys out of this dir lol
app.get('/', (req, res) => {
    console.log(files);
});



(async () => {
    for await (const file of getFiles('./public/')) {
        var dirFromPublic;
        if (file.includes("\\")) {
            dirFromPublic = file.split("public\\")[1].replace(/\\/g, "/")
        } else {
            dirFromPublic = file.split("public/")[1]
        }
        app.use('/' + dirFromPublic, (req, res) => {
            res.sendFile(path.join(__dirname, 'public', dirFromPublic));
            res.status(200).end();
            console.log(dirFromPublic);
        });
    }
})();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

// The last 2 large codeblocks don't seem like they were written by me but I cant find the source rip.
// Never mind the last one is from here: https://stackoverflow.com/questions/5827612
