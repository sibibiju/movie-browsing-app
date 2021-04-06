//PM2 => cluster management

//pm2 start bin/www -i 0 - starts clusters based on logical cores
//pm2 delete bin/www - stops running

process.env.UV_THREADPOOL_SIZE = 4; //default = 4

const crypto = require('crypto');
const cluster = require('cluster');
const express = require('express');

const numCPUs = require('os').cpus().length;
console.log("==== CPUs ===>" + numCPUs);

//check if master is running
if (cluster.isMaster) {
    //create workers

    // for (let i = 0; i < numCPUs; i++) {
    //     cluster.fork();
    // }

    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
} else {
    const app = express();
    app.listen(3001);

    app.get('/', getCrypt);
}

function getCrypt(req, res, next) {
    crypto.pbkdf2("password", "salt", 10, 64, 'sha512', (err, key) => {
        //console.log('Crypt ==> ' + key.toString('hex'));
        res.send('Crypt ==> ' + key.toString('hex'));
    });
}