import "/src/components/Search/Search.css"
import { useState } from "react";

const Search = ({ onSearch }) => {



    return (
        <section className="search">
            <input type="search"
                placeholder="Buscar"
                className="search-bar"
            />
        </section>
    )
}

export default Search;