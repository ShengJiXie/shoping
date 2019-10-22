var http=require("http");
var express=require("express");//引入express
var socketIo=require("socket.io");//引入socket.io
var app=new express();
var server=http.createServer(app);
var io=new socketIo(server);//将socket.io注入express模块
//客户端 1 的访问地址

console.log(app);

app.get("/Chat/aaaa",function (req,res,next) {
    res.sendFile(__dirname+"/Chat/aaaa");
    console.log(res);
    
});
//客户端 2 的访问地址
app.get("/Chat/bbbb",function (req,res,next) {
    res.sendFile(__dirname+"/Chat/bbbb");
});
server.listen(9000);//express 监听 8080 端口，因为本机80端口已被暂用
//每个客户端socket连接时都会触发 connection 事件
io.on("connection",function (clientSocket) {
    // socket.io 使用 emit(eventname,data) 发送消息，使用on(eventname,callback)监听消息
    //监听客户端发送的 sendMsg 事件
    clientSocket.on("sendMsg",function (data) {
        // data 为客户端发送的消息，可以是 字符串，json对象或buffer
        // 使用 emit 发送消息，broadcast 表示 除自己以外的所有已连接的socket客户端。
        clientSocket.broadcast.emit("receiveMsg",data);
        console.log(data);
        
    })
});