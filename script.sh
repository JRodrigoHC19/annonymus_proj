#!/bin/bash

git clone https://github.com/JRodrigoHC19/annonymus_proj.git project

cd project

docker-compose up -d

echo "Servicios desplegados"