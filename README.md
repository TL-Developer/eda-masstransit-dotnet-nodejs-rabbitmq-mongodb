# Package versions
- Dotnet - 6.0
- NodeJS - 18.14
- NestJS - 10.3.2
- Rabbit - 3.13
- Mongo - 7.0.0
- Mongo - Express 1.0.2-20-alpine3.19
- Prometheus - v2.45.6
- Grafana - 9.5.20

# Create a new project orchestrator masstransit saga
```dotnet new create webapi --output orchestrator```

# Install template Masstransit
```dotnet new install MassTransit.Templates```

# Change In Memory to RabbitMQ

### Configure Masstransit
```dotnet add package MassTransit```

### Configure RabbitMQ
```dotnet add package MassTransit.RabbitMQ```

### Configure MongoDB.Driver
```dotnet add package MongoDB.Driver```

# prometheus
add prometheus.yml

# grafana dashboard
login admin > admin

add data source > prometheus > http://prometheus:9090

add dashboard > https://grafana.com/grafana/dashboards/ > 10991 > prometheus

# Install NodeJS
npm init -y

npm i --save-dev typescript ts-node @types/express @types/amqplib ts-node-dev
npm i express amqplib dotenv

npx tsc --init

npm i mongoose --save

npm install winston for log