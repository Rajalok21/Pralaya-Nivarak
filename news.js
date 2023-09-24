const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const request=require("request");
const https= require("https");
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res)
{
    const firstname=req.body.f1;
    const secondname=req.body.f2;
    const email=req.body.em;
    const data=
    {
       members:
       [
         {
            email_address:email,
            status:"subscribed",
            merge_fields:
            {
                FNAME:firstname,
                LNAME:secondname
            }
        
          } 
       ]  
  
    };   
    console.log(data);
    const jsondata=JSON.stringify(data);
    console.log(jsondata)
    const url="https://us12.api.mailchimp.com/3.0/lists/119cb17b3b"
    const options=
    {
        method:"POST",
        auth:"utks:b323b7791dfbba1c70cf1c5c5cce06aa-us12"
    };
    const request=https.request(url,options,function(response)
    {  
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/faliure.html"); 
        }
        
        response.on("data",function(data)
        {          
         var p=JSON.parse(data);
         console.log(p);
        });     
    });
    request.write(jsondata)
    request.end();
});
app.get("/",function(req,res)
{  
    res.sendFile(__dirname+"/signup.html");
});
app.listen(3300,function()
{
    console.log("SERVER CHALU HAI BOIS <3");
});





//api key
//b323b7791dfbba1c70cf1c5c5cce06aa-us12

//audience id
//119cb17b3b

