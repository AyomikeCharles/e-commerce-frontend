import Product from "./utils/Products"
import { Link } from "react-router-dom"


const Products = () =>
    {    return(
       <>
            
                     <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Products</h3>
                                    <Link to='addproducts' className="bg-lime-500 p-3 rounded">Add Products</Link>
                                </div>
                                <div>
                                    <Product/>
                                </div>
                            </div>
                    </section>
               
        </>
    )
}

export default Products 