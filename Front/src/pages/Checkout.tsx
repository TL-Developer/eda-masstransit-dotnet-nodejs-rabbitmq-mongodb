/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { NavLink, Outlet } from "react-router-dom";
import Timeline from "../components/Timeline";
import { Order, TCardapio } from "../types";
import { httpClient } from "../utils/httpClient";
import Divider from "../components/Divider";

export const CUSTOMER_NAME = 'Tiago Lima';

const CheckoutPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1>Olá, <span className="font-bold">{CUSTOMER_NAME}</span></h1>
      </header>
      <Divider />
      <section className="flex gap-5">
        <ul className="flex">
          <li className="mr-6 bg-red-400 p-5">
            <NavLink to="/checkout/cardapio">
              <span className="text-white hover:text-blue-800">FAZER O PEDIDO</span>
            </NavLink>
          </li>
          <li className="mr-6 bg-red-400 p-5">
            <NavLink to="/checkout/meus-pedidos">
              <span className="text-white hover:text-blue-800">MEUS PEDIDOS</span>
            </NavLink>
          </li>
        </ul>
      </section>

      <Outlet />
    </div>
  );
}

CheckoutPage.Cardapio = () => {
  const [loading, setLoading] = useState(false);

  const cardapio: TCardapio[] = [
    {
      customerName: 'Tiago Lima',
      productName: 'Nerd Burger',
      description: 'Hamburger simples',
      quantity: "1",
      tags: ['#Burguer'],
    },
    {
      customerName: 'Tiago Lima',
      productName: 'Nerd Salada',
      description: 'Hamburger simples com salada',
      quantity: "1",
      tags: ['#Salada'],
    },
    {
      customerName: 'Tiago Lima',
      productName: 'Nerd Dog',
      description: 'O doguinho preferido',
      quantity: "1",
      tags: ['#Dog'],
    },
    {
      customerName: 'Tiago Lima',
      productName: 'Nerdão',
      description: 'O hamburguer completão',
      quantity: "1",
      tags: ['#Tudo'],
    },
  ];

  const handleClick = async (order: Order) => {
    setLoading(true);

    try {
      await httpClient.post('/orders', order);

      alert('Pedido cadastradado com sucesso');
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex gap-5">
      {cardapio.map(({
        productName, description, tags
      }) => (
        <div className="relative">
          <Card
            key={productName}
            title={productName}
            description={description}
            tags={tags}
            loading={loading}
            handleClick={handleClick}
          />
        </div>
      ))}
    </div>
  );
}

CheckoutPage.MeusPedidos = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const ordersResult: Order[] = await httpClient.get(`/orders/customerName?customerName=${CUSTOMER_NAME}`);

      setOrders(ordersResult);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []); 
  
  return (
    <div className="flex flex-col gap-5">    
      <section className="flex gap-5">
        {orders && orders.map(({
          correlationId,
          productName,
          orderCreatedAt,
          orderCookingAt,
          orderDeliveredAt,
          orderFinishAt,
        }) => (
          <Card
            key={correlationId}
            title={productName}
          >
            <Timeline>
              <Timeline.Item
                title="PEDIDO ENVIADO"
                date={orderCreatedAt}
                description="Seu pedido foi recebido com sucesso, em breve iremos preparar"
                ok={orderCreatedAt !== null}
              />
              <Timeline.Item
                title="PEDIDO EM PREPARAÇÃO"
                date={orderCookingAt}
                description="Obaa!! Estamos preparando seu pedido"
                ok={orderCookingAt !== null}
              />
              <Timeline.Item
                title="PEDIDO A CAMINHO"
                date={orderDeliveredAt}
                description="Nosso motoca está com seu pedido a caminho"
                ok={orderDeliveredAt !== null}
              />
              <Timeline.Item
                title="PEDIDO FINALIZADO"
                date={orderFinishAt}
                description="Pedido finalizado com sucesso, volte sempre!!!"
                ok={orderFinishAt !== null}
              />
            </Timeline>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default CheckoutPage;