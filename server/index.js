const express = require('express');
const cors = require('cors');
const monk = require('monk');

const rateLimit = require("express-rate-limit");

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/meower');
const mews = db.get('mews');

app.use(cors());
app.use(express.json());
app.use(rateLimit({
   windowMs: 10* 60 * 1000, // 15 minutes
   max: 100 // limit each IP to 100 requests per windowMs
	
}));




app.get('/mews', (req, res) =>{
	mews
	  .find()
	  .then(mews => {
		res.json(mews);  
		  
		  
	  });
	
	
});
app.get('/', (req, res) => {
	res.json({
		message: 'Meower !😼🤣'
	});
	
});

function isValidMew(mew){
	return mew.name && mew.name.toString().trim() !== '' &&
	 mew.content && mew.content.toString().trim !== '';
}


app.post('/mews', (req, res) => {
	if(isValidMew(req.body)){
		const mew={
			name: req.body.name.toString(),
			content:req.body.content.toString(),
			created: new Date()
			
		};
		
	mews
	  .insert(mew)
	  .then(createdMew => {
		  res.json(createdMew);
		  
	  });
	  
	 
	  
	console.log(mew);
	
	}else{
		res.status(422);
		res.json({
			message: 'Hey! Name and Content are required!'
		});
		
	}
	
	//console.log(req.body);
	
});

app.listen(5000, () => {
	console.log('Listening on http://localhost:5000');
	
});