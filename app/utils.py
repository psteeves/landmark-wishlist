import requests

CLIENT_ID = "ML03YI32MXTKVN1MIEYTHPLU5G3D1SNCWYJEGHGECYJERXCA"
CLIENT_SECRET = "H3NPMO3132Z3SD2SDWA2VJRTNZBZECOCUU1PNFM5W2F42YFP"
ENDPOINT = "https://api.foursquare.com/v2/venues/explore"


def search_foursquare(near, section):
    api_version = "20191014"
    params = {"client_id": CLIENT_ID,
              "client_secret": CLIENT_SECRET,
              "near": near,
              "section": section,
              "limit": 10,
              "v": api_version}
    response = requests.get(ENDPOINT, params=params)
    return response.json()
