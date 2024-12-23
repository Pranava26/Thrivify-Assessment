from app import create_app
import os
from flask import send_from_directory

app = create_app()

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

#serve static files from dist folder under frontend dir
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

#api routes
import routes

if __name__ == "__main__":
    app.run()