import '../../styles/sign-up-in-styles/sign-up-in.css'
import { useEffect } from 'react'
import { useState } from 'react'
import mountain from '../../images/login-page/mountain.png'
import rock1 from '../../images/login-page/rock 1.png'
import rock2 from '../../images/login-page/rock 2.png'
import rock3 from '../../images/login-page/rock 3.png'
import rock4 from '../../images/login-page/rock 4.png'
import rock5 from '../../images/login-page/rock 5.png'
import rock6 from '../../images/login-page/rock 6.png'

function SignUpInContent() {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [createdPassword, setCreatedPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [isSubmitLogin, setIsSubmitLogin] = useState(false)
    const [formErrorsLogin, setFormErrorsLogin] = useState({})

    async function loginAdmin(event) {
        event.preventDefault()
        setFormErrorsLogin(validateLogin(loginEmail, loginPassword))
        setIsSubmitLogin(true)
    }

    async function registerAdmin(event) {
        event.preventDefault()
        setFormErrors(validate(email, userName, createdPassword, confirmedPassword)) 
        setIsSubmit(true)
    }

    function validateLogin (email, password) {
        const errorsLogin = {}
        const regexEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!email) {
            errorsLogin.email = "Email is required"
        } else if (!regexEmail.test(email)) {
            errorsLogin.email = "Invalid email"
        }
        if (!password) {
            errorsLogin.password = "Password is required"
        } else if (!regexPassword.test(password)) {
            errorsLogin.password = "Minimum eight characters, at least one letter, one number and one special character"
        }
        return errorsLogin
    }

    function validate (email, userName, createdPassword, confirmedPassword) {
        const errors = {}
        const regexEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!email) {
            errors.email = "Email is required"
        } else if (!regexEmail.test(email)) {
            errors.email = "Invalid email"
        }
        if (!userName) {
            errors.userName = "User name is required"
        } else if (userName.length > 10 || userName.length < 4) {
            errors.userName = "Password must be 4-10 characters"
        }
        if (!createdPassword) {
            errors.createdPassword = "Create a password"
        } else if (!regexPassword.test(createdPassword)) {
            errors.createdPassword = "Minimum eight characters, at least one letter, one number and one special character"
        }
        if (!confirmedPassword) {
            errors.confirmedPassword = "Confirm the password"
        } else if (createdPassword !== confirmedPassword) {
            errors.confirmedPassword = "Characters did not match"
        }
        return errors
    }

    useEffect(() => {

        const approachToSignInButton = document.getElementById('approach-to-sign-in-content')
        const approachToSignUpButton = document.getElementById('approach-to-sign-up-content')
        const animatedElements = document.querySelectorAll('.animated')
        const notificationContainer = document.querySelector('.notification-container')

        const emailVerified = localStorage.getItem('emailVerified')
        if (emailVerified) {
            animatedElements.forEach((elements) => {
                elements.classList.add('active')
            })
        }

        approachToSignInButton.addEventListener("click", () => {
            animatedElements.forEach((elements) => {
                elements.classList.add("active")
            })
        })
        approachToSignUpButton.addEventListener("click", () => {
            animatedElements.forEach((elements) => {
                elements.classList.remove("active")
            })
        })

        async function formUpload() {
            if(Object.keys(formErrors).length === 0 && isSubmit) {
                const response = await fetch('http://localhost:1337/api/register-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        userName,
                        createdPassword
                    })
                })
                const data = await response.json()
                console.log(data)
                if (data.error === 'Duplicate email') {
                    formErrors.email = 'This email has already registered'
                }
                if (data.registered === 'done') {
                    setEmail('')
                    setUserName('')
                    setCreatedPassword('')
                    setConfirmedPassword('')
                    animatedElements.forEach((elements) => {
                        elements.classList.add('active')
                    })
                    const notification = document.createElement('div')
                    notification.classList.add('notification')
                    notification.innerHTML = '<i class="fa-solid fa-envelope"></i>An email sent to your account. Please verify!'
                    notificationContainer.appendChild(notification)
                    setTimeout(() => {
                        notification.remove()
                    }, 7000)

                }
                setIsSubmit(false)
            }
        }
        async function formUploadLogin() {
            if(Object.keys(formErrorsLogin).length === 0 && isSubmitLogin) {
                const response = await fetch('http://localhost:1337/api/login-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        loginEmail,
                        loginPassword
                    })
                })
                const data = await response.json()
                console.log(data)
                if(data.user === 'not') {
                    formErrorsLogin.password = 'Password is incorrect'
                }
                if(data.error === 'Invalid email') {
                    formErrorsLogin.email = 'Invalid email'
                }
                if (data.message === 'sent an email') {
                    const notification = document.createElement('div')
                    notification.classList.add('notification')
                    notification.innerHTML = '<i class="fa-solid fa-envelope"></i>An email sent to your account. Please verify!'
                    notificationContainer.appendChild(notification)
                    setTimeout(() => {
                        notification.remove()
                    }, 7000)
                }
                if (data.status === 'ok') {
                    setLoginEmail('')
                    setLoginPassword('')
                    sessionStorage.setItem('user', data.user)
                    window.location.href = '/admin-dashboard'
                }
                setIsSubmitLogin(false)
            }
        }
        formUpload()
        formUploadLogin()
    }, [formErrors,email,createdPassword,userName,isSubmit,formErrorsLogin,isSubmitLogin,loginEmail,loginPassword])

    return (
        <div className="sign-up-section">
            <div className='notification-container'>
                
            </div>
            <div className="left animated">
                <div className="sign-in-up-page-form-container sign-in-form animated">
                    <h1>Login Your Account</h1>
                    <form onSubmit={loginAdmin}>
                        <input
                            type="email" 
                            placeholder="Email Address"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <p>{formErrorsLogin.email}</p>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <p>{formErrorsLogin.password}</p>    
                        <div>
                            <h6>Forgot your password?</h6>
                        </div>
                        <button>Submit</button>
                        <h4>Create Account</h4>
                    </form>
                </div>
            </div>
            <div className="right animated">
                <div className="sign-in-up-page-form-container sign-up-form animated">
                    <h1>Create Your Account</h1>
                    <form onSubmit={registerAdmin}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address" 
                        />
                        <p>{formErrors.email}</p>
                        <input 
                            type="text" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="User Name" 
                        />
                        <p>{formErrors.userName}</p>
                        <input 
                            type="password"
                            value={createdPassword}
                            onChange={(e) => setCreatedPassword(e.target.value)}
                            placeholder="Create a password" 
                        />
                        <p>{formErrors.createdPassword}</p>
                        <input 
                            type="password"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                            placeholder="Confirm the password"
                        />
                        <p>{formErrors.confirmedPassword}</p>
                        <button>Submit</button>
                        <h4>Login Account</h4>
                    </form>
                </div>
            </div>
            <div className="upper-content">
                <div className="sign-up-description"> 
                    <div className="sign-up-content animated">
                        <h1>Trophy Station</h1>
                        <h4>Just follow the steps down here to get access through the system.</h4>
                        <div className="steps-container">
                            <p><span className="numbers">01</span> Enter your email address and a unique user name.</p>
                            <p><span className="numbers">02</span> Create a strong password and a confirm it.</p>
                            <p><span className="numbers">03</span> Click the Sign Up button and confirm your email address</p>
                        </div>
                        <div className="button-container">
                            <button id="approach-to-sign-in-content">Sign In</button>
                        </div>
                    </div>
                </div>
                <div className="sign-in-description animated">
                    <div className="sign-in-content animated">
                        <h1>Trophy Station</h1>
                        <h4>Hello there. Welcome back</h4>
                        <div className="steps-container">
                            <p><span className="numbers">01</span> Enter your email address and a unique user name.</p>
                            <p><span className="numbers">02</span> Create a strong password and a confirm it.</p>
                            <p><span className="numbers">03</span> Click the Sign Up button and confirm your email address</p>
                        </div>
                        <div className="button-container">
                            <button id="approach-to-sign-up-content">Sign Up</button>
                        </div>
                    </div>
                </div>
                <div className="animated-square animated"></div>   
            </div>
            <img className="mountain" src={mountain} alt="" />
            <img className="rock1" src={rock1} alt="" />
            <div className="rock-container">
                <img className="rock2" src={rock2} alt="" />
                <img className="rock3" src={rock3} alt="" />
                <img className="rock4" src={rock4} alt="" />
                <img className="rock5" src={rock5} alt="" />
                <img className="rock6" src={rock6} alt="" />
            </div>
        </div>
    )
}

export default SignUpInContent