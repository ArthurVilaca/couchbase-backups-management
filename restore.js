export async function execute() {
  `sudo /opt/couchbase/bin/cbrestore couchbase://${process.env.DB_HOST}:8091 /backup-events -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' -b ${process.env.DB_BUCKET}`
}