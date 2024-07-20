import { useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import { httpClient } from "../utils/httpClient";
import { Order, OrderStatusEnum } from "../types";
import Divider from "../components/Divider";

const KitchenPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersCooking, setOrdersCooking] = useState<Order[]>([]);

  const fetchOrders = useCallback(async (status: OrderStatusEnum, set: React.Dispatch<React.SetStateAction<Order[]>>) => {
    try {
      const ordersResult: Order[] = await httpClient.get(`/orders?status=${status}`);

      set(ordersResult);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllOrders = useCallback(() => {
    fetchOrders(OrderStatusEnum.Created, setOrders);
    fetchOrders(OrderStatusEnum.Cooking, setOrdersCooking);
  }, [fetchOrders]);

  const handleSendToCooking = async (order: Order) => {
    try {
      await httpClient.post(`/kitchen/orders/${order.correlationId}`);

      alert('Pedido enviado para cozinha');
      fetchAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToDelivery = async (order: Order) => {
    try {
      await httpClient.post(`/delivery/orders/${order.correlationId}`);

      alert('Pedido enviado para cozinha');
      fetchAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="text-7xl">COZINHA 🫕🥣</h1>
      </section>
      <Divider />
      <section className="border p-5">
        <div className="p-5 font-bold font-underline">
          FILA DE PEDIDOS PARA PREPARAR
        </div>
        
        {orders && orders?.length > 0 && orders.map(({ correlationId, customerName, productName }) => (
          <Card
            key={correlationId}
            title={productName}
            btn="Enviar para preparação"
            customerName={customerName}
            handleClick={(order) => handleSendToCooking({
              ...order,
              correlationId,
            })}
          />
        ))}
      </section>
      
      <section className="border p-5">
        <div className="p-5 font-bold font-underline">
          PEDIDOS PRONTA PARA ENTREGA!!!
        </div>

        {ordersCooking?.length > 0 && ordersCooking.map(({ correlationId, customerName, productName }) => (
          <Card
            key={correlationId}
            title={productName}
            btn="Enviar para entrega"
            customerName={customerName}
            handleClick={(order) => handleSendToDelivery({
              ...order,
              correlationId,
            })}
          />
        ))}
      </section>
    </div>
  );
}

export default KitchenPage;