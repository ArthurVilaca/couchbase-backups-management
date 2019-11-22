import os
import json
import logging

from couchbase.cluster import Cluster
from couchbase.cluster import PasswordAuthenticator

from live_feed import format_object_live_feed
from ranking import format_object_ranking
from reply import format_object_replys

logger = logging.getLogger()
logger.setLevel(logging.INFO)

cluster = Cluster('couchbase://localhost')
authenticator = PasswordAuthenticator('Administrator', 'SV^2h8JjB7ZsQaP3QpF&')
cluster.authenticate(authenticator)
cb = cluster.open_bucket('events')

print("SUCCESS: Connection to Couchbase Server")

from couchbase.n1ql import N1QLQuery

row_iter = cb.n1ql_query(N1QLQuery("select * from `events` where `company`.`id` = 1 and `event_kind` in ['open', 'reply', 'bounce'] order by `created_at` DESC limit 30"))
# row_iter = cb.n1ql_query(N1QLQuery("select `user`, count(*) as total, SUM(CASE WHEN `event_kind` == 'delivery' THEN 1 ELSE 0 END) as delivery, SUM(CASE WHEN `event_kind` == 'open' THEN 1 ELSE 0 END) as open, SUM(CASE WHEN `event_kind` == 'reply' THEN 1 ELSE 0 END) as reply, SUM(CASE WHEN `event_kind` == 'bounce' THEN 1 ELSE 0 END) as bounce, SUM(CASE WHEN `event_kind` == 'soft_bounce' THEN 1 ELSE 0 END) as soft_bounce, SUM(CASE WHEN `contact`.`stage` == 'lost' THEN 1 ELSE 0 END) as lost, SUM(CASE WHEN `contact`.`stage` == 'client' THEN 1 ELSE 0 END) as client from `events` where created_at > '2017-01-01' and `company`.`id` = 1 group by `user`"))
# row_iter = cb.n1ql_query(N1QLQuery("select COUNT(*) as reply from `events` where `event_kind` == 'reply' and `company`.`id` = 1"))

for row in row_iter:
  print(format_object_live_feed(row['events']))
  # print(format_object_ranking(row))
  # print(format_object_flow_replys(row))

# def main_handler(event, context):
#   return {
#       "statusCode": 200,
#       "body": json.dumps('Cheers from AWS Lambda!!')
#   }

