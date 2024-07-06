import { Order } from "../../types";
import { CUSTOMER_NAME } from "../../pages/Checkout";
import Loading from "../Loading";

interface ICardProps {
  title: string;
  description: string;
  tags?: string[],
  quantity?: number,
  loading?: boolean,
  handleClick?(order: Order): void;
  btn?: string;
  children?: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({
  title,
  description,
  tags,
  handleClick,
  children,
  btn = 'Comprar 🛍️',
  quantity = 1,
  loading = false,
}) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    {loading && <Loading />}
    <img className="w-full" src="http://lorempixel.com.br/500/500" alt="Sunset in the mountains" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    {children && (
      <div className="px-6 pt-4 pb-2">
        {children}
      </div>
    )}
    <div className="px-6 pt-4 pb-2">
      {(tags && tags.length > 0) && tags.map((tag) => (
        <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
      ))}
    </div>
    {handleClick && (
      <div className="p-5">
        <button className="w-full" type="button" onClick={() => handleClick({
          customerName: CUSTOMER_NAME,
          productName: title,
          quantity,
        })}>{btn}</button>
      </div>
    )}
  </div>
);

export default Card;