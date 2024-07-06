using MongoDB.Bson;
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

        public async Task<Order> GetByCorrelationId(string correlationId)
        {
            var filter = Builders<Order>.Filter.Eq(order => order.CorrelationId, correlationId);

            return _orders.Find(filter).FirstOrDefault();
        }

        public async Task UpdateOrderAsync(string correlationId, Order order)
        {
           var filter = Builders<Order>.Filter.Eq(or => or.CorrelationId, correlationId);
           
            _orders.ReplaceOne(filter, order);
        }
    }
}