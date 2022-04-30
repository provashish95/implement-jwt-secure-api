import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadProduct = () => {
    const [user, loading, error] = useAuthState(auth);

    const handleUpload = e => {
        e.preventDefault();
        const productName = e.target.productName.value;
        const price = e.target.price.value;
        const quantity = e.target.quantity.value;

        const url = `http://localhost:5000/uploadProduct`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                productName, price, quantity
            }),
            headers: {
                'authorization': `${user.email} ${localStorage.getItem("accessToken")}`,
                'Content-type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success(data.success)
                e.target.reset()
            });

    }
    return (
        <div className='container'>
            <h4 className='text-center text-info my-5'>Upload product</h4>
            <div className='w-50 mx-auto'>
                <form onSubmit={handleUpload}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                        <input type="text" name="productName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                        <input type="text" name="price" className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Quantity</label>
                        <input type="text" name="quantity" className="form-control" id="exampleInputPassword2" required />
                    </div>

                    <button type="submit" className="btn btn-primary">Upload</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UploadProduct;