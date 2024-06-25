const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware setup
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Set EJS as templating engine
app.set('view engine', 'ejs'); // Set EJS as the view engine

// GET route to render the index page with a random activity
app.get('/', async (req, res) => {
    try {
        // Fetch a random activity from the API
        const response = await axios.get('https://bored-api.appbrewery.com/random');
        const result = response.data; // Extract data from the response
        console.log(result); // Log the fetched data to console
        res.render('index.ejs', { data: result }); // Render 'index.ejs' with data
    } catch (error) {
        console.error('Error fetching data:', error.message); // Log error message
        res.render('index.ejs', { error: error.message }); // Render 'index.ejs' with error message
    }
});

// POST route to handle form submission and filter activities
app.post('/', async (req, res) => {
    try {
        console.log(req.body); // Log the form data submitted
        const type = req.body.type; // Get 'type' parameter from form
        const participants = req.body.participants; // Get 'participants' parameter from form
        
        // Fetch activities based on type and participants from the API
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
        const result = response.data; // Extract data from the response
        console.log(result); // Log the fetched data to console

        // Render 'index.ejs' with a random activity from filtered results
        res.render('index.ejs', {
            data: result[Math.floor(Math.random() * result.length)]
        });
    } catch (error) {
        console.error('Error fetching data:', error.message); // Log error message
        res.render('index.ejs', { error: error.message }); // Render 'index.ejs' with error message
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
