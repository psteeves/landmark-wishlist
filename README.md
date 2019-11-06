# Landmark WishList

Add places to your wishlist that you'd like to visit on your next trip! Tailored towards hungry, thirsty, or outdoorsy people.

## Setup

### Cloning
`git clone git@github.com:psteeves/landmark-wishlist.git`
### Authentication
Copy `.env.dist` to `.env` and `webapp/.env.dist` to `webapp/.env`.<br>
In `.env`, enter a random alphanumeric sercret key for JWT authentication. Make sure the key is long enough and secure.<br>
In `webapp/.env`, enter your credentials for the FourSquare API. Instructions for how to sign up [here](https://foursquare.com/developers/apps).<br>
### Running the application
Just run `docker-compose up`, and visit your browser at [http://localhost:3000/](http://localhost:3000/).
## Requirements
- [docker](https://docs.docker.com) ≥ 18.09
- [docker-compose](https://docs.docker.com/compose/)
