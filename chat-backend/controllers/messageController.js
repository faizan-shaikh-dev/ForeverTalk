import Message from "../models/messageModel.js";

//Send Message Logic
export const sendMessage = async (req, res) =>{
    try {
        const {receiverId} = req.params;
        const {text} = req.body;

        const newMessage = await Message.create({
            senderId: req.user.userId,
            receiverId, 
            text,
            messageType: "text",
        });

        return res.status(200).json({message:"message sent", newMessage});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal Server Error"})
        
    }
};


//Get Message Logic

export const getMessages = async (req, res)=>{
    try {
        const otherUserId = req.params.userId;

        const messages = await Message.find({$or: [{
            senderId: req.user.userId,
            receiverId:otherUserId
        },

        {
            senderId: otherUserId,
            receiverId:req.user.userId
        }
    ]
    }).sort({createdAt: 1});
    return res.status(200).json({messages});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
};
