### STAGE 1:BUILD ###
FROM node:19-alpine AS build

RUN mkdir /src
WORKDIR /src

RUN npm cache clean --force

COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:latest AS ngi
USER root

COPY --from=build /src/dist/incidisfy-frontend-web /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 8080
