FROM node:19.9-alpine
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install --force
EXPOSE 5000
CMD ["npm", "start"]
