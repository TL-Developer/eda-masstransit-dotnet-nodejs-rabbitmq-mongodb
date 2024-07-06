using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Orchestrator.Entities
{
    public class Order
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("productName")]
        public required string ProductName { get; set; }
        [BsonElement("customerName")]
        public required string CustomerName { get; set; }
        [BsonElement("correlationId")]
        public string CorrelationId { get; set; } = Guid.NewGuid().ToString();        
        [BsonElement("quantity")]
        public required string Quantity { get; set; }
        [BsonElement("status")]
        public OrderStatusEnum Status { get; set; }
        [BsonElement("orderCreatedAt")]
        public DateTime OrderCreatedAt { get; set; } = DateTime.Now;
        [BsonElement("orderCookingAt")]
        public DateTime? OrderCookingAt { get; set; } = null;
        [BsonElement("orderDeliveredAt")]
        public DateTime? OrderDeliveredAt { get; set; } = null;
        [BsonElement("orderFinishAt")]
        public DateTime? OrderFinishAt { get; set; } = null;
    }

    public enum OrderStatusEnum
    {
        Created,
        Cooking,
        Delivered,
        Finish
    }
}