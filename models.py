from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


user_venues = db.Table(
    "user_venues",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("venue_id", db.Integer, db.ForeignKey("venue.id"), primary_key=True),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(1000), unique=True, nullable=False)
    locations = db.relationship(
        "Venue", secondary=user_venues, backref="users", lazy=True
    )

    def __repr__(self):
        return f"<User {self.username}>"


class Venue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(1000), nullable=False)
