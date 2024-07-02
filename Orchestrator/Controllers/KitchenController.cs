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

    private const string ORDERS_COOKING = "queue:orders_created";

    [HttpPost("orders/{correlationId}")]
    public async Task<ActionResult<Order>> UpdateOrderAsync(string correlationId)
    {
        _ = _orderRespository.UpdateOrderAsync(correlationId, OrderStatusEnum.Cooking);

      var orderFound = await _orderRespository.GetByCorrelationId(correlationId);

      var endpoint = await _bus.GetSendEndpoint(new Uri(ORDERS_COOKING));

      await endpoint.Send(orderFound); 

      // _logger.LogInformation("Send order: {order.Name}", order.ProductName);

      return Ok(orderFound);
    }
}