import '../../styles/user-type-style/user-type.css'
import {Link} from 'react-router-dom'
function UserTypeContent() {
    return(
        <>
            <div className="user-type-container">
                <div className="user-type-content-container">
                    <h1>Select the account type!</h1>
                    <div className="type-buttons">
                        <Link to="/signup-admin" className="user-type-button admin"><i className="fa-solid fa-user-gear"></i><span>Admin</span></Link>
                        <Link to="/" className="user-type-button Candidate"><i className="fa-solid fa-user"></i><span>Candidate</span></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserTypeContent