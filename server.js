const express = require('express');
const bodyParser = require('body-parser');
var path 		=require('path');
var crypto = require('crypto');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
const app = express();

var crfArray=[];
const csrfMiddleware = csurf({
  cookie: true
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/post.html'));
});

app.post('/login', (req, res) => {
  console.log(`Message received: ${req.body.username}`);
  	if(req.body.username=='admin' && req.body.password=='admin'){
  		res.json({success:true})
  	}else{
		  res.json({success:false})
	}
});


app.post('/posts', (req, res) => {
    const token = req.body.token;
    const session_id = req.cookies['session-id'];
    const cokkie_token = req.cookies['token'];
    //const token=req.body.token;
    console.log('as')
    if(token==cokkie_token){
    	
    		res.json({success:true})
    	
    }else{
    	res.json({success:false});
    }

});

// app.use(cookieParser());
// app.use(csrfMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};