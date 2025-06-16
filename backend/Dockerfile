FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

# Build the TypeScript files into /dist
RUN npm run build

EXPOSE 3000

# Run the compiled JavaScript entrypoint
CMD ["node", "dist/src/index.js"]
