from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider

cloud_config= {
        'secure_connect_bundle': 'secure-connect-HackDook.zip'
}
auth_provider = PlainTextAuthProvider('HackDook', 'DukeHack2020')
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect('HackDook')

row = session.execute("select release_version from system.local").one()
if row:
    print(row[0])
else:
    print("An error occurred.")

def predicted(text, score):
    stmt = session.prepare(" INSERT INTO predicted (text, score) VALUES (?, ?)")
    results = session.execute(stmt, [text, score])

def user_generated(text, score):
    stmt = session.prepare(" INSERT INTO user_generated (text, score) VALUES (?, ?)")
    results = session.execute(stmt, [text, score])

predicted('asd', 8)
