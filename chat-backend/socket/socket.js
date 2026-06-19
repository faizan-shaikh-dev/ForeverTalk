const onlineUsers = new Map();

let ioInstance;
export const setUpSocket = (io) => {
  ioInstance = io;
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("online-users", [...onlineUsers.keys()]);
      console.log("User Joined:", userId);
      console.log("Online User", [...onlineUsers]);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("online-users", [...onlineUsers.keys()]);
      console.log("User Disconnected:", socket.id);
      console.log("Online Users:", [...onlineUsers]);
    });

    socket.on("typing-start", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("user-typing", senderId);
      }
    });

    socket.on("typing-stop", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("user-stop-typing", senderId);
      }
    });
  });
};

export const getIO = () => ioInstance;

export { onlineUsers };
