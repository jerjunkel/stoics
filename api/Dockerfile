FROM node:20-slim

EXPOSE 3000

RUN apt-get update && apt-get install -y vim 

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci && npm cache clean --force

COPY --chown=node:node ./dist/ .

CMD ["node", "index.js"]

