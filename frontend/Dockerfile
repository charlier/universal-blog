FROM node:alpine
WORKDIR /src

# correct timezones
RUN apk --update upgrade && \
    apk add --no-cache --virtual .build-deps tzdata && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone && \
    apk del .build-deps

# cache++
COPY package.json /src/package.json
RUN npm install

# move the app over, test
COPY . /src
RUN npm test && \
    npm run build


# Production container
# Improve me to be a single layer image
FROM node:alpine
WORKDIR /app

# correct timezones, install curl for healthcheck
RUN apk --update upgrade && \
    apk add --no-cache --virtual .build-deps tzdata && \
    apk add --no-cache curl && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone && \
    apk del .build-deps

HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1
EXPOSE 3000

COPY --from=0 /src/package.json .

# Install prod packages.
RUN npm install --production

COPY --from=0 /src/dist ./dist

CMD ["npm", "run", "server"]


