const { Server } = require("socket.io");

const io = new Server(8000, {
    cors: true
})

io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on("joinRoom",(roomId)=>{
        socket.roomId = roomId;
        socket.join(roomId);
    })
    socket.on("startDrawing", (data)=>{
        console.log("start")
        socket.in(socket.roomId).emit("startDrawing", data)
    })
    socket.on("drawingData", (data)=>{
        console.log("dd", data)
        socket.in(socket.roomId).emit("drawingData", data);
    })
    socket.on("finishDrawing", ()=>{
        console.log("finish")
        socket.in(socket.roomId).emit("finishDrawing");
    })
    socket.on("clearCanvas", ()=>{
        console.log("clr")
        socket.in(socket.roomId).emit("clearCanvas");
    })
    socket.on("cursorMove", (data)=>{
        const {clientX, clientY} = data;
        const socketId = socket.id;
        socket.in(socket.roomId).emit("cursorMove", {socketId,  clientX,  clientY});
    })
})