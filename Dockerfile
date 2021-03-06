FROM node:14 AS production

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Set the timezone
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install dependencies.
COPY package.json ./
RUN npm install

# Add application code.
COPY . .

RUN npm run build

# Explicitly set port 3000 as open to requests.
EXPOSE 3000

CMD [ "npm", "start" ]
