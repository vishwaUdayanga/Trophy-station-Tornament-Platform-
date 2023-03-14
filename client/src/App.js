import './styles/general-styles/common-style.css'
import './styles/general-styles/color-pallet.css'
import Home from './main-pages/Home'
import SignUpInAdmin from './main-pages/SignUpInAdmin'
import UserType from './main-pages/UserType'
import EmailVerify from './main-pages/EmailVerify'
import AdminDashboard from './main-pages/AdminDashboard'
import TournamentPageAdmin from './main-pages/TournamentPageAdmin'
import 'https://kit.fontawesome.com/c4a594ff55.js'
import 'https://kit.fontawesome.com/f1513ae29e.js'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-admin" element={<SignUpInAdmin />} />
        <Route path="/user-type" element={<UserType />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/tournament-page-admin" element={<TournamentPageAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
