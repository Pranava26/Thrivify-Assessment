from flask import Blueprint, jsonify
from .services.habit_suggestions import generate_habit_suggestions


habit_routes = Blueprint('habit_routes', __name__)

@habit_routes.route('/generate-habit-suggestions', methods=['GET'])
def get_habit_suggestions():
    suggestions = generate_habit_suggestions()
    return jsonify(suggestions), 200