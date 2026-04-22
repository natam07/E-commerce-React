import "/src/components/Cart/Cart.css";
import { useCart } from "../CartContext/CartContext.jsx";

const Cart = () => {
    const { carrito, actualizarCantidad, eliminarProducto } = useCart();

    const costoDeEnvio = 10;
    const subtotal = carrito.reduce((acc, product) => 
        acc + product.precio * product.cantidad, 0);
    const total = subtotal + costoDeEnvio;

    const handleAumentarCantidad = (productId) => {
        actualizarCantidad(productId, 1);
    };
    const handleDisminuirCantidad = (productId) => {
        const product = carrito.find((item) => item.id === productId);
        if (product.cantidad > 1) {
            actualizarCantidad(productId, -1);
        }
    }
    return (
        <div className="cart-container">
            <h2>TU <span>CARRITO</span></h2>
            {
                carrito.length === 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    <>
                    <div className="cart-header">
                        <p>Producto</p>
                        <p>Precio</p>
                        <p>Cantidad</p>
                        <p>Total</p>
                        <p>Accion</p>
                    </div>
                    <ul className="cart-items">
                        {
                            carrito.map((product) => {
                                const totalPrecio = product.precio * product.cantidad;
                                return (
                                    <li className="cart-item" key={product.id}>
                                        <div className="product-info">
                                            <img src={product.imagen || "https://via.placeholder.com/150"} alt="" 
                                            className="product-images"
                                            />
                                            <span>{product.nombre}</span>
                                        </div>
                                        <p>${product.precio.toFixed(2)}</p>

                                        <div className="quantity-controls">
                                            <button className="quantity-btn"
                                            onClick={() => handleDisminuirCantidad(product.id)}>
                                                -
                                            </button>
                                            <input type="number" 
                                            className="quantity-input"
                                            readOnly
                                            value={product.cantidad}/>
                                            <button className="quantity-btn" 
                                            onClick={() => handleAumentarCantidad(product.id)}>
                                                +
                                            </button>
                                        </div>

                                        <p>${totalPrecio.toFixed(2)}</p>
                                        <button className="delete-btn" 
                                        onClick={() => eliminarProducto(product.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </>
                )
            }

            <div className="cart-summary">
                <h2>TU <span>CARRITO</span></h2>
                <p>Total parcial: <span>${subtotal.toFixed(2)}</span></p>
                <p>Tarifa de envío: <span>${costoDeEnvio.toFixed(2)}</span></p>
                <p className="total">Total: <span>${total.toFixed(2)}</span></p>
                <button className="checkout-btn">Proceder al pago</button>
            </div>
        </div>
    )
}

export default Cart;