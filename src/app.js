const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Definir las rutas para configuracion de express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewaPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//configuracion de hanlebars y localizacion de las vistas
app.set('view engine', 'hbs')
app.set('views', viewaPath)
hbs.registerPartials(partialsPath)

//configuracion del directorio estatico para el servidor
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Rothy',
        name: 'Rothy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rothy',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debe proporcionar una direccion'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(longitude, latitude, (error, dataForecast) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: dataForecast,
                    location,
                    address: req.query.address
                })
            })
        })
        // res.send({
        //     forecast: "It is showing",
        //     location: 'Philadelphia',
        //     address: req.query.address
        // })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No proporciono un termino de busqueda'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 ',
        message: 'Help article not found',
        name: 'Rothy'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ',
        message: 'Page not found',
        name: 'Rothy'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})