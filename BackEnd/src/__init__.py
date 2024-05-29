import os
from flask import Flask
from flask_cors import CORS
import dotenv
from .server import server
dotenv.load_dotenv()

def create_app():
    # create flask app
    app = Flask(__name__)
    CORS(app)
    # register the route 
    app.register_blueprint(server)

    return app