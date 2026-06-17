import job from "../models/job.model.js";
 
export const getAllJobs = async (req, res) => {
    try{
 const jobapp = await job.find().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    data: jobapp,
  });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const getJobById = async (req,res)=>{
 try{
    const jobId=req.params.id;
    const jobapp=await job.findById(jobId);
    if(!jobapp){
        return res.status(404).json({
            success: false,
            message: "Job not found"
        }
        )
    }
    return res.status(200).json({
        success: true,
        data: jobapp,
      });
 }catch(error){
    return res.status(500).json({
        success: false,
        message: error.message
    });
 }
}

export const createJob = async (req, res) => {
  try {
    const { appliedDate, interviewDate, ...rest } = req.body;

    const njob = await job.create({
      ...rest,
      appliedDate: appliedDate ? new Date(appliedDate) : undefined,
      interviewDate: interviewDate ? new Date(interviewDate) : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Job application created successfully",
      data: njob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateJob=async (req,res)=>{
    try{
         const jobId=req.params.id;
 const jobData=req.body;
 const jobapp= await job.findByIdAndUpdate(jobId,jobData,{
  returnDocument: "after" ,runValidators: true});
 if(!jobapp){
     return res.status(404).json({
         success: false,
         message: "Job not found"
     }
     )
 }
 return res.status(200).json({
     success: true,
     data: jobapp,
   });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const deleteJob = async (req,res)=>{
    try{
const jobId=req.params.id;
    const jobapp=await job.findByIdAndDelete(jobId);
    if(!jobapp){
        return res.status(404).json({
            success: false,
            message: "Job not found"
        }
        )
    }
    return res.status(200).json({
        success: true,
        message: "Job deleted successfully",
      });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

export const getStats = async (req, res) => {
    try {
        const jobs = await job.find();
        

        const needToApply = jobs.filter(
            (job) => job.status === "Need To Apply"
        ).length;

        const appliedJobs = jobs.filter(
            (job) => job.status === "Applied"
        ).length;

        const interviewScheduled = jobs.filter(
            (job) => job.status === "Interview Scheduled"
        ).length;

        const interviewCompleted = jobs.filter(
            (job) => job.status === "Interview Completed"
        ).length;

        const rejectedJobs = jobs.filter(
            (job) => job.status === "Rejected"
        ).length;

        const offerReceived = jobs.filter(
            (job) => job.status === "Offer Received"
        ).length;

        const successRate =
            appliedJobs > 0
                ? Number(((offerReceived / appliedJobs) * 100).toFixed(2))
                : 0;

        return res.status(200).json({
            success: true,
            data: {
                needToApply,
                appliedJobs,
                interviewScheduled,
                interviewCompleted,
                rejectedJobs,
                offerReceived,
                successRate,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};