from flask import Flask
from app.routes import api
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(api)
    app.register_blueprint(api)
    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
