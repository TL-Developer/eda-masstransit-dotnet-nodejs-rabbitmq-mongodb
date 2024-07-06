import Card from "../components/Card";

const KitchenPage = () => {
  return (
    <div className="flex gap-5">
      <Card
        title="Nerd Burger"
        btn="Enviar para entrega"
        description="Hamburger simples"
        tags={['#Burger']}
        handleClick={() => {}}
      />
      <Card
        title="Nerd Salada"
        btn="Enviar para entrega"
        description="Hamburger simples com salada"
        tags={['#Salada']}
        handleClick={() => {}}
      />
      <Card
        title="Nerd Dog"
        btn="Enviar para entrega"
        description="O doguinho preferido"
        tags={['#Dog']}
        handleClick={() => {}}
      />
      <Card
        title="Nerdão"
        btn="Enviar para entrega"
        description="O hamburguer completão"
        tags={['#Tudo']}
        handleClick={() => {}}
      />
    </div>
  );
}

export default KitchenPage;