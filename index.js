var con = require('./connection');
var express= require('express');
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/form.html');
});



app.post('/',function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var dob=req.body.date;

    con.connect(function(error) {
        if (error) throw error;
        console.log("Connected!");
    
        var sql="INSERT INTO assigntab(name,email,phone,dob) VALUES ('"+name+"','"+email+"','"+phone+"','"+dob+"')";
        con.query(sql, function(error, result){
            if(error){
                res.send('duplicate email entry')
                throw error;
            }
            res.send('Registration Successful add /details to see the details');
            
        })
    });
});
app.get('/details',function(req,res){
    con.connect(function(error){
        if(error)throw error;
        console.log("Connected!");

        var sql ='select * from assigntab';

        con.query(sql,function(error,result){
            if(error)throw error;
            res.render(__dirname+"/details.ejs",{data:result});
        });
    });

})


app.listen(4000);