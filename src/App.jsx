import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import DetailsProducts from "./components/DetailsProducts/DetailsProducts.jsx";
import { CartProvider } from "./components/CartContext/CartContext.jsx";
import Cart from "./components/Cart/Cart.jsx";


function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<DetailsProducts />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
