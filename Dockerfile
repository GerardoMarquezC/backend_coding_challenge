FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g html-pdf
RUN apt-get update & apt-get install libssl-dev
COPY . .
CMD [ "node", "app.js" ]
EXPOSE 8080
