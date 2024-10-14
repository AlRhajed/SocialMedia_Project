// using MySQL
var mysql = require('mysql2');

// already declared connection to MySQL
var connection = mysql.createConnection(
{
    host: "localhost",
    user: "root",
    password: "Group2",
    database: "accounts"
  
});

function CreateAccount(userName, userPassword){

    connection.connect(function(err) {

        if (err) throw err;
        
        console.log("Connected!");
        var sql = "INSERT INTO users (username, userpassword) VALUES ( '"+ userName +"' , '"+ userPassword +"');";
        connection.query(sql, function (err, result) {

            if (err) throw err;

            console.log("1 record inserted");
        });
    });

}

function FindAccount(userName, userPassword){

    var accName;
   
    connection.connect( function(err) {
        if (err) throw err;
        
        var sql = "SELECT username FROM users WHERE username = '"+ userName +"';";
        connection.query(sql, function (err, result) {
            
            if (err) throw err;  

            accName = result;
            console.log(result[0].username);

        });
    });

    return accName;
}

module.exports = { CreateAccount, FindAccount};