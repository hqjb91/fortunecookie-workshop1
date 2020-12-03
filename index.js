// Load libraries
const express = require('express');
const morgan = require('morgan');
const fortuneCookie = require('fortune-cookie');
const cors = require('cors');
const path = require('path');

const cookies = () => {
    const idx = Math.floor(Math.random() * (fortuneCookie.length-1));

    return fortuneCookie[idx];
};

// Configuration
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

// Create an instance of express
const app = express();

// Use morgan to log all requests using combined format
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '/frontend')));

// Configure resources
// GET /api/cookie -> application/json { cookie: 'cookie text' }
// GET /api/cookie?count=4 -> application/json [ { cookie: 'cookie text' } ...]
app.get('/api/cookie', cors(), (req, res) => {

    const count = parseInt(req.query['count']) || 1;

    res.status(200);
    res.type('application/json');

    if (count === 1) {
        res.json({cookie : cookies()});
    } else {
        const c = [];
        for(let i=0; i<count; i++){
            c.push({cookie: cookies()});
        };
        res.json(c);
    };
});

// Start server
app.listen(PORT, () => {
    console.log(`You have connected on port ${PORT} at ${new Date()}`);
})