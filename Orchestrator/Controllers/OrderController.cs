using MassTransit;
using Microsoft.AspNetCore.Mvc;
using orchestrator.Repository;
using Orchestrator.Entities;

namespace Orchestrator.Controllers;

[ApiController]
[Route("api/v1/orders")]
public class OrderController(IBus bus, ILogger<OrderController> logger, IOrderRepository orderRepository) : ControllerBase
{
    private readonly ILogger<OrderController> _logger = logger;
    private readonly IBus _bus = bus;
    private readonly IOrderRepository _orderRespository = orderRepository;

    [HttpPost("")]
    public async Task<ActionResult<Order>> Post(Order order)
    { 
      order.Status = OrderStatusEnum.Created;
      var result = await _orderRespository.CreateAsync(order);

      _logger.LogInformation("Send order: {order}", order);

      return Ok(result);
    }
}