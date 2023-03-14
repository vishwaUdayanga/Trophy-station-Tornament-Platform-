import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import '../styles/email-verify-style/email-verify.css'

function EmailVerify() {
    const params = useParams()

    function getToLogin() {
        localStorage.setItem('emailVerified', true)
        window.location.href = '/signup-admin'
    }
    useEffect(() => {
        const url = `http://localhost:1337/api/users/${params.id}/verify/${params.token}`
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [params])
    return (
        <div className="email-verify-container">
            <div className="email-verify-inner">
                <h1><i className="fa-solid fa-circle-check"></i></h1>
                <p>Email Verified Successfully</p>
                <h4 className="email-verify-link" onClick={getToLogin}>Login</h4>
            </div>
        </div>
    )
}

export default EmailVerify

