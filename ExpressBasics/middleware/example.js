const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) 

let count = 0;

// middleware function  
function ageCriteria(req,res,next){
    
    const age = req.query.age; 
    if(Number(age) > 18){
        next();
    }else{
        res.send("you can't ride")
    }
    count++;
    console.log(count);
}

app.get('/',ageCriteria,(req,res)=>{
    res.send("live");
    
})
app.get('/ride1', ageCriteria, (req,res)=>{
    res.send("You can ride");
   
})
app.listen(port, ()=>{
    console.log(`Server for middleware http://localhost:${port}`)
})


// Note 
// if we use the USE below eg: then it will automatically used in all the routes
// But it will only works/triggers if its used above all the routes, So order matters
// app.use(ageCriteria())