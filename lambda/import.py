import json
import uuid

from couchbase.cluster import Cluster
from couchbase.cluster import PasswordAuthenticator
cluster = Cluster('couchbase://localhost')
authenticator = PasswordAuthenticator('Administrator', 'SV^2h8JjB7ZsQaP3QpF&')
cluster.authenticate(authenticator)
cb = cluster.open_bucket('events')

ffiles = ['x990057e', 'x990058e', 'x990056e']

for ffile in ffiles:
    print('file ->>>>>>>>>> ', ffile)
    complete_path = "./%s"%(ffile)
    str_jsons = open(complete_path, "r")
    for str_json in str_jsons:
        jjson = json.loads(str_json)
        print(cb.upsert(str(uuid.uuid4()), jjson))