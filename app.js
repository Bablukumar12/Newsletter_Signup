const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}))



app.get("/", function(req , res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req , res){
  var fname= req.body.fname;
  var lname= req.body.lname;
  var email = req.body.email;


  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }

      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url ="https://us12.api.mailchimp.com/3.0/lists/6b6375e413"
  const options={
    method: "POST",
    auth: "Bablukumar12:ca255f0e172c07deb8151f8e365f64f2-us12"
  }
  const request = https.request(url,options, function(response){

    response.on("data", function(data) {
      if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html")

      }
      else{
        res.sendFile(__dirname + "/failure.html")
      }
      console.log(JSON.parse(data));
      console.log(response.statusCode);
    })
  })
   request.write(jsonData);
   request.end();
})


app.post("/failure",function(req , res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000, function (){
  console.log("parser is running on port 3000");
})


// api key
// ca255f0e172c07deb8151f8e365f64f2-us12


// audience id
// 6b6375e413
