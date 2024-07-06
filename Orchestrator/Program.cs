using MassTransit;
using orchestrator.Data;
using orchestrator.Repository;
using Orchestrator.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

builder.Services.AddMassTransit(bus =>
{
    bus.UsingRabbitMq((context, config) =>
    {
        config.Host("localhost", "/", h => {
            h.Username("guest");
            h.Password("guest");
        });

        config.ConfigureEndpoints(context);
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();