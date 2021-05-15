const path = require('path');
const express = require('express');
const request = require('postman-request')
const hbs = require('hbs');


const forecast = require('./utils/forecast.js')
const geolocation = require('./utils/geolocation.js');
const { callbackify } = require('util');

// Define paths for express config
const staticPublic = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();

// Setup static dir to serve
app.use(express.static(staticPublic));

// Setup handlebars and views 
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        page_title: "Index",
        title: "weather",
        name: "weather app"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        page_title: "About",
        title: "weather",
        name: "weather app"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        page_title: "Help",
        persons: [
            { name: 'Serge', age: 20 },
            { name: 'Kate', age: 19 }
        ]
    });
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send("Provide address")
    } else {
        let city = req.query.address
        geolocation(city, (err, { lat, long } = {}) => {
            if (err) {
                return res.send({ err })
            }
            forecast(lat, long, (err, weather) => {
                if (err) {
                    return res.send({ err })
                } 
                res.send([city, weather]);
            })
        })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        page_title: '404',
        message: "No such help article"
    });
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        page_title: '404',
        message: "No such about article"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        page_title: '404',
        message: "Page not found"
    });
})


// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log("Express is up on port 3000")
})