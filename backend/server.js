
const express = require('express');

const fs = require('fs');
 
const fastcsv = require('fast-csv'); // faster than csv parser

const app = express();  // object of express

const PORT = 3000;  

var found = false;   // to see if file is found

let ping = 0; 

let Interval = setInterval(()=>{ping++ ; console.log("ping now:"+ping)},20) ; // for testing the website speeds




app.get('/dino',(req,res)=>{
        res.send('dino code should be here');

        });


app.get('/',(req,res)=>{
        res.send('Search your PDF');
        });

app.get('/search',(req,res)=> {
       var date = req.query.date;

       fs.createReadStream('data.csv')
.pipe(fastcsv.parase({headers:true}))
	.pipe(fastcsv.parse({headers : true}))

	.on('data',(row)=> {
             
	        if(row.date == date){
                        found = true;
			res.send(`find it on: ${row.link}`);
			console.log('found file');
			stream.destroy();
	            }
            })


         .on('end',()=>{
		 if(!found){res.send("not found")}

		 })
	 .on('error',()=>{
		 
                console.log('error');
                res.status(500).send(' unknow error:500 ');
             
	 })
             });

	

app.listen(PORT,()=> {
	console.log(`server live at http://localhost:${PORT}?`);
              });
	




