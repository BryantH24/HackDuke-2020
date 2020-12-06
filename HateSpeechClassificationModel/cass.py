from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import uuid

cloud_config= {
        'secure_connect_bundle': 'secure-connect-HackDook.zip'
}
auth_provider = PlainTextAuthProvider('x', 'password')
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect('hackdook')

def predicted(text, score):
    stmt = session.prepare(" INSERT INTO hackdook.predicted (id, score, submitted) VALUES (?, ?, ?)")
    results = session.execute(stmt, [uuid.uuid4(),  score, text])

def user_generated(text, score):
    stmt = session.prepare(" INSERT INTO hackdook.user_generated ( id, submitted, score) VALUES (?, ?, ?)")
    results = session.execute(stmt, [uuid.uuid4(), text, score])
