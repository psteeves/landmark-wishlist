const fourSquareEndpoint = 'https://api.foursquare.com/v2/venues/explore';
const fourSquareClientId = process.env.REACT_APP_FS_CLIENT_ID;
const fourSquareClientSecret = process.env.REACT_APP_FS_CLIENT_SECRET;
import { AuthService } from "./AuthService";

export const backendEndPoint = 'http://localhost:5000';


export const searchFourSquare = (near, section) => {
    const apiVersion = '20191014';
    const url = `${fourSquareEndpoint}?client_id=${fourSquareClientId}
        &client_secret=${fourSquareClientSecret}&near=${near}
        &limit=20&v=${apiVersion}&section=${section}`;
    return fetch(url).then(
        response => response.json()
    ).then(
        jsonResponse => {
            return jsonResponse.response.groups[0].items
        }
    )
};

export const toggleFavoriteLandmark = (landmark, method) => {
    return AuthService.checkLoginStatus().then(
        token => {
            const url = `${backendEndPoint}/api/user-landmark`;
            return fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': backendEndPoint,
                    'Authorization': `JWT ${token}`
                },
                body: JSON.stringify(landmark)
            }).then(
                response => {
                    return response.text();
                }
            )
        }
    )
};

export const listFavorites = () => {
    return AuthService.checkLoginStatus().then(
        token => {
            const url = `${backendEndPoint}/api/user/`;
            return fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': backendEndPoint,
                        'Authorization': `JWT ${token}`
                    }
                }
            )
        }
        ).then(
            response => {
                return response.json()
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
            }
        }
    )
};
