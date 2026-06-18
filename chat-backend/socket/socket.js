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

      socket.on("typing-start", ({ senderId, receiverId }) => {
        const receiverSockedId = onlineUsers.get(receiverId);

        if (receiverSockedId) {
          io.to(receiverSockedId).emit("user-typing", senderId);
        }
      });

      socket.on("typing-stop", ({ receiverId }) => {
        const receiverSockedId = onlineUsers.get(receiverId);

        if (receiverSockedId) {
          io.to(receiverSockedId).emit("user-stop-typing");
        }
      });
    });
  });
};

export const getIO = () => ioInstance;

export { onlineUsers };
