# RUN AND INSTALL PROJECT

```docker build -t liminha/dotnet-orchestrator .```

```docker run -p 5103:8080 liminha/dotnet-orchestrator```

# ENDPOINT

# ORDER by STATUS
GET http://localhost:5103/api/v1/orders?status=0
content-type: application/json

###

# ORDER by CUSTOMER NAME
GET http://localhost:5103/api/v1/orders/customerName?customerName=Tiago%20Lima
content-type: application/json

###

# ORDER - CREATED
POST http://localhost:5103/api/v1/orders
content-type: application/json

{
  "customerName": "Tiago lima",
  "productName": "X-Salada Duplo",
  "quantity": "1"
}

###

# ORDER to KITCHEN
POST http://localhost:5103/api/v1/kitchen/orders/b66c2a30-93e4-4aa5-80bb-4e2444f3bb81
content-type: application/json


###

# ORDER to DELIVERY
POST http://localhost:5103/api/v1/delivery/orders/b66c2a30-93e4-4aa5-80bb-4e2444f3bb81
content-type: application/json

###

# ORDER to FINISH
POST http://localhost:5103/api/v1/orders/b66c2a30-93e4-4aa5-80bb-4e2444f3bb81/finish
content-type: application/json
