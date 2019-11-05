import { backendEndPoint } from "./utils";

export class AuthService {
    static registerUser(username, password) {
        const url = `${backendEndPoint}/api/register`;
        const body = {username: username, password: password};
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': backendEndPoint
            },
            body: JSON.stringify(body)
        }).then(
            response => {
                return response.json()
            }
        ).catch(
            error => {
                return {'error': 'Couldn\'t register'}
            }
        )
    }

    static loginUser(username, password) {
        const url = `${backendEndPoint}/api/login`;
        const body = {username: username, password: password};
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': backendEndPoint,
            },
            body: JSON.stringify(body)
        }).then(
            response => response.json()
        ).then(
            response => {
                window.localStorage.setItem('jwtAccessToken', response.access_token);
                return response
            }
        )

    }

    static checkLoginStatus() {
        const url = `${backendEndPoint}/api/user/`;
        const token = window.localStorage.getItem('jwtAccessToken');
        if (token) {
            return fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': backendEndPoint,
                    'Authorization': `JWT ${token}`
                }
            }).then(response => response.json()).then(
                response => {
                    if ('error' in response) {
                        return ''
                    } else {
                        return token
                    }
                }
            )
        } else {
            return new Promise(resolve => resolve(''))
        }
    };

    static logOut() {
        window.localStorage.removeItem('jwtAccessToken');
    }
}