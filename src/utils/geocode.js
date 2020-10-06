const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZWRnYXJkbzUzNCIsImEiOiJja2Z0cTk1eHYwYXVoMnhxZnp4YnZobXM2In0.AJfP7NIVNJ8KVPVcoJImjA&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('No se pudo conectar con los servicios de localizacion!')
        } else if (body.features.length == 0) {
            callback('No se obtuvo ningun resultado de la busqueda. intente otra busqueda', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode