import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { hasRole } from '../utils';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = hasRole(user, "ROLE_ADMIN");
    const isSeller = hasRole(user, "ROLE_SELLER");
    const location=useLocation();


    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }
   if (adminOnly) {
       if(isSeller&&!isAdmin){
       const sellerAllowedPaths=["/admin/orders", "/admin/products"];
       const sellerAllowed=sellerAllowedPaths.some(path => location.pathname.startsWith(path));
       if(!sellerAllowed){
            return <Navigate to="/" replace/>
       }
       }
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
}

    

export default PrivateRoute