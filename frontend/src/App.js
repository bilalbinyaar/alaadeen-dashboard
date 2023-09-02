import React, { useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Categories from './screens/Categories';
import AllProducts from './screens/AllProducts';
import Tools from './screens/Tools';
import Parts from './screens/Parts';
import Hardware from './screens/Hardware';
import WebComponents from './screens/WebComponents';
import Contacts from './screens/Contact';
import UpdateProduct from './screens/products/UpdateProduct';
import UpdateTools from './screens/products/UpdateTools';
import UpdateParts from './screens/products/UpdateParts';
import UpdateHardware from './screens/products/UpdateHardware';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'boomplus' && password === 'boomplus') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Please enter a valid username and password.');
    }
  };

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="login">
      <h1>Admin Panel</h1>
      <p>Enter login credentials</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/:slug" element={<UpdateProduct />} />
      <Route path="/tools/:slug" element={<UpdateTools />} />
      <Route path="/parts/:slug" element={<UpdateParts />} />
      <Route path="/hardware/:slug" element={<UpdateHardware />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/parts" element={<Parts />} />
      <Route path="/hardware" element={<Hardware />} />
      <Route path="/components" element={<WebComponents />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default App;
