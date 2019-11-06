from flask import Flask
from flask_cors import CORS
from flask_jwt import JWT

from config import Config
from models import db, User
from routes import api


def create_app():
    app = Flask(__name__)
    app.config['JWT_AUTH_URL_RULE'] = '/api/login'
    app.secret_key = Config.JWT_SECRET_KEY
    JWT(app, User.authenticate, User.search_by_jwt_payload)
    app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQL_ALCHEMY_DATABASE_URI
    app.register_blueprint(api)
    db.init_app(app)
    with app.app_context():
        db.create_all()
    CORS(app, origins="http://localhost:3000")
    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
