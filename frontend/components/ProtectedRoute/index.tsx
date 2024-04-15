import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import verifyToken from '../../utils/verifyToken'
import { State } from '../../global/reducers'
import { useDispatch } from 'react-redux'
import {useSelector} from 'react-redux'

type ProtectedRouteType = {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ children }) => {
    const [isTokenVerified, setTokenVerified] = useState<boolean | null>(null);
    const auth = useSelector((state: State) => state.auth) as { status: boolean };
    const dispatch = useDispatch()

    useEffect(() => {

        const verified = async () => {
            await verifyToken(dispatch);
            // if (auth.status === true) {
            //     setTokenVerified(true);
            // } else {
            //     setTokenVerified(false);
            // }
        };
        verified();
    }, []);

    // if (isTokenVerified === null) {
    //     return null;
    // }

    // if (isTokenVerified === false) {
    //     return <Navigate to='/' />;
    // }

    return <>{children}</>;
}

export default ProtectedRoute;