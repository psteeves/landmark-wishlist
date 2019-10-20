from flask import Blueprint, request

from models import Landmark, User, db

api = Blueprint("api", __name__)


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


@api.route("/api/add-landmark", methods=["POST"])
def add_location():
    location_data = request.get_json()
    user_id = "pat2701"  # TODO remove hard coded user
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
    new_landmark = Landmark.query.filter_by(id=landmark_row.id).scalar() is not None
    if new_landmark:
        db.session.add(landmark_row)
        db.session.commit()

    user_row = User.query.filter_by(username=user_id).first_or_404()
    user_row.landmarks.append(landmark_row)

    db.session.add(user_row)
    db.session.commit()
    return user_row.landmarks[-1].name
