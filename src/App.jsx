import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/components/Home/Home.jsx";
import Navbar from "/src/components/Navbar/navbar.jsx";
import DetailsProducts from "/src/components/DetailsProducts/DetailsProducts.jsx";
import { CartProvider } from "/src/components/CartContext/CartContext.jsx";
import Cart from "/src/components/Cart/Cart.jsx";


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
