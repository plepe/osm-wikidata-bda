#!/bin/sh
git pull
docker build -t skunk/ogd-wikimedia-osm-checker .
docker container rm -f checker
docker run --name checker --restart=always -p 127.0.0.1:43210:8080 -d skunk/ogd-wikimedia-osm-checker
