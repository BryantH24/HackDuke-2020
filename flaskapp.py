import numpy as np
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
model = pickle.load(open('final_model.pkl', 'rb'))

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('predict', methods=['POST'])
def predict():
    examples = [x for x in request.form.values()]
    final_examples = [np.array(features)]
    predictions = model.get_tweets_predictions(final_examples, False)

    return predictions