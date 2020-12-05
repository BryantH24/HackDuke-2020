import numpy as np
from flask import Flask, request, jsonify
from HateSpeechClassificationModel.classifier import get_tweets_predictions


app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict', methods=['POST'])
def predict():
    examples = [x for x in request.form.values()]
    final_examples = [np.array(features)]
    predictions = model.get_tweets_predictions(final_examples, False)

    return predictions

if __name__ == "__main__":
    app.run()
