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
        public required Guid CorrelationId { get; set; }
        [BsonElement("correlationId")]
        public required string ProductName { get; set; }
        [BsonElement("quantity")]
        public required string Quantity { get; set; }
        [BsonElement("status")]
        public OrderStatusEnum Status { get; set; }
        [BsonElement("orderCreatedAt")]
        public DateTime OrderCreatedAt { get; set; } = DateTime.Now;
        [BsonElement("orderCookingAt")]
        public DateTime OrderCookingAt { get; set; }
        [BsonElement("orderDeliveredAt")]
        public DateTime OrderDeliveredAt { get; set; }
    }

    public enum OrderStatusEnum
    {
        Created,
        Cooking,
        Delivered,
        Finish
    }
}