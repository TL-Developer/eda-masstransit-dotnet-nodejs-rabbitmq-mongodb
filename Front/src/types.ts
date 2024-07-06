export type Order = {
  customerName: string;
  productName: string;
  quantity: number;
}

export type TCardapio = Order & {
  description: string;
  tags: string[];
};