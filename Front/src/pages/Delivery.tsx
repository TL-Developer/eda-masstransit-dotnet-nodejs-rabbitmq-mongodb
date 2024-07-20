import { useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import { Order, OrderStatusEnum } from "../types";
import { httpClient } from "../utils/httpClient";
import Divider from "../components/Divider";

const DeliverPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    try {
      const ordersResult: Order[] = await httpClient.get(`/orders?status=${OrderStatusEnum.Delivered}`);

      setOrders(ordersResult);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleFinish = async (order: Order) => {
    try {
      await httpClient.post(`/orders/${order.correlationId}/finish`);

      alert('Pedido enviado para cozinha');
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="text-7xl">ENTREGA 🛵🏍️</h1>
      </section>
      <Divider />
      <section className="border p-5">
        <div className="p-5 font-bold font-underline">
          FILA DE PEDIDOS PARA ENTREGA
        </div>
        {orders && orders?.length > 0 && orders.map(({ correlationId, customerName, productName }) => (
          <Card
            key={correlationId}
            title={productName}
            btn="Finalizar pedido"
            customerName={customerName}
            handleClick={(order) => handleFinish({
              ...order,
              correlationId,
            })}
          />
        ))}
      </section>
    </div>
  );
}

export default DeliverPage;