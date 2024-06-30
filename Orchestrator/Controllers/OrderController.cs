using MassTransit;
using Microsoft.AspNetCore.Mvc;
using orchestrator.Repository;
using Orchestrator.Entities;

namespace Orchestrator.Controllers;

[ApiController]
[Route("orders")]
public class OrderController(IBus bus, ILogger<OrderController> logger, IOrderRepository orderRepository) : ControllerBase
{
    private readonly ILogger<OrderController> _logger = logger;
    private readonly IBus _bus = bus;
    private readonly IOrderRepository _orderRespository = orderRepository;

    private const string ORDERS_CREATED = "queue:orders_created";

    [HttpPost("")]
    public async Task<ActionResult<Order>> Post(Order order)
    { 
      var result = await _orderRespository.CreateAsync(order);

      order.Status = OrderStatusEnum.Created;

      var endpoint = await _bus.GetSendEndpoint(new Uri(ORDERS_CREATED));

      await endpoint.Send(new Order{
        ProductName = result.ProductName,
        Quantity = result.Quantity,
        CorrelationId = new Guid()
      }); 

      _logger.LogInformation("Send order: {order.Name}", order.ProductName);

      return Ok(result);
    }

    // [HttpPost("")]
    // public async Task<ActionResult<Order>> Post(Order order)
    // { 
      
    // }
}