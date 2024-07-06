import Card from "../components/Card";
import { NavLink, Outlet } from "react-router-dom";
import Timeline from "../components/Timeline";
import { useState } from "react";

const CheckoutPage = () => {
  const [name] = useState('Tiago Lima');

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1>Olá, <span className="font-bold">{name}</span></h1>
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

CheckoutPage.Cardapio = () => (
  <div className="flex gap-5">
    <Card
      title="Nerd Burger"
      description="Hamburger simples"
      tags={['#Burger']}
      handleClick={() => {}}
    />
    <Card
      title="Nerd Salada"
      description="Hamburger simples com salada"
      tags={['#Salada']}
      handleClick={() => {}}
    />
    <Card
      title="Nerd Dog"
      description="O doguinho preferido"
      tags={['#Dog']}
      handleClick={() => {}}
    />
    <Card
      title="Nerdão"
      description="O hamburguer completão"
      tags={['#Tudo']}
      handleClick={() => {}}
    />
  </div>
);

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