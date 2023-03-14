import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import '../styles/general-styles/navigation.css'
import SampleUserImage from '../images/sample-avatar/user.png'

function Navigation() {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [postProfileImage, setPostProfileImage] = useState({ myImage : "" })
    const [isSetProfileImg, setIsSetProfileImg] = useState(false)
    const [fetchedProfileImage, setFetchedProfileImage] = useState('')
    const [userName, setUserName] = useState('')
    const notificationContainer = document.querySelector('.notification-container')

    async function authenticateUser(){
        const req = await fetch('http://localhost:1337/api/users/get-verified', {
            headers: {
                'x-access-token': sessionStorage.getItem('user')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setAuthenticated(true)
            setFetchedProfileImage(data.profilePicture)
            setUserName(data.userName)
        }
    }

    async function createPostProfilePic(newProfileImg) {
        try {
            const userToken = {payload: newProfileImg.myImage }
            const req = await fetch('http://localhost:1337/api/users/upload-profile-pic', {
                method: 'POST',
                headers: {
                    'x-access-token': sessionStorage.getItem('user'),
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(userToken)
            })

            const data = await req.json()
            if (data.status === 'ok') {
                setFetchedProfileImage(userToken.payload)
                setIsSetProfileImg(false)
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handleProfilePic(event) {
        const file = event.target.files[0]
        const fileSizeInKb = file.size/1024
        const MAX_FILE_SIZE = 2048
        if (fileSizeInKb > MAX_FILE_SIZE) {
            const notification = document.createElement('div')
            notification.classList.add('notification')
            notification.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>File is too large'
            notificationContainer.appendChild(notification)
            setTimeout(() => {
                notification.remove()
            }, 7000)
            return
        }
        const base64 = await convertToBase64(file)
        setPostProfileImage({ myImage: base64 })
        setIsSetProfileImg(true)
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    useEffect(() => {
        const threeBars = document.querySelector(".three-bars")
        const linksContainer = document.querySelector(".links-container")

        threeBars.addEventListener("click", () => {
            threeBars.classList.toggle("active")
            linksContainer.classList.toggle("active")
        })

        document.querySelectorAll(".link").forEach(n => n.addEventListener("click", () => {
            threeBars.classList.remove("active")
            linksContainer.classList.remove("active")
        }))
    }, [])

    useEffect(() => {
        const userToken = sessionStorage.getItem('user')
        if(userToken) {
            const user = jwtDecode(userToken)
            if (!user) {
                sessionStorage.removeItem('user')
            } else {
                authenticateUser()
            }
        }
        const hiddenElements = document.querySelectorAll('.to-be-hidden-when-logged')
        const displayedElement = document.querySelectorAll('.to-be-displayed-when-logged')

        if (isAuthenticated) {
            hiddenElements.forEach((element) => {
                element.classList.add('active')
            })
            displayedElement.forEach((element) => {
                element.classList.add('active')
            })

        } else {
            hiddenElements.forEach((element) => {
                element.classList.remove('active')
            })
            displayedElement.forEach((element) => {
                element.classList.remove('active')
            })
        }

        if(isSetProfileImg) {
            createPostProfilePic(postProfileImage)
        }
    }, [isAuthenticated, isSetProfileImg, postProfileImage])

    return (
        <>
            <nav>
                <div className='notification-container'>
                
                </div>
                <div className="top-bar">
                    <div className="icon-set">
                        <p>Follow Us</p>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-twitch"></i>
                        <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div>
                        <p className="welcome-message">Welcome to Trophy station!</p>
                    </div>
                </div>
                <div className="bottom-bar">
                    <div className="three-bars">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul className="links-container">
                        <li>
                            <Link to="/" className="link">Home</Link>
                        </li>
                        <li>
                            <Link to="/" className="link">About</Link>
                        </li>
                        <li>
                            <Link to="/" className="link">Games</Link>
                        </li>
                        <li>
                            <Link to="/" className="link">Guide</Link>
                        </li>
                        <li>
                            <Link to="/" className="link">Contact</Link>
                        </li>  
                    </ul>
                    <div className='main-buttons to-be-hidden-when-logged'>
                        <Link to="/user-type" className="main-button">Sign Up</Link>
                        <Link to="/" className="main-button">Sign In</Link>
                    </div>
                    <div className='user-profile-details to-be-displayed-when-logged'>
                        <h3>{userName}</h3>
                        <div className='user-image'>
                            <label htmlFor='my-pic'>
                                <img src={fetchedProfileImage || SampleUserImage} alt="" />
                            </label>
                            <input
                                type="file"
                                name="profile-image"
                                id="my-pic"
                                accept=".jpeg, .png, .jpg"
                                onChange={handleProfilePic}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navigation


