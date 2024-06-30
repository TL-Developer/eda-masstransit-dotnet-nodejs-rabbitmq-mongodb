using MongoDB.Driver;
using orchestrator.Data;
using Orchestrator.Entities;

namespace orchestrator.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderRepository(MongoDbService mongoDbService)
        {
            _orders = mongoDbService.Database.GetCollection<Order>("orders");
        }

        public async Task<Order> CreateAsync(Order order)
        {
            await _orders.InsertOneAsync(order);
            return order;
        }

        public async Task<List<Order>> GetAllAsync()
        {
            return await _orders.Find(FilterDefinition<Order>.Empty).ToListAsync();
        }
    }
}