#!/bin/bash

IP_AUTH=54.67.101.141

git clone https://github.com/JRodrigoHC19/annonymus_proj.git project
cd project

echo "export const environment = { api_url: 'http://$IP_AUTH:3000/api/users/login' };" > env.ts

docker-compose up -d

echo "Servicios desplegados"