#!/bin/bash

IMAGE_NAME="incidisfy-frontend-web"
CONTAINER_NAME="incidisfy-frontend-web"

echo "-> Parando a execução atual do container: ${CONTAINER_NAME}"
docker stop ${CONTAINER_NAME}

echo "-> Removendo imagem:  ${IMAGE_NAME}"
docker image rm ${IMAGE_NAME}:latest -f

echo "-> Gerando imagem:  ${IMAGE_NAME}"
docker build . -f Dockerfile -t ${IMAGE_NAME}:latest

echo "-> Removendo container:  ${CONTAINER_NAME}"
docker rm ${CONTAINER_NAME}

echo "-> Executando container:  ${CONTAINER_NAME}"
docker run -p '4500:8080' --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest
