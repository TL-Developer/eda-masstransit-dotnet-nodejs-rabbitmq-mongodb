using Orchestrator.Entities;

namespace orchestrator.Repository
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllAsync();
        Task<Order> CreateAsync(Order order);
    }
}