import React, { createContext, useContext } from 'react';
import { useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const AgregarAlCarrito = (product) => {
        setCarrito((carritoAnterior) => {
            const yaExisteElProducto = carritoAnterior.findIndex(
                (articulo) => articulo.id === product.id
            );
            if (yaExisteElProducto >= 0) {
                const carritoActualizado = [...carritoAnterior];
                carritoActualizado[yaExisteElProducto].cantidad += 1;
                return carritoActualizado;
            } else {
                return [...carritoAnterior, { ...product, cantidad: 1 }];
            }
        });
    }

    const actualizarCantidad = (productId, cantidad) => {
        setCarrito((carritoAnterior) =>
            carritoAnterior.map((product) =>
                product.id === productId ?
                    { ...product, cantidad: product.cantidad + cantidad } :
                    product
            )
        )
    }

    const eliminarProducto = (productId) => {
        setCarrito((carritoAnterior) =>
            carritoAnterior.filter((product) =>
                product.id !== productId)
        );
    }

    return (
        <CartContext.Provider value={{ carrito, AgregarAlCarrito, actualizarCantidad, eliminarProducto }}>
            {children}
        </CartContext.Provider>
    )
}



export const useCart = () => useContext(CartContext);