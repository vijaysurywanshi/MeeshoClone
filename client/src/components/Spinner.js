import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
function Spinner({ path="login" }) {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);

        // redirect once count is equal to 0
        
        count === 0 && navigate( `/${path}` , { 
            state:   location.pathname  } );
        // cleanup
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);
    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center " style={{height: '100vh'}}>
            <h1 className="text-center">Redirecting you in {count} seconds</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        </>

    )
}

export default Spinner
