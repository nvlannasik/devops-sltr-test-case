require("dotenv").config();
const confidence = require("confidence");

const config = {
  $meta: "This file configures the application.",
  env: process.env.NODE_ENV || "dev",
  port: {
    $filter: "env",
    dev: 3000,
    test: process.env.PORT,
    prod: process.env.PORT,
  },
  db: {
    $filter: "env",
    dev: {
      mongo: {
        url: `mongodb://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}/?authMechanism=DEFAULT&directConnection=true`,
      },
    },
    test: {
      mongo: {
        url: `mongodb://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}`,
      },
    },
    prod: {
      mongo: {
        url: `mongodb://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}`,
      },
    },
  },
  postgresDemoData: {
    $filter: "env",
    dev: {
      host: process.env.POSTGRES_HOST_DEMO_DATA,
      port: process.env.POSTGRES_PORT_DEMO_DATA,
      user: process.env.POSTGRES_USER_DEMO_DATA,
      password: process.env.POSTGRES_PASSWORD_DEMO_DATA,
    },
    test: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    prod: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  },
  elasticSearch: {
    $filter: "env",
    dev: {
      url: process.env.ELASTIC_SEARCH_URL,
      index: process.env.ELASTIC_SEARCH_INDEX,
      userName: process.env.ELASTIC_SEARCH_USERNAME,
      password: process.env.ELASTIC_SEARCH_PASSWORD,
    },
    test: {
      url: process.env.ELASTIC_SEARCH_URL,
      index: process.env.ELASTIC_SEARCH_INDEX,
      userName: process.env.ELASTIC_SEARCH_USERNAME,
      password: process.env.ELASTIC_SEARCH_PASSWORD,
    },
    prod: {
      url: process.env.ELASTIC_SEARCH_URL,
      index: process.env.ELASTIC_SEARCH_INDEX,
      userName: process.env.ELASTIC_SEARCH_USERNAME,
      password: process.env.ELASTIC_SEARCH_PASSWORD,
    },
  },
  rabbitMQ: {
    $filter: "env",
    dev: {
      url: process.env.RABBIT_MQ_URL,
      userName: process.env.RABBIT_MQ_USERNAME,
      password: process.env.RABBIT_MQ_PASSWORD,
      queue: process.env.RABBIT_MQ_QUEUE,
      exchange: process.env.RABBIT_MQ_EXCHANGE,
      port: process.env.RABBIT_MQ_PORT,
    },
    test: {
      url: process.env.RABBIT_MQ_URL,
      userName: process.env.RABBIT_MQ_USERNAME,
      password: process.env.RABBIT_MQ_PASSWORD,
      queue: process.env.RABBIT_MQ_QUEUE,
      exchange: process.env.RABBIT_MQ_EXCHANGE,
      port: process.env.RABBIT_MQ_PORT,
    },
    prod: {
      url: process.env.RABBIT_MQ_URL,
      userName: process.env.RABBIT_MQ_USERNAME,
      password: process.env.RABBIT_MQ_PASSWORD,
      queue: process.env.RABBIT_MQ_QUEUE,
      exchange: process.env.RABBIT_MQ_EXCHANGE,
      routingKey: process.env.RABBIT_MQ_ROUTING_KEY,
      port: process.env.RABBIT_MQ_PORT,
    },
  },
  redis: {
    $filter: "env",
    dev: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
    test: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
    prod: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
  },
  kafka: {
    $filter: "env",
    dev: {
      url: `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`,
      topic: process.env.KAFKA_TOPIC,
    },
    test: {
      url: `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`,
      topic: process.env.KAFKA_TOPIC,
    },
    prod: {
      url: `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`,
      topic: process.env.KAFKA_TOPIC,
    },
  },
};

const store = new confidence.Store(config);

exports.get = function (key) {
  return store.get(key, { env: process.env.NODE_ENV });
};
