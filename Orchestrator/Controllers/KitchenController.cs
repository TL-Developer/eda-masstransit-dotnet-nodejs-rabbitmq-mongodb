using MassTransit;
using Microsoft.AspNetCore.Mvc;
using orchestrator.Repository;
using Orchestrator.Entities;

namespace Orchestrator.Controllers;

[ApiController]
[Route("api/v1/kitchen")]
public class KitchenController(IBus bus, ILogger<KitchenController> logger, IOrderRepository orderRepository) : ControllerBase
{
    private readonly ILogger<KitchenController> _logger = logger;
    private readonly IBus _bus = bus;
    private readonly IOrderRepository _orderRespository = orderRepository;

    private const string ORDERS_COOKING = "queue:orders_cooking";

    [HttpPost("orders/{correlationId}")]
    public async Task<ActionResult<Order>> UpdateOrderAsync(string correlationId)
    {
      Order order = _orderRespository.GetByCorrelationId(correlationId);

      order.Status = OrderStatusEnum.Cooking;
      order.OrderCookingAt = DateTime.Now;

      _orderRespository.UpdateOrder(correlationId, order);

      ISendEndpoint endpoint = await _bus.GetSendEndpoint(new Uri(ORDERS_COOKING));

      await endpoint.Send(order); 

      _logger.LogInformation("UpdateOrderAsync: {correlationId}", correlationId);

      return Ok(order);
    }
}