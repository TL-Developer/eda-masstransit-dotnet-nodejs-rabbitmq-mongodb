using Orchestrator.Entities;

namespace orchestrator.Repository
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllAsync();
        Task<Order> CreateAsync(Order order);
        Task<Order> GetByCorrelationId(string correlationId);
        Task UpdateOrderAsync(string correlationId, Order order);
    }
}