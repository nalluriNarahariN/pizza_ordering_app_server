FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PORT 3030
ENV DB_CONNECTION_STRING mongodb+srv://wisflux:wisflux@wisflux.ndhmv.mongodb.net/?retryWrites=true&w=majority
EXPOSE $PORT
CMD ["npm","start"]