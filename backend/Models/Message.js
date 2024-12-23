import mongoose from 'mongoose'

const messageSchema=new mongoose.Schema({
    sender:{
        type:String,
        ref:"user"
    },
    content:{
        type:String,
        trim:true,
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat"
    },
},{
    timestamps:true,
});

const Message=mongoose.model('message',messageSchema);
export default Message;