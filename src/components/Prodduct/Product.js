import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ product }) => {
    const [user, loading, error] = useAuthState(auth);

    const handleOrder = product => {
        const { productName, price, quantity } = product;

        fetch('https://evening-coast-18476.herokuapp.com/addOrder', {
            method: 'POST',
            body: JSON.stringify({
                productName,
                price,
                quantity,
                email: user.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => toast.success(data.success));

    }
    return (
        <div className='col-12 col-md-4 col-lg-4 my-4'>

            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body text-center">
                    <h5 className="card-title">{product.productName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Price: {product.price}</h6>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <button onClick={() => handleOrder(product)} className='btn btn-info'>Order now</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Product;