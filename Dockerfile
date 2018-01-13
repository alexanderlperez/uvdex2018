FROM mhart/alpine-node:8
ARG NODE_PORT
ENV NODE_PORT $NODE_PORT

EXPOSE $NODE_PORT

#install git
RUN apk update
RUN apk add git

# bundle app src and install app deps
WORKDIR /app
COPY . .
RUN npm install

CMD PORT=$NODE_PORT node ./app.js
