const endpoint = 'https://api.foursquare.com/v2/venues/explore';
const clientId = process.env.REACT_APP_FS_CLIENT_ID
const clientSecret = process.env.REACT_APP_FS_CLIENT_SECRET;

export const searchFourSquare = (near, section) => {
    const apiVersion = '20191014';
    const url = `${endpoint}?client_id=${clientId}
        &client_secret=${clientSecret}&near=${near}
        &limit=10&v=${apiVersion}&section=${section}`;
    return fetch(url).then(
        response => response.json()
    ).then(
        jsonResponse => {
            return jsonResponse.response.groups[0].items
        }
    )
};


export const formatResults = jsonResults => {
    return jsonResults.map(
        landmark => {
            return {
                id: landmark.venue.id,
                name: landmark.venue.name,
                address: landmark.venue.location.address,
                city: landmark.venue.location.city,
                state: landmark.venue.location.state,
                postalCode: landmark.venue.location.postalCode,
                country: landmark.venue.location.country,
                category: landmark.venue.categories.filter(category => category.primary)[0].name,
            }
        }
    )
};
