FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# WORKDIR /app/client
RUN npm install 
#&& npm run build

COPY . .

EXPOSE 3000

#CMD ["npm", "run", "dev", "--prefix", "/app/client"]
CMD ["npm", "run", "dev"]
#CMD ["npm", "start"]