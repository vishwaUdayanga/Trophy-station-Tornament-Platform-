import '../../styles/Home-style/main.css'
import { Link } from 'react-router-dom'
import $ from 'jquery'

function Main() {
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() === 0) {
                $("#bottom-line").show()
            } else {
                $("#bottom-line").hide()
            }
        })
    })
    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="content">
                    <div>
                        <p>Tournament experience from Trophy Station developers</p>
                        <div className="main-topic">
                            <h1><span className="word1">Welcome to</span><br/><span className="word2">Trophy Station</span><br/><span className="word3">Tournament Platform</span></h1>
                        </div>
                    </div>
                    <div className="button-container">
                        <p>Explore the features with login access</p>
                        <Link to="/" className="main-buttons-approach-1">Register</Link>
                        <Link to="/" className="main-buttons-approach-2">Sign In</Link>
                    </div>
                </div>
            </div>
            <div className="bottom-line" id="bottom-line">
                <Link to="/" className="down-button"><i className="fa-solid fa-angles-down"></i></Link>
            </div>
        </div>
    )
}

export default Main