FROM node:16.15.0-alpine3.15@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb as build

ENV HTTP_PROXY="http://proxy.charite.de:8080/"
ENV HTTPS_PROXY="http://proxy.charite.de:8080/"	
ENV FTP_PROXY="http://proxy.charite.de:8080/"	 
ENV NO_PROXY="localhost,127.0.0.1,*.charite.de,charite.de"	 

WORKDIR /app

COPY . .

RUN npm ci --verbose --no-audit --production --prefer-offline 

RUN npm run build

FROM node:16.15.0-alpine3.15@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb as run

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/build .

EXPOSE 3000
CMD ["node", "index.js"]
