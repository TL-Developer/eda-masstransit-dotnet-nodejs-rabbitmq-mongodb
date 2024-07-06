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

    [HttpGet("")]
    public async Task<ActionResult<Order>> GetAllOrders(Order order)
    { 
      List<Order> orders = await _orderRespository.GetAllAsync();

      _logger.LogInformation("Send order: {order}", order);

      return Ok(orders);
    }

    [HttpPost("")]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    { 
      order.Status = OrderStatusEnum.Created;
      var result = await _orderRespository.CreateAsync(order);

      _logger.LogInformation("Send order: {order}", order);

      return Ok(result);
    }

    [HttpPost("{correlationId}/finish")]
    public async Task<ActionResult<Order>> UpdateOrderFinish(string correlationId)
    { 
      Order order = await _orderRespository.GetByCorrelationId(correlationId);

      order.Status = OrderStatusEnum.Finish;
      order.OrderFinishAt = DateTime.Now;

      _ = _orderRespository.UpdateOrderAsync(correlationId, order);

      _logger.LogInformation("Send kitchen order: {correlationId}", correlationId);

      return Ok(order);
    }
}