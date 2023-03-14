import Navigation from "../common-components/Navigation"
import Footer from "../common-components/Footer"
import TournamentContent from "../inner-components/tournament-page-admin/TournamentContent"
import { useEffect } from "react"

function TournamentPageAdmin() {
    useEffect(() => {
        const userToken = sessionStorage.getItem('user')
        if(userToken) {
            authenticateUser()
            async function authenticateUser(){
                const req = await fetch('http://localhost:1337/api/users/main/get-verified', {
                    headers: {
                        'x-access-token': userToken
                    }
                })
        
                const data = await req.json()
                if (data.status === 'error') {
                    sessionStorage.removeItem('user')
                    window.location.href = '/signup-admin'
                }
            }
        } else {
            window.location.href = '/signup-admin'
        }
    }, [])
    return (
        <>
            <Navigation />
            <TournamentContent />
            <Footer />
        </>
    )
}

export default TournamentPageAdmin