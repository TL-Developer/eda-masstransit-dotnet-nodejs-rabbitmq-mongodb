using MassTransit;
using Microsoft.AspNetCore.Mvc;
using orchestrator.Repository;
using Orchestrator.Entities;
using System.ComponentModel.DataAnnotations;

namespace Orchestrator.Controllers;

[ApiController]
[Route("api/v1/orders")]
public class OrderController(IBus bus, ILogger<OrderController> logger, IOrderRepository orderRepository) : ControllerBase
{
    private readonly ILogger<OrderController> _logger = logger;
    private readonly IBus _bus = bus;
    private readonly IOrderRepository _orderRespository = orderRepository;

    [HttpGet("")]
    public async Task<ActionResult<Order>> GetAllOrdersByStatus([FromQuery(Name = "status")] OrderStatusEnum status)
    { 
      List<Order> orders = await _orderRespository.GetAllByStatusAsync(status);

      _logger.LogInformation("GetAllOrdersByStatus: {orders}", status);

      return Ok(orders);
    }

    [HttpGet("customerName")]
    public async Task<ActionResult<Order>> GetAllOrdersByCustomerName([FromQuery(Name = "customerName")] string customerName)
    {
        List<Order> orders = await _orderRespository.GetAllByCustomerNameAsync(customerName);

        _logger.LogInformation("GetAllOrdersByCustomerName: {customerName}", customerName);

        return Ok(orders);
    }

    [HttpPost("")]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    { 
      order.Status = OrderStatusEnum.Created;
      var result = await _orderRespository.CreateAsync(order);

      _logger.LogInformation("PostOrder: {order}", order);

      return Ok(result);
    }

    [HttpPost("{correlationId}/finish")]
    public ActionResult<Order> UpdateOrderFinish(string correlationId)
    {
        Order order = _orderRespository.GetByCorrelationId(correlationId);

        order.Status = OrderStatusEnum.Finish;
        order.OrderFinishAt = DateTime.Now;

        _orderRespository.UpdateOrder(correlationId, order);

        _logger.LogInformation("UpdateOrderFinish: {correlationId}", correlationId);

        return Ok(order);
    }
}