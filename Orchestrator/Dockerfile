#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5103
EXPOSE 8080

ENV RabbitMQ:Host=localhost
ENV RabbitMQ:User=guest
ENV RabbitMQ:Pass=guest
ENV ConnectionStrings:Mongodb=mongodb://root:root@localhost:27017/nerdburguer-orchestrator?authSource=admin

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Orchestrator.csproj", "."]
RUN dotnet restore "./Orchestrator.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./Orchestrator.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Orchestrator.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Orchestrator.dll"]
