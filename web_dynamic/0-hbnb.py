#!/usr/bin/python3
"""Create a Flask app
that listens on port 5000"""
from flask import Flask, render_template
from models import storage
from models.state import State
from models.amenity import Amenity
from models.place import Place
from uuid import uuid4

app = Flask(__name__)


@app.route('/0-hbnb/', strict_slashes=False)
def hbnb():
    """Display a HTML page"""
    states = storage.all(State).values()
    amenities = storage.all(Amenity).values()
    places = storage.all(Place).values()
    return render_template('100-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid4())


@app.teardown_appcontext
def teardown_db(exception):
    """Close the current db session"""
    storage.close()


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
