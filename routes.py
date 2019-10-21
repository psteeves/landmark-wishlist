from flask import Blueprint, request, jsonify

from models import Landmark, User, db

api = Blueprint("api", __name__)


@api.route("/api/users/<username>", methods=["GET", "POST", "DELETE"])
def user(username):
    if request.method == "GET":
        user_row = User.query.filter_by(username=username).first_or_404(
            description=f"No user with username {username} found"
        )
        user_landmarks = [l.as_dict() for l in user_row.landmarks]
        return jsonify(landmarks=user_landmarks)

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

    return user_row.username


@api.route("/api/user-landmark", methods=["POST", "DELETE"])
def add_or_remove_location():
    location_data = request.get_json()
    user_id = location_data["user_id"]
    user_row = User.query.filter_by(username=user_id).first_or_404()

    if request.method == "POST":
        landmark_row = Landmark.query.filter_by(id=location_data["id"]).first()
        if landmark_row is None:
            landmark_row = Landmark(
                id=location_data["id"],
                name=location_data["name"],
                address=location_data["address"],
                city=location_data["city"],
                state=location_data["state"],
                postal_code=location_data["postalCode"],
                country=location_data["country"],
                category=location_data["category"],
            )
        user_row.landmarks.append(landmark_row)
        db.session.add(user_row)

    else:
        try:
            landmark_row = [l for l in user_row.landmarks if l.id == location_data["id"]][0]
        except IndexError:
            raise ValueError(f"Landmark with id {location_data['id']} not in user {user_id}\'s preferences")
        user_row.landmarks.remove(landmark_row)
        db.session.add(user_row)

    db.session.commit()
    return landmark_row.name
