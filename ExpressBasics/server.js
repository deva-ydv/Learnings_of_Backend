const express = require('express');
const app = express();
const port = 3000; 

const user = [
    {
        name: "deva",
        kidneys: [{
            healthy: false
        }]
    }
]

app.use(express.json())

app.get('/', (req, res) => {
  const devkidneys = user[0].kidneys;
  const noOfkidneys = devkidneys.length
  let noOfhealthyKidneys = 0;
  for(let i = 0; i < devkidneys.length; i++){
    if(devkidneys[i].healthy) noOfhealthyKidneys++;
  }
  const noOfunhealthyKidneys = noOfkidneys - noOfhealthyKidneys;

  res.json(
    {
        noOfkidneys,
        noOfhealthyKidneys,
        noOfunhealthyKidneys

    }
  )

  console.log(devkidneys)
});
// here post method is used to post the new data in kidneys / new kidneys details
app.post('/',(req,res) =>{
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy: isHealthy
    }
    )
    res.json({msg: "done"})
})

//here put method is used to make all the kidneys true.

app.put('/',(req,res) =>{
  for(let i = 0; i < user[0].kidneys.length; i++){
    user[0].kidneys[i].healthy = true
  }
  res.json({})
})

// here delete method is used to removing the unhealthy kidneys
app.delete('/', (req, res) => {
  const kidneys = user[0].kidneys;
  const unhealthyCount = kidneys.filter(k => !k.healthy).length;

  if (unhealthyCount === 0) {
    return res.status(400).json({ msg: "No unhealthy kidneys to delete" });
  }

  user[0].kidneys = kidneys.filter(k => k.healthy);

  res.json({
    msg: "All unhealthy kidneys removed",
    kidneys: user[0].kidneys
  });
});


app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});