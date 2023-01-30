FROM node:alpine

WORKDIR /usr/react_app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4020

CMD ["serve", "-s", "build"]