using Orchestrator.Entities;

namespace orchestrator.Repository
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllByStatusAsync(OrderStatusEnum orderStatusEnum);
        Task<List<Order>> GetAllByCustomerNameAsync(string customerName);
        Task<Order> CreateAsync(Order order);
        Order GetByCorrelationId(string correlationId);
        void UpdateOrder(string correlationId, Order order);
    }
}