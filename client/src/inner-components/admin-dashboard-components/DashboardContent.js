import "../../styles/admin-dashboard-style/dashboard-content.css"
import { useEffect, useState } from 'react'

function DashboardContent() {
    const [formData, setFormData] = useState({
        tournamentName: '',
        maxNoOfTeams: '',
        noOfPlayersForATeam: '',
        gameName: '',
        gameType: ''
    })

    async function createATournament(event) {
        event.preventDefault()
        try {
            const request = await fetch('http://localhost:1337/api/register/tournaments', {
                method: 'POST',
                headers: {
                    'x-access-token' : sessionStorage.getItem('user'),
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    formData,
                })
            })
            const data = await request.json()
            if ( data.status === 'ok' ) {
                setFormData({
                    ...formData, 
                    tournamentName: '',
                    maxNoOfTeams: '',
                    noOfPlayersForATeam: '',
                    gameName: '',
                    gameType: ''
                })
                setIsGetStatusOk(true)
                window.scrollTo(0, 0)
                sessionStorage.removeItem('tournament')
                sessionStorage.setItem('tournament', data.tournament)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const [isGetStatusOk, setIsGetStatusOk] = useState(false)

    useEffect(() =>{
        let newTournamentElement = document.getElementById('newTournament')
        let alreadyCreateElement = document.getElementById('alreadyCreated')
        let makeTournamentContent = document.querySelector('.make-a-new-tournament')
        let alreadyHaveContent = document.querySelector('.already-have-tournaments')
        // let notificationContainer = document.querySelector('.notification-container')
        newTournamentElement.style.backgroundColor = 'var(--hue-light-blue)'
        makeTournamentContent.style.display = 'flex'

        newTournamentElement.addEventListener('click', () => {
            newTournamentElement.style.backgroundColor = 'var(--hue-light-blue)'
            alreadyCreateElement.style.backgroundColor = 'var(--hue-white)'
            alreadyHaveContent.style.display = 'none'
            makeTournamentContent.style.display = 'flex'
        })
        
        alreadyCreateElement.addEventListener('click', () => {
            newTournamentElement.style.backgroundColor = 'var(--hue-white)'
            alreadyCreateElement.style.backgroundColor = 'var(--hue-light-blue)'
            alreadyHaveContent.style.display = 'flex'
            makeTournamentContent.style.display = 'none'
        })

        if (isGetStatusOk) {
            window.location.href = '/tournament-page-admin'
            setIsGetStatusOk(false)
        }
    }, [isGetStatusOk])

    return (
        <>
            <div className="dashboard-container">
                <div className="button-set">
                    <button id="newTournament">New Tournament</button>
                    <button id="alreadyCreated">Already Created</button>
                </div>
                <div className='notification-container'>
                
                </div>
                <div className="admin-dashboard-content">
                    <div className="content-controller">
                        <div className="make-a-new-tournament">
                            <div className="tournament-form">
                                <form onSubmit={createATournament}>
                                    <div className="form-topic">
                                        <h2>Create a new tournament</h2>    
                                        <p>Get in touch with the details</p>
                                    </div>

                                    <label>Tournament name</label>
                                    <input 
                                        type="text"
                                        value={formData.tournamentName}
                                        maxLength={20}
                                        minLength={5}
                                        onChange={(e) => setFormData({...formData, tournamentName: e.target.value})}
                                        required={true}
                                    />
                                    <label>Maximum number of teams</label>
                                    <input 
                                        type="number"
                                        value={formData.maxNoOfTeams}
                                        max={20}
                                        min={5}
                                        onChange={(e) => setFormData({...formData, maxNoOfTeams: e.target.value})}
                                        required={true}
                                    />
                                    <label>Number of players for a team</label>
                                    <input 
                                        type="number"
                                        value={formData.noOfPlayersForATeam}
                                        max={5}
                                        min={2}
                                        onChange={(e) => setFormData({...formData, noOfPlayersForATeam: e.target.value})}
                                        required={true}
                                    />
                                    <label>Game name</label>
                                    <input
                                        type="text"
                                        value={formData.gameName}
                                        max={20}
                                        minLength={4}
                                        onChange={(e) => setFormData({...formData, gameName: e.target.value})}
                                        required={true}
                                    />
                                    <label>Game type</label>
                                    <select required={true} onChange={(e) => setFormData({...formData, gameType: e.target.value})}>
                                        <option value=""></option>
                                        <option value="5vs5">5vs5</option>
                                        <option value="Battle royale">Battle royale</option>
                                        <option value="Team death">Team death</option>
                                    </select>
                                    <button>Submit</button>                                     
                                </form>
                            </div>
                            <div className="tournament-form-description">
                                <h2>Form note</h2>
                                <p>Here are the details needed to be filled in order to create your own tournament. Before fill it, determine whether what are your tournament settings that are distinguished from other tournaments. The settings can be changed after submitting the form in the particular tournament page. After submitting the form successfully, you will be redirected to a new page existing of your new tournament details and there you can copy your tournament link and send to your candidates to participate in. </p> 
                            </div>
                        </div>
                        <div className="already-have-tournaments">
                            <h1>Already created tournaments</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardContent