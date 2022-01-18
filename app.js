
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3001

const restrictedWords = ['fraud', 'flipping', 'heck', 'gary'];
const reallyBadWords = [];

let msg;

console.log(`bad words: ${restrictedWords}`)

app.get( '/health', (req, res) => {
    res.send( "healthy" );
  });

app.all('/filter', (req, res) => {
    console.log(req.body.Body);
    msg = req.body.Body;
    
    if (restrictedWords.some(v => msg.includes(v))) {
        console.log(`Match using "${msg}"`);
        res.status(412).send(`sorry, ${req.body.Author} but you said a naughty word! Responding 412`)
    } else {
        console.log(`No match using "${msg}"`);
    }

    res.send('welcome, ' + req.body.Author)
});

app.all('/check-and-filter', (req, res) => {
    console.log(req.body.Body);
    msg = req.body.Body;
    
    if (restrictedWords.some(v => msg.includes(v))) {
        console.log(`Match using "${msg}"`);
        var newMsg = msg.replace(new RegExp(restrictedWords.join('|'), 'g'), '****');
        console.log(msg.replace(new RegExp(restrictedWords.join('|'), 'g'), '****'));
        res.status(200).json({"body":newMsg, "Body": newMsg});
    } else {
        console.log(`No match using "${msg}"`);
        res.status(200).json();
        return;
    }

});

app.all('/modqueue', (req, res) => {
    res.send("//TODO")
})

const server = app.listen(port, function() {
    console.log("Server running at http://127.0.0.1:" + port + "/");
  });