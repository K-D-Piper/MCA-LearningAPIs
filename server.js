//import required modules/libraries
const http = require("http");
const mysql = require("mysql");

//create mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test_db"
});
//connect to database 
connection.connect((err)=> {
    if (err){
        console.error("error connection to the database");   
    }
    console.log("connect to database")
})

//create an http server to listen for requests 
const server = http.createServer((req,res)=> {
    if (req.url === "/products" && req.method ==="GET"){
        const query = "SELECT * FROM products"

        connection.query(query, (err, results)=>{
            if(error){
                //internal server error, moaning an error occured during the query
                res.statusCode = 500, 
                res.setHeader("Content - Type", "text/plain");
                res.end("error fetching data")
                return;
            }
            //200 == OK, queary was successful
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(results))
        })
    } else {
        //url isn't "/products and request was not a GET request"
        res.statusCode = 404;
        res.setHeader = ("Content-Type", "text/plain");
        res.end("error, not found");
    }
});


//define port number for server to listen on 
const port = 8000;

//start server and listen on specifed port and address
server.listen(port, "0.0.0.0", () => {
    console.log("server is running on port: " + port);
});