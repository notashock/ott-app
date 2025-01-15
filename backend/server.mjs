import express from "express";
import fs from "fs";



const app = express();
app.use(express.json());
app.get('/data', (req, res) => {
  fs.readFile("./data.json", (err, data)=>{
    if(err){
      res.status(500).send("Error reading data file");
    }
    res.send(JSON.parse(data));
  });
});
app.post('/data', (req, res) => {
  fs.readFile("./data.json", (err, data)=>{
    if(err){
      res.status(500).send("Error reading data file");
    }
    const { watchlist } = req.body;
    const dataObj = JSON.parse(data);
    dataObj.watchlist = [...dataObj.watchlist, watchlist];
    fs.writeFile("./data.json", JSON.stringify(dataObj), (err)=>{
      if(err){
        res.status(500).send("Error writing data file");
      }
      res.send("Data written successfully");
    });
  });
})
app.delete('/data', (req, res)=>{
  fs.readFile("./data.json", (err, data)=>{
    if(err){
      res.status(500).send("Error reading data file");
    }
    const { id } = req.body;
    const dataObj = JSON.parse(data);
    dataObj.watchlist = dataObj.watchlist.filter((movie) => movie.id !== id);
    fs.writeFile("./data.json", JSON.stringify(dataObj), (err)=>{
      if(err){
        res.status(500).send("Error writing data file");
      } 
      res.send("Data written successfully");
    });
  });
});
app.get("/login", (req, res)=>{
  res.send({
    "login": [
      {
        "username": "test@gmail.com",
        "password": "b74a"
      },
      {
        "username": "test@gmail.com",
        "password": "Dhathri@25"
      }
    ]
  })
})
// Ensure the server listens on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});