const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = 'f5e0f93e845ecb2d75c6f0c2189d3537'
let city = 'Tartu'

app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp) -273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.post('/', function (req, res){
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`).then((respons) => {
        return respons.json()
    })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp) - 273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.listen(3000)
console.log('http://localhost:3000')