
module.exports = {

sqlConnect: function(){
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "BBoys314",
  database: "proj1Database"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});
return con;
}

}