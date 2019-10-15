from flask import Flask
from routes import api
from flask_cors import CORS
from config import Config


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQL_ALCHEMY_DATABASE_URI
    CORS(api)
    app.register_blueprint(api)
    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
