import React, { Children, Component, Fragment } from "react"
import { Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const session = sessionStorage.getItem("acctoken")
    if (!session) {
        return <Navigate to="/" />
    }
    return children
}
export default ProtectedRoute;