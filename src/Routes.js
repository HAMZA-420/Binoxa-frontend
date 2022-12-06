import React from 'react';

import Auth from './views/auth/auth';
import Home from './views/Home/Home';
import Users from './views/users/users';
import TradesTable from './views/Trades/Trades';
import API_Mangement from './views/Api Management/Api-Mangement';
// import Currency from './views/Currencies/currency';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from './views/Currencies/Currency';
import Balance from './views/Balance/balance';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Users />} />
      <Route path="/trades" element={<TradesTable />} />
      <Route path="/api" element={<API_Mangement />} />
      <Route path="/currency" element={<Currency />} />
      <Route path="/balance" element={<Balance />} />



          {/* <Route path="/auth" element={<Auth />} /> */}
         

          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;


