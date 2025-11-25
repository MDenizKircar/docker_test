FROM keinos/sqlite3:latest

WORKDIR /data
COPY db.sqlite /data/db.sqlite

VOLUME ["/data"]

CMD ["sh", "-c", "touch /data/db.sqlite && tail -f /dev/null"]
