import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import CheckoutPage from './pages/Checkout';
import KitchenPage from './pages/Kitchen';
import DeliverPage from './pages/Delivery';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <section className="bg-red-600 p-5 mb-16">
      <h1 className="text-7xl text-white">Nerdburguer Inc.</h1>
    </section>
    <div className="p-5 flex flex-col gap-5">
      <HashRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/checkout/cardapio" />} />
          <Route path="/checkout" element={<CheckoutPage />}>
            <Route path="cardapio" element={<CheckoutPage.Cardapio />} />
            <Route path="meus-pedidos" element={<CheckoutPage.MeusPedidos />} />
          </Route>
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/delivery" element={<DeliverPage />} />
        </Routes>
      </HashRouter>
    </div>
  </React.StrictMode>
);