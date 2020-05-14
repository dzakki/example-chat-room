const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const rooms = [
  {
    id: "1",
    name: "contoh room",
    members: ["127.0.0.1"],
    chats: []
  }
]
// [{
//   id: "",
//   name: "",
//   members: []
     // chats: [{
     //  message: "",
     //  by: ""
     // }]
// }]

io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit("rooms", rooms)

  // listen from client to create new room
  socket.on("new-room", function (name) {

    const lastRoom = rooms.length + 1
    const room = {
      id: lastRoom,
      name: name,
      members: [],
      chats: []
    }
    rooms.push(room)
    // io emit to client for refresh rooms
    io.emit("rooms", rooms)
  })

  socket.on("join-room", function  (room) {
    socket.join(room)

    const indexRoom = rooms.findIndex(function (r) {
      return String(r.id) === String(room)
    })
    io.to(String(room)).emit("chats", rooms[indexRoom])
  })

  socket.on("new-chat", function (payload) {
     // const payload = {
     //    chat: {
     //      message: message,
     //      by: "dzakki"
     //    },
     //    room: {
     //      id: localStorage.getItem("id_room"),
     //    }
     //  }

    console.log(payload)
    const idRoom = payload.room.id
    const indexRoom = rooms.findIndex(function (r) {
      return String(r.id) === String(idRoom)
    })
    rooms[indexRoom].chats.push({
      message: payload.chat.message,
      by: payload.chat.by
    })
    // console.log(rooms[indexRoom])
    // console.log("masuk sini")
    io.to(String(idRoom)).emit("chats", rooms[indexRoom])
  })

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});