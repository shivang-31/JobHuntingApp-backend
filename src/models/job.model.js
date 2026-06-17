import mongoose from "mongoose";

const jobschema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        trim:true,
    },
     role:{
        type:String,
        required:true,
        trim:true,
    },
     jobLink:{
        type:String,
        required:true,
        trim:true,
    },
     appliedDate:{
        type:Date,
    },
     status:{
        type:String,
        required:true,
        enum:[
        "Need To Apply",
        "Applied",
        "Interview Scheduled",
        "Interview Completed",
        "Rejected",
        "Offer Received",
        ],
        default:"Need To Apply",
    },
     note:{
        type:String,
        default:"",
        trim:true,
    },
     interviewDate:{
        type:Date,
    }
   
},
     {
        timestamps:true,
    }
)

const job=mongoose.model("job",jobschema);

export default job