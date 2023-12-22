FROM node:16.16.0-alpine3.16

WORKDIR /app

# uncomment this if you want to use Google Cloud SQL
RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
RUN chmod +x cloud_sql_proxy

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

# uncomment this if you want to use Google Cloud SQL
CMD ["sh", "-c", "./cloud_sql_proxy -instances=$CLOUD_SQL_CONNECTION_NAME=tcp:0.0.0.0:3306 & ls & npm run start:prod"]
# CMD ["npm run start:prod"]