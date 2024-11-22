#!/bin/bash
set -e

eval "$(jq -r '@sh "APPLICATION_NAME=\(.application_name) ENVIRONMENT=\(.environment)"')"

FILE_PATH="lambda-build/lambda.zip"
CONTAINER_ID=$(docker create "koaris-auth:latest")

docker cp ${CONTAINER_ID}:/usr/src/app lambda-build > /dev/null
docker rm -v ${CONTAINER_ID} > /dev/null

cd lambda-build
zip -r lambda.zip . > /dev/null
cd ..

CHUNK_SIZE=262144000  # 50 MB in bytes
split -b $CHUNK_SIZE "$FILE_PATH" "${FILE_PATH}.part_"

jq -n --arg file_path "$FILE_PATH" '{"file_path":$file_path}'
