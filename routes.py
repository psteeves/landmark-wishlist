from flask import Blueprint, request
from utils import search_foursquare


api = Blueprint("api", __name__)


@api.route("/")
def index():
    return "<h1>Hello world</h1>"


@api.route("/search_foursquare")
def search():
    near = request.args.get("near", "")
    section = request.args.get("section", "")
    results = search_foursquare(near, section)["response"]
    return results
