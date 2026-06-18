const onlineUsers = new Map();

let ioInstance
export const setUpSocket = (io) => {
    ioInstance = io;
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      console.log("User Joined:", userId);
      console.log("Online User", [...onlineUsers]);
    });

    socket.on("disconnect", () => {
        for(const [userId, socketId] of onlineUsers.entries()){
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
      console.log("User Disconnected:", socket.id);
      console.log("Online Users:", [...onlineUsers]);
    });
  });
};

export const getIO = ()=> ioInstance;

export {onlineUsers};
