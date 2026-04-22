import { useCart } from "../CartContext/CartContext";
import "/src/components/Navbar/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { carrito } = useCart();

    const totalProductos = carrito.reduce((acc, product) => 
        acc + product.cantidad, 0);

    return (
        <section className="header">
            <h1 className="logo">TR <span>ENDY</span></h1>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
            <div className="icons">
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>

                <Link to="/carrito" className="icon-button">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="counter">{totalProductos}</span>
                </Link>
            </div>
        </section>
    )
}

export default Navbar