FROM node:14 AS production

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies.
COPY package.json ./
RUN npm install

# Add application code.
COPY . .

RUN npm run build

CMD [ "npm", "start" ]
