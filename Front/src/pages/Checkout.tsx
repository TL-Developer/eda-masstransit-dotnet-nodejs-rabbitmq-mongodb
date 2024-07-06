import { useState } from "react";
import Card from "../components/Card";
import { NavLink, Outlet } from "react-router-dom";
import Timeline from "../components/Timeline";
import { Order, TCardapio } from "../types";
import axios from "axios";

export const CUSTOMER_NAME = 'Tiago Lima';

const CheckoutPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1>Olá, <span className="font-bold">{CUSTOMER_NAME}</span></h1>
      </header>
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);

  const cardapio: TCardapio[] = [
    {
      customerName: 'Tiago Lima',
      productName: 'Nerd Burger',
      description: 'Hamburger simples',
      quantity: 1,
      tags: ['#Burguer'],
    },
    {
      customerName: 'Tiago Lima',
      productName: 'Nerd Salada',
      description: 'Hamburger simples com salada',
      quantity: 1,
      tags: ['#Salada'],
    },
    {
      customerName: 'Tiago Lima',
      productName: 'Nerd Dog',
      description: 'O doguinho preferido',
      quantity: 1,
      tags: ['#Dog'],
    },
    {
      customerName: 'Tiago Lima',
      productName: 'Nerdão',
      description: 'O hamburguer completão',
      quantity: 1,
      tags: ['#Tudo'],
    },
  ];
  const handleClick = async (order: Order) => {
    setLoading(true);

    try {
      await axios.post('http://localhost:5103/api/v1/orders', order);

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

CheckoutPage.MeusPedidos = () => (
  <div className="flex flex-col gap-5">
    <section>
      <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        Atualizar
      </button>
    </section>
    
    <section>
      <Card
        title="Nerd Burger"
        description="Hamburger simples"
        tags={['#Burger']}
      >
        <Timeline />
      </Card>
    </section>
  </div>
);

export default CheckoutPage;