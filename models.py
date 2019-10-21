from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


user_landmarks = db.Table(
    "user_landmarks",
    db.Column("user_id", db.ForeignKey("user.id"), primary_key=True),
    db.Column(
        "landmark_id", db.ForeignKey("landmark.id"), primary_key=True
    ),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(1000), unique=True, nullable=False)
    landmarks = db.relationship(
        "Landmark", secondary=user_landmarks, backref="users", lazy=True
    )

    def __repr__(self):
        return f"<User {self.username}>"


class Landmark(db.Model):
    id = db.Column(db.String(1000), primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    address = db.Column(db.String(1000), nullable=False)
    city = db.Column(db.String(1000), nullable=False)
    state = db.Column(db.String(1000), nullable=False)
    postal_code = db.Column(db.String(1000), nullable=False)
    country = db.Column(db.String(1000), nullable=False)
    category = db.Column(db.String(1000), nullable=False)

    def __repr__(self):
        return f"<Landmark {self.name}>"

    def as_dict(self):
        state = self.__dict__
        state.pop("_sa_instance_state")
        return state
