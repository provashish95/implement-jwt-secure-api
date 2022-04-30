import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const OrderList = () => {
    const [user, loading, error] = useAuthState(auth);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const url = `https://evening-coast-18476.herokuapp.com/orderList`;
        fetch(url, {
            headers: {
                'authorization': `${user.email} ${localStorage.getItem("accessToken")}`,
            },
        })
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [user.email]);

    return (
        <div className='container mt-5'>
            <h4 className='text-center text-info mt-5'>Order List</h4>
            <div className="row">
                {
                    orders.map(order => <>
                        <div className="col-12 col-md-4 col-lg-4 mt-5">
                            <div className="card" style={{ width: '18rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{order.productName}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{order.price}</h6>
                                    <p className="card-text">{order.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default OrderList;