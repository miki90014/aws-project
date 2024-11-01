FROM node:21-slim
ARG FRONTEND_PORT 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY node_modules ./node_modules
EXPOSE ${FRONTEND_PORT}
CMD [ "npm", "start" ]