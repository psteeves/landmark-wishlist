from flask import Blueprint, request, jsonify
from utils import search_foursquare
from models import db, User


api = Blueprint("api", __name__)


@api.route("/api/search_foursquare")
def search():
    near = request.args.get("near", "")
    section = request.args.get("section", "")
    results = search_foursquare(near, section)["response"]
    return results


@api.route("/api/users/<username>", methods=["GET", "POST", "DELETE"])
def user(username):
    if request.method == "GET":
        user_row = User.query.filter_by(username=username).first_or_404(
            description=f"No user with username {username} found"
        )

    elif request.method == "POST":
        user_row = User(username=username)
        db.session.add(user_row)
        db.session.commit()

    else:
        user_row = User.query.filter_by(username=username).first_or_404(
            description=f"No user with username {username} found"
        )
        db.session.delete(user_row)
        db.session.commit()

    return str(user_row)