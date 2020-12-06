from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from app.core import DataStore
from app.core import Model

from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import uuid

cloud_config= {
        'secure_connect_bundle': 'secure-connect-HackDook.zip'
}
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect('hackdook')

def predicted(text, score):
    stmt = session.prepare(" INSERT INTO hackdook.predicted (id, score, submitted) VALUES (?, ?, ?)")
    results = session.execute(stmt, [uuid.uuid4(),  score, text])

def user_generated(text, score):
    stmt = session.prepare(" INSERT INTO hackdook.user_generated ( id, submitted, score) VALUES (?, ?, ?)")
    results = session.execute(stmt, [uuid.uuid4(), text, score])

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    # TODO: return a front end page that can call /demo or /label
    return ''

@app.route('/demo')
def demo():
    """ Endpoint to see the model's performance on a random test set example. """
    tweet, label = DataStore.get_random_test()
    return_json = Model.predict([tweet])[0]
    return_json['true'] = int(label)
    return jsonify(return_json)

@app.route('/label', methods=['POST'])
@cross_origin()
def predict():
    """ Applies the model to the 'text' entry of the payload. """
    content = request.json
    y = Model.predict([content['text']])[0]
    predicted(y['text'],y['label'])
    return jsonify(y)


if __name__ == '__main__':
    app.run()
