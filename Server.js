
// ================= INSTRUCTIONS =================
// 1. Start mySQL(DataBase) server
// - Shift + Window key
// - search and Open: services.msc
// - find and Start: MYSQL80

// 2. Run the Website Server(LocalServer)
// - (vscode method), open terminal in view(top left) or Ctrl+`
//   then type: npm run DevStart

// - (manual method/not using vscode), open the folder where this script is in,
//   then on the folder path, type: cmd
//   this will open the command line, and type: npm run DevStart

// 3. Open your WebSite through any Browser(Google, Opera, Microsoft browser)
// - Type: localhost:3000


const express = require("express");
const mySql = require("mysql2");
const app = express()

var connection = mySql.createConnection(
{
    host: "localhost",
    user: "root",
    password: "Group2",
    database: "accounts"
  
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'))
app.set('view engine', 'ejs')

app.post('/SignUp', (req, res) =>{
    res.render("users/SignUpForm")
})

app.post('/LogIn', (req, res) =>{
    res.render("users/LogInForm")
})

app.post('/SignedUp', (req, res) => {

    if(req.body.Password == req.body.ConfirmPassword){

        connection.connect(function(err) {
            if (err) throw err;
            
            console.log("Connected!");
            var sql = "INSERT INTO users (username, userpassword) VALUES ( '"+ req.body.Username +"' , '"+ req.body.Password +"');";
            connection.query(sql, function (err, result) {
    
                if (err) throw err;
    
                res.send(req.body.Username + " Account Created");
            });
        });
    }
    else {
        res.send("Confirm Password is Incorrect!");
    }
})

var loggedInName;

app.post('/LoggedIn', (req, res) => {

    connection.connect( function(err) {
        if (err) throw err;
        
        var accName = "SELECT username FROM users WHERE username = '"+ req.body.Username +"';";
        connection.query(accName, function (err, result) {
            
            if (err) throw err;  

            if(result && result.length)
            {
                loggedInName = result[0].username;

                var accPass = "SELECT userpassword FROM users WHERE userpassword = '"+ req.body.Password +"';";
                connection.query(accPass, function (err, result){

                    if (err) throw err;

                    if (result && result.length) 
                    {
                        if(req.body.Password == result[0].userpassword){
                            res.redirect('/ProfilePage');

                        }
                        else {
                            res.send("Password is Incorrect!");
                        }
                    }                   
                    else {
                        res.send("Password is Incorrect!");
                    }
                })

            }
            else {
                res.send('Account Doesn\'t exist!');
            }
        });
    });
})

app.get('/ProfilePage', (req, res) =>{
    res.render('users/ProfilePage',{userNameText: loggedInName});
    console.log('User has LoggedIn!')
})

app.listen(3000);