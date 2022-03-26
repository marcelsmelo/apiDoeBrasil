FROM node:14

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ENV NODE_ENV=development

COPY package-lock.json .

COPY package.json .

RUN npm install

COPY wait-for-it.sh /home/node/app/wait-for-it.sh

RUN ["chmod", "+x", "/home/node/app/wait-for-it.sh"]

COPY . .

#COPY --chown=node:node . .

#USER node

EXPOSE 8080

#CMD ["npm", "start"]