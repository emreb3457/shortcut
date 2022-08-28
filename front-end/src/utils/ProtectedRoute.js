import React, { Children, Component, Fragment } from "react"
import { Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAdmin }) => {

    const sessionuser = JSON.parse(sessionStorage.getItem("sessionUser"))
    
    if (!sessionuser) {
        return <Navigate to="/" />
    }
    return children
}
export default ProtectedRoute;