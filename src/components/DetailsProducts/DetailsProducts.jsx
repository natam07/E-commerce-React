import { useParams } from "react-router-dom";
import "./DetailsProducts.css";
import { useState, useEffect } from "react";
import { useCart } from "../CartContext/CartContext.jsx";

const DetailsProducts = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    const {AgregarAlCarrito} = useCart();
    const handleAgregarAlCarrito = () => {
        if(product){
            AgregarAlCarrito(
                {
                    id: product.id,
                    imagen: product.image,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: 1
                }
            );
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://api-ten-jet.vercel.app/products/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener el producto");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProduct();
    }, [id])

    if (error) {    
        return <h2 className="error-message">{error}</h2>
    }

    return (
        <div className="product-details">
            {
                product ? (
                    <>
                        <img src={product.image} alt={product.name} className="image-small"/>
                        <img src={product.image} alt={product.name}/>
                        <div className="product-infos">
                            <h1>{product.nombre}</h1>
                            <p className="price">${product.precio}</p>
                            <p className="description">{product.descripcion}</p>
                            <div className="size-options">
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                            </div>
                            <button className="add-to-cart" onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
                        </div>
                        <p className="note">
                            Producto 100% original. El pago se realiza al momento de la entrega. Para más información, contáctanos a través de nuestras redes sociales o nuestro correo electrónico.
                        </p>
                    </>
                ) : (
                    <p>Cargando...</p>
                )
            }
        </div>
    )
}

export default DetailsProducts;