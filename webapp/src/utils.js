const fourSquareEndpoint = 'https://api.foursquare.com/v2/venues/explore';
const fourSquareClientId = process.env.REACT_APP_FS_CLIENT_ID;
const fourSquareClientSecret = process.env.REACT_APP_FS_CLIENT_SECRET;
import { AuthService } from "./AuthService";

// Port to communicate with backend
export const backendEndPoint = 'http://localhost:5000';


// Get results from FourSquare API
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
    ).catch(error => {
        console.log("An error occurred during the search");
        return []
    })
};

// Add or remove landmark from favorite, depending on the method specified (POST or DELETE)
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


// Get a user's previously favorited landmarks
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


// Format FoursSquare API results to cleaner format
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
