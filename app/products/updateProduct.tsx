'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"

type Product = {
    id: number,
    name: string
    price: number
}

export default function UpdateProduct(product: Product){

    const router = useRouter();

    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [isMutating, setIsMutating] = useState(false)


    function handleChange(){
        setModal(!modal)
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                price: price
            })
        });
        setIsMutating(false)
        router.refresh();
        setModal(false)
    }


    return(
        <div>

        <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
        <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-large">Edit {product.name}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product Name"/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="Price"/>
                        </div>
                        <div className="modal-action">
                            {!isMutating?(
                                <>
                                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </>
                            ):(
                                <button type="button" className="btn loading">Updating...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )    
}