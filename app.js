//npm modules
const bodyParser = require("body-parser")
const request = require("request")
const express = require("express")
const https = require("node:https")

const app = express();

// make sure to include the static page
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({extended: true}))


app.get("/" , function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data)

    const url = "https://us8.api.mailchimp.com/3.0/lists/0812063b3e"

    const options = {
        method: "POST",
        auth: "4d4f431e895ab12afce7e4e38e1838d3-us8"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData)
    request.end();
})



app.listen(3000, function() {
    console.log("Server is running on port 3000"); 
})


// API KEY 4d4f431e895ab12afce7e4e38e1838d3-us8

// list ID 0812063b3e