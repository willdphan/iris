import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from flask_cors import CORS

# Create flask app
flask_app = Flask(__name__)
CORS(flask_app)

model = pickle.load(open("model.pkl", "rb"))

@flask_app.route("/")
def home():
    return 'Welcome to Flower Predictor!'

@flask_app.route("/predict", methods=["POST"])
def predict():
    try:
        # Retrieve and parses the JSON data input values from the request sent from client
        data = request.get_json()
        # convert the JSON values to float values
        sepalLength = float(data["sepalLength"])
        sepalWidth = float(data["sepalWidth"])
        petalLength = float(data["petalLength"])
        petalWidth = float(data["petalWidth"])

        # Format the input values as a NumPy array
        # machine learning model expects input data in the form of arrays or matrices
        features = np.array([[sepalLength, sepalWidth, petalLength, petalWidth]])

        # Make the prediction using the model
        prediction = model.predict(features)
        prediction_text = "The flower species is {}".format(prediction[0])

        # Create a JSON response
        response = {
            "prediction_text": prediction_text
        }

        return jsonify(response)
    except Exception as e:
        return str(e), 500

if __name__ == "__main__":
    flask_app.run(debug=True)
