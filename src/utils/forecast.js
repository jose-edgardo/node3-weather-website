const request = require('request')

const forecast = (longitud, latitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=008b807d217102fa3d4b9ad0ace3b96a&query=' + latitud + ',' + longitud + '&units=f'
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('No se pudo establecer conexion con el servicio de meteorologia!', undefined)
        } else if (body.error) {
            callback('nose encontro la localizacion')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' temperatura: ' + body.current.temperature + '. sensacion termica: ' + body.current.feelslike)

        }
    })
}

module.exports = forecast