import React from 'react';
import auth from '../../firebase.init';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';



const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";


    const handleSignIn = () => {
        signInWithGoogle();
    }

    if (user) {
        const url = `https://evening-coast-18476.herokuapp.com/login`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: user.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('accessToken', data.token);
                navigate(from, { replace: true });
            });
    }

    return (
        <div className='container mt-5 text-center'>
            <button className='btn btn-warning ' onClick={handleSignIn}>Google Sign in </button>
        </div>
    );
};

export default Login;