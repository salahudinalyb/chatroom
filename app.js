const express = require ('express');
const app = express();

//ngatur si alat template ejs
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(__dirname + '/public'));

//routes
app.get('/', (req, res) => {
    res.render('index');
});

//port pada 1996
server = app.listen(1996);
console.log('cek browser');

//installasi socket.io 
const io = require("socket.io")(server);

//ngehubungi setiap koneksi
io.on('connection', (socket) => {
    console.log('user baru terhubung')


    //liat perubahan pada change_user
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //liat perubahan pada new_message
    socket.on('new_message', (data) => {
        //broadcast pesan
        io.sockets.emit('new_message', {
            message : data.message,
            username : socket.username
        });
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
})





