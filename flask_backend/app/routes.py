from flask import Blueprint, jsonify, send_from_directory
from .services.habit_suggestions import generate_habit_suggestions
import os

habit_routes = Blueprint('habit_routes', __name__)

@habit_routes.route('/generate-habit-suggestions', methods=['GET'])
def get_habit_suggestions():
    suggestions = generate_habit_suggestions()
    return jsonify(suggestions), 200


habit_routes = Blueprint('habit_routes', __name__)

# Serve React frontend
@habit_routes.route('/', defaults={'path': ''})
@habit_routes.route('/<path:path>')
def serve_react_app(path):
    react_build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../frontend/dist'))
    if path != "" and os.path.exists(os.path.join(react_build_dir, path)):
        return send_from_directory(react_build_dir, path)
    return send_from_directory(react_build_dir, 'index.html')
