'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"

export default function AddProduct(){

    const router = useRouter();

    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [isMutating, setIsMutating] = useState(false)


    function handleChange(){
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsMutating(true)
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                price: price
            })
        });
        setIsMutating(false)
        setTitle("")
        setPrice("");
        router.refresh();
        setModal(false)
    }


    return(
        <div>

        <button className="btn" onClick={handleChange}>Add New</button>
        <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-large">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product Name"/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="Price"/>
                        </div>
                        <div className="modal-action">
                            {!isMutating?(
                                <>
                                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </>
                            ):(
                                <button type="button" className="btn loading">Saving...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )    
}