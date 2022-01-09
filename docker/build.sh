#!/bin/bash
#
# build.sh
#

echo "*** Build minimal test images."
# docker image rm brokermqtt controller
docker build -t brokermqtt -f ./Dockerfile.brokermqtt .
docker build -t mynodejs -f ./Dockerfile.mynodejs .
docker build -t applicazione -f ./Dockerfile.applicazione .
docker build -t valvola -f ./Dockerfile.valvola .
docker build -t umidificatore -f ./Dockerfile.umidificatore .
docker build -t split -f ./Dockerfile.split .
docker build -t luce -f ./Dockerfile.luce .
docker build -t tapparella -f ./Dockerfile.tapparella .
docker build -t pulsantiera -f ./Dockerfile.pulsantiera .
docker build -t sonda -f ./Dockerfile.sonda .
docker image prune --force
