from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    CORS(app)

    with app.app_context():
        from .routes import habit_routes
        app.register_blueprint(habit_routes)
    
    return app