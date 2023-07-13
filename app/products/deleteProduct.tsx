'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

type Product = {
    id: number,
    name: string
    price: number
}


export default function DeleteProduct(product: Product){

    const router = useRouter();

    const [modal, setModal] = useState(false);

    const [isMutating, setIsMutating] = useState(false)


    function handleChange(){
        setModal(!modal)
    }

    const handleDelete = async (id: number) => {
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE'
        });
        setIsMutating(false)
        router.refresh();
        setModal(false)
    }


    return(
        <div>

        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
        <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-large">Are you sure to delete data?</h3>
                        <div className="modal-action">
                            {!isMutating?(
                                <>
                                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                                    <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">Delete</button>
                                </>
                            ):(
                                <button type="button" className="btn loading">deleting...</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )    
}