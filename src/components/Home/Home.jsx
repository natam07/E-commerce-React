import React from "react";
import ProductList from "../Products/ProducList";
import Search from "../Search/Search";

const Home = () => {
    return(
        <> 
            <Search></Search>
            <ProductList></ProductList>
        </>
    )
}

export default Home