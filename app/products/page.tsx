import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

const getProduct = async ()  =>  {
    const res = await fetch('http://localhost:5000/products', {cache: 'no-store'});
    return res.json();
}

type Product = {
    id: number,
    name: string
    price: number
}

export default async function ProductList(){

    const products: Product[] = await getProduct();

    return(
        <div className="py-10 px-10">
            <h3>Product List</h3>
            <div className="py-2">
                <AddProduct />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index+1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td className="flex"> <DeleteProduct {...product} /> <UpdateProduct {...product} /> </td>
                    </tr>
                ))}
                    
                </tbody> 
            </table>
        </div>
    )
}