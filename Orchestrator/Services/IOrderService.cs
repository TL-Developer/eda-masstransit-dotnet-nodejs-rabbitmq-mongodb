using Orchestrator.Entities;

namespace Orchestrator.Services
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllAsync();
        Task<Order> CreateAsync(Order order);
    }
}