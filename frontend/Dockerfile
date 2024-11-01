FROM node:21-slim
ARG FRONTEND_PORT 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
EXPOSE ${FRONTEND_PORT}
CMD [ "npm", "start" ]