using MassTransit;
using Microsoft.AspNetCore.Mvc;
using orchestrator.Repository;
using Orchestrator.Entities;

namespace Orchestrator.Controllers;

[ApiController]
[Route("api/v1/delivery")]
public class DeliveryController(IBus bus, ILogger<DeliveryController> logger, IOrderRepository orderRepository) : ControllerBase
{
    private readonly ILogger<DeliveryController> _logger = logger;
    private readonly IBus _bus = bus;
    private readonly IOrderRepository _orderRespository = orderRepository;

    private const string ORDERS_DELIVERED = "queue:orders_delivered";

    [HttpPost("orders/{correlationId}")]
    public async Task<ActionResult<Order>> UpdateOrderAsync(string correlationId)
    {
        _ = _orderRespository.UpdateOrderAsync(correlationId, OrderStatusEnum.Delivered);

      var orderFound = await _orderRespository.GetByCorrelationId(correlationId);

      var endpoint = await _bus.GetSendEndpoint(new Uri(ORDERS_DELIVERED));

      await endpoint.Send(orderFound); 

      _logger.LogInformation("Send kitchen order: {correlationId}", correlationId);

      return Ok(orderFound);
    }
}