const express = require('express');
const { Server } = require('socket.io')
const http = require('http');
const cors = require('cors');
const ACTIONS = require('../src/Components/Actions');
require('./db/conn');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());


// socket work from here
const server = http.createServer(app);
const router = require('./routes/user');
const userSocketMap = {};  //should create a database in order to save the info about the server in case if server closed then all will get cleared

function getAllConnectedClients(roomId) {
    // map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        }
    })
}
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on('connection', (socket) => {
    console.log("socket Connected ", socket.id);


    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        console.log(userSocketMap);
        const clients = getAllConnectedClients(roomId);
        console.log(typeof (clients));
        console.log(clients);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });

        socket.on('disconnecting', () => {
            const rooms = [...socket.rooms];
            rooms.forEach((roomId) => {
                socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: userSocketMap[socket.id],
                    clients
                });

            });
            delete userSocketMap[socket.id];
            socket.leave();
        })
    });
    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });

    });


});

// socket complete here


// Routes for the user
// path will be /api/auth/user
app.use("/api/auth",router);
app.get("/",(req,res)=>{
    res.send("hello from expresss");
})

const PORT = 5000
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));