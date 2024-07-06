import Card from "../components/Card";

const DeliverPage = () => {
  return (
    <div className="flex gap-5">
      <Card
        title="Nerd Burger"
        btn="Pedido entregue"
        description="Hamburger simples"
        tags={['#Burger']}
        handleClick={() => {}}
      />
      <Card
        title="Nerd Salada"
        btn="Pedido entregue"
        description="Hamburger simples com salada"
        tags={['#Salada']}
        handleClick={() => {}}
      />
      <Card
        title="Nerd Dog"
        btn="Pedido entregue"
        description="O doguinho preferido"
        tags={['#Dog']}
        handleClick={() => {}}
      />
      <Card
        title="Nerdão"
        btn="Pedido entregue"
        description="O hamburguer completão"
        tags={['#Tudo']}
        handleClick={() => {}}
      />
    </div>
  );
}

export default DeliverPage;