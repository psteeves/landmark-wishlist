from flask import Blueprint, request, jsonify
from flask_jwt import jwt_required, current_identity
from models import Landmark, User, db


api = Blueprint("api", __name__)


@api.route("/api/register", methods=["POSt"])
def register():
    user_info = request.get_json()
    user_row = User(username=user_info["username"])
    user_row.set_password(user_info["password"])
    db.session.add(user_row)
    db.session.commit()
    return jsonify(username=user_info["username"])


@api.route("/api/user/", methods=["GET", "DELETE"])
@jwt_required()
def user():
    user_row = current_identity
    if request.method == "GET":
        user_landmarks = [l.as_dict() for l in user_row.landmarks]
        return jsonify(landmarks=user_landmarks)

    else:
        db.session.delete(user_row)
        db.session.commit()

    return jsonify(username=user_row.username)


@api.route("/api/user-landmark", methods=["POST", "DELETE"])
@jwt_required()
def add_or_remove_location():
    user_row = current_identity
    location_data = request.get_json()

    if request.method == "POST":
        landmark_row = Landmark.query.filter_by(id=location_data["id"]).first()
        if landmark_row is None:
            landmark_row = Landmark(
                id=location_data["id"],
                name=location_data["name"],
                address=location_data["address"],
                city=location_data["city"],
                state=location_data["state"],
                postal_code=location_data.get("postalCode", ""),
                country=location_data["country"],
                category=location_data["category"],
            )
        user_row.landmarks.append(landmark_row)
        db.session.add(user_row)

    else:
        landmark_row = [l for l in user_row.landmarks if l.id == location_data["id"]][0]
        user_row.landmarks.remove(landmark_row)
        db.session.add(user_row)

    db.session.commit()
    return landmark_row.name
