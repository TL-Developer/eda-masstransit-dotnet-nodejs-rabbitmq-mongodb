using orchestrator.Repository;
using Orchestrator.Entities;

namespace Orchestrator.Services
{
    public class OrderService(IOrderRepository orderRepository) : IOrderService
    {
        private readonly IOrderRepository _orderRepository = orderRepository;

        public Task<Order> CreateAsync(Order order)
        {
            return _orderRepository.CreateAsync(order);
        }

        public Task<List<Order>> GetAllAsync()
        {
            return _orderRepository.GetAllAsync();
        }
    }
}