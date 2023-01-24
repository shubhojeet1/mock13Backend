const JobsModel = require("./jobs.model");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  let Jobs = await JobsModel.find({});
  return res.status(200).send(Jobs);
});
app.post("/", async (req, res) => {
  const { companyName , location , position ,contract} = req.body
  console.log(companyName , location , position ,contract)
  if(!companyName || !location || !position || !contract) return res.status(403).send({message:"Please Enter All Job Details"})
  const Jobs = await  JobsModel({ companyName , location , position ,contract});
  Jobs.save()
  return res.status(200).send({Jobs,message:"Jobs Successfully Posted"});
});



app.patch("/", async (req, res) => {
  let { JobId , companyName , location , position ,contract } = req.body;
  

  if (!JobId || !companyName || !location || !position || !contract) {
    return res.status(404).send({ message: "Request Not Found" });
  }
  try {
    let updateJobs = await JobsModel.findOneAndUpdate(
      {
       _id:JobId
      },
      { companyName , location , position ,contract },
      { new: true }
    );
    return res
      .status(202)
      .send({ updateJobs, message: "Job successfully updated" });
  } catch (err) {
    return res.status(403).send({ message: err.message });
  }
});


app.delete("/", async (req, res) => {
  const { JobId} = req.body
  if(!JobId) return res.status(403).send({message:"Request Not Found"})
  let Jobs = await JobsModel.findByIdAndDelete(JobId);
  return res.status(200).send({message:"Job intry has been Deleted"});
});

module.exports = app;
