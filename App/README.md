# SIMPLE APPS RESTFUL API

Folder ini berisi source code RESTful API untuk menjawab soal nomor 1 pada test case DevOps Engineer SLTR.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Docker
- Docker Compose

## Tested on

- NodeJS Version: v19.8.1

- NMP Version: 9.5.1

- Docker Version: 24.0.6, build ed223bc

- OS: MacOS Sonoma 14.0

- Device: MacBook Air M2

## How to run

1. Clone this repository

   ```bash
   git clone https://github.com/nvlannasik/devops-sltr-test-case.git
   ```

2. Go to the project directory

   ```bash
   cd App/
   ```

3. ADD .env file

   ```bash
   touch .env
   echo "PORT=5000" >> .env
   echo "NODE_ENV=test" >> .env
   ```

4. Install dependencies

   ```bash
   npm install
   ```

5. Start the server

   ```bash
   npm start
   ```

6. Test the server

   ```bash
   curl -X GET http://localhost:5000/welcome/John
   ```

## How to run with Docker Compose

1. Clone this repository

   ```bash
   git clone https://github.com/nvlannasik/devops-sltr-test-case.git
   ```

2. Go to the project directory

   ```bash
   cd App/
   ```

3. Run the image

   ```bash
    docker-compose up -d
   ```

4. Test the server

   ```bash
   curl -X GET http://localhost:8000/welcome/John
   ```

## Author

- [Ahmad Naoval Annasik](https://github.com/nvlannasik)
