FROM node:18.18.1 AS production

RUN apt-get update
RUN apt-get upgrade -y

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Set the timezone
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Add application code.
COPY . .

RUN npm run build

# Copy .next to temp location for deployment
RUN cp -Rpf /app/.next /tmp/.next

# Explicitly set port 3000 as open to requests.
EXPOSE 3000

CMD [ "sh", "provisioning/app-start" ]
