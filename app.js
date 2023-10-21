//connecting to express
const express = require('express');
const app=express();
const router = express.Router();
const path = require('path');
//connect to my lovely database
const database = require('./database.js');
var con = database.sqlConnect();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
//register view engine
app.set('view engine','ejs');




//middleware & static files 

app.use(express.static('public'));

app.get('/',(req,res,next)=>{
    //logging the request
    //console.log(req);



//puts everything currently in the database on the screen
    con.query("SELECT * FROM currentCart", function (err, result,fields) {
        if (err) throw err;
        console.log("ALl items in current cart selected");
        //console.log(result[0].food_name);
        let totalSum=0;
        if(result.length>0){
        result.forEach(res =>{
       
            totalSum+=(res.price*res.quantity);
            console.log(totalSum);
            totalSum.toFixed(2);
        });
     }
       
        res.render('output',{title: 'grocery shop',result,totalSum});
    });
   

});

app.post('/action',function(req,res){
        console.log(req.body);
        console.log("SELECT * FROM items WHERE food_name="+"'"+req.body.name[0]+"'");
        con.query("SELECT * FROM items WHERE food_name="+"'"+req.body.name[0]+"'", function (err, resultTwo,fields) {
            if (err) throw err;
            console.log("ALl items selected" + "two");
            console.log(resultTwo);
            console.log(resultTwo.length);
            if(resultTwo.length>0&&resultTwo[0].food_name == req.body.name[0]&&req.body.name[0]!=''&&req.body.name[1]!=''&&req.body.name[1]!=0){
                console.log('Exists')
                con.query("SELECT * FROM currentCart WHERE food_name="+"'"+req.body.name[0]+"'",function(err,resultThree,fields){
                    if(err) throw err;
                    if(resultThree.length==0){

                    con.query("INSERT INTO currentCart VALUES("+"'"+req.body.name[0]+"'"+","+resultTwo[0].price+","+req.body.name[1]+")",function(err,result,fields){
                        if(err) throw err;
                        console.log('pushed');
                    });
                    } else{
                        con.query("UPDATE currentCart SET price="+resultThree[0].price+" , quantity="+req.body.name[1]+" WHERE food_name="+"'"+req.body.name[0]+"'",function(err,result,fields){
                            if(err) throw err;
                            console.log('updated current value');
                        });
                    }
                });
                
            }
        });


        res.redirect('/');
    
});

app.post('/remove',function(req,res){
    console.log(req.body);
  
        console.log("SELECT * FROM items WHERE food_name="+"'"+req.body.name+"'");
        con.query("SELECT * FROM items WHERE food_name="+"'"+req.body.name+"'", function (err, resultTwo,fields) {
            if (err) throw err;
            console.log("ALl items selected" + "two");
            console.log(resultTwo);
            console.log(resultTwo.length);
            console.log(resultTwo.length>0&&resultTwo[0].food_name== req.body.name && req.body.name!='');
            if(resultTwo.length>0&&resultTwo[0].food_name== req.body.name && req.body.name!=''){
                console.log('Exists')
                con.query("SELECT * FROM currentCart WHERE food_name="+"'"+req.body.name+"'",function(err,resultThree,fields){
                    if(err) throw err;
                    if(resultThree.length!=0){
                        console.log('exists in currentCart');
                    con.query("DELETE FROM currentCart where food_name="+"'"+req.body.name+"'",function(err,result,fields){
                        if(err) throw err;
                        console.log('removed');
                    });
                    } 
                });
                
            }
          
        });

    res.redirect('/');

});


app.get('/addTo',function(req,res){
    con.query("SELECT * FROM items", function (err, result,fields) {
        if (err) throw err;
        console.log("ALl items in current cart selected");
        //console.log(result[0].food_name);
        res.render('addTo',{title: 'grocery shop',result});
    });
});

app.post('/adding',function(req,res){
    console.log(req.body);
  
        console.log("SELECT * FROM items WHERE food_name="+"'"+req.body.name[0]+"'");
        con.query("SELECT * FROM items WHERE food_name="+"'"+req.body.name[0]+"'", function (err, resultTwo,fields) {
            if (err) throw err;
            console.log("ALl items selected" + "two");
            console.log(resultTwo);
            console.log(resultTwo.length);
            console.log(req.body.name[1]);
            console.log(req.body.name[1]>0);
            if(resultTwo.length==0){
                if(req.body.name[1]>0&&req.body.name[0]!=''){
                    con.query("INSERT INTO items VALUES("+"'"+req.body.name[0]+"'"+","+req.body.name[1]+")",function (err, resultTwo,fields){
                        if(err) throw err;
                        console.log("inserted into database");
                    });
                }
            }else{
                if(req.body.name[1]>0&&req.body.name[0]!=''){
                    con.query("UPDATE items SET price = " + req.body.name[1] + " WHERE food_name = " +"'"+req.body.name[0]+"'",function (err, resultTwo,fields){
                        if(err) throw err;
                        console.log("updated database");
                    });
                }
            }
          
        });

    res.redirect('/addTo');
});
app.listen(8080, function() {
    console.log('Server running at http://localho:8080/');
  });