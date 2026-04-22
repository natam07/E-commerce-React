import { useState, useEffect } from "react"
import "/src/components/Products/ProductList.css"
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProductos] = useState([])
    const [error, setError] = useState(null)
    const [order, setOrder] = useState("Relevante")
    const [filtros, setFiltros] = useState({
        categorias: [], tipos: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://api-ten-jet.vercel.app/products")
                if (!response.ok) {
                    throw new Error("Error al obtener los productos")
                }
                const data = await response.json()
                setProductos(data)

            } catch (err) {
                setError(err.message)
            }
        }
        fetchProducts();
    }, []);

    const toggleFiltros = (tipoFiltro, valor) => {
        setFiltros((prev) => ({
            ...prev,
            [tipoFiltro]: prev[tipoFiltro].includes(valor)
                ? prev[tipoFiltro].filter((item) => item !== valor)
                : [...prev[tipoFiltro], valor],
        }))
    };

    const productosFiltrados = products.filter((product) => {
        const matchCategoria =
            filtros.categorias.length === 0 || filtros.categorias.includes(product.categoria);
        const matchTipo =
            filtros.tipos.length === 0 || filtros.tipos.includes(product.tipo);
        return matchCategoria && matchTipo;
    });

    const handleOrdenChange = (e) => {
        setOrder(e.target.value)
    };

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (order === "Precio: Menor a mayor") {
            return a.precio - b.precio
        } if (order === "Precio: Mayor a menor") {
            return b.precio - a.precio
        }
        return 0
    });

    const handleImageClick = (id) => {
        navigate(`/product/${id}`);
    }

    return (
        <section className="main-content">
            <aside className="filters">
                <h2>Filtros</h2>
                <div className="filters-category">
                    <div className="filter-category">
                        <h3>Categorías</h3>
                        <label>
                            <input type="checkbox" onChange={() => toggleFiltros("categorias", "Hombres")} />
                            <span>Hombres</span>
                        </label>
                        <label>
                            <input type="checkbox" onChange={() => toggleFiltros("categorias", "Mujeres")} />
                            <span>Mujeres</span>
                        </label>
                        <label>
                            <input type="checkbox" onChange={() => toggleFiltros("categorias", "Niños")} />
                            <span>Niños</span>
                        </label>
                    </div>

                    <div className="filter-category">
                        <h3>Tipos</h3>
                        <label>
                            <input type="checkbox" onChange={() => toggleFiltros("tipos", "Chaquetas")} />
                            <span>Chaquetas</span>
                        </label>
                        <label>
                            <input type="checkbox" onChange={() => toggleFiltros("tipos", "Ropa interior")} />
                            <span>Ropa interior</span>
                        </label>
                        <label>
                            <input type="checkbox" onChange={() => toggleFiltros("tipos", "Zapatos")} />
                            <span>Zapatos</span>
                        </label>
                    </div>
                </div>
            </aside>

            <main className="collections">
                <div className="options">
                    <h2>Todas las colecciones</h2>
                    <div className="sort-options">
                        <label>
                            Ordenar por:
                            <select>
                                <option>Relevate </option>
                                <option>Precio: Menor a mayor </option>
                                <option>Precio: Mayor a menor </option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="products">
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : productosFiltrados.length > 0 ? (
                        productosOrdenados.map((product) => (
                            <div className="product-card" key={product.id}>
                                <img src={product.image} alt={product.name} className="product-image" onClick={() => handleImageClick(product.id)}/>
                                <h3>{product.nombre}</h3>
                                <p>${product.precio}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">
                            No hay productos que coincidan con los filtros seleccionados
                        </p>
                    )}
                </div>
            </main>
        </section>
    )
}

export default ProductList