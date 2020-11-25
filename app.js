
var express = require('express');

var app = express();

var https = require('https');
var fs = require('fs');


var options = {
    key: fs.readFileSync('./fake-keys/privatekey.pem'),
    cert: fs.readFileSync('./fake-keys/certificate.pem')

};
var server = https.createServer(options, app);
var io = require('socket.io')(server);







app.use(express.static('public'));

app.get('/', function (req, res) {
    fs.readFile('test.html', function (err, file) {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/html'
            });
            res.write('404 Not Found: ' + path.join('/', uri) + '\n');
            res.end();
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(file);
    });
});


io.on('connection', function (socket) {
    io.sockets.emit('user-joined', { clients: Object.keys(io.sockets.clients().sockets), count: io.engine.clientsCount, joinedUserId: socket.id });
    socket.on('signaling', function (data) {
        io.to(data.toId).emit('signaling', { fromId: socket.id, ...data });
    });
    socket.on('disconnect', function () {
        io.sockets.emit('user-left', socket.id)
    })
});
server.listen(8000, function () {

    console.log('server up and runing at 8000 port');
});