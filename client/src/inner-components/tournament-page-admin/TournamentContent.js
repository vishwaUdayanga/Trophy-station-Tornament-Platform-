import "../../styles/tournament-page-style/tournament-page.css"
import { useCallback, useEffect, useState } from "react"

function Tournament() {
    const [postTheme, setPostTheme] = useState({ myTheme: "" })
    const [isSetTheme, setIsSetTheme] = useState(false)
    const [isChangeState, setIsChangeState] = useState(true)
    const notificationContainer = document.querySelector('.notification-container')

    const [tournamentDetails, setTournamentDetails] = useState({
        tournamentId: '',
        tournamentName: '',
        maxNoOfTeams: '',
        noOfPlayersForATeam: '',
        gameName: '',
        gameType: '',
        tournamentTheme: ''
    })

    async function handleTheme(event) {
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
        setPostTheme({ myTheme: base64 })
        setIsSetTheme(true)
    }

    const  createPostTheme =  useCallback(async(newTheme) => {
        try {
            setIsSetTheme(false)
            const payload = {payload: newTheme.myTheme}
            const req = await fetch('http://localhost:1337/api/users/upload-tournament-theme', {
                method: 'POST',
                headers: {
                    'x-access-token' : sessionStorage.getItem('tournament'),
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await req.json()
            if (data.status === 'ok') {
                console.log(data)
                setTournamentDetails({...tournamentDetails, tournamentTheme: payload.payload})
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [tournamentDetails])  
        

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

        if (isChangeState) {
            getTournamentDetails()
            async function getTournamentDetails () {
                try {
                    const req =  await fetch('http://localhost:1337/api/get/tournament-details', {
                        headers: {
                            'x-access-token' : sessionStorage.getItem('tournament')
                        }
                    })
                    const data = await req.json()
                    console.log(data)
                    setTournamentDetails({
                        ...tournamentDetails,
                        tournamentId: data.details._id,
                        tournamentName: data.details.tournamentName,
                        maxNoOfTeams: data.details.maxNoOfTeams,
                        noOfPlayersForATeam: data.details.noOfPlayersForATeam,
                        gameName: data.details.gameName,
                        gameType: data.details.gameType,
                        tournamentTheme: data.details.tournamentTheme
                    })
                    setIsChangeState(false)
                } catch (error) {
                    console.log(error.message)
                }
            }
        }
        const imageIconElement = document.querySelector('.to-be-small')
        if (!tournamentDetails.tournamentTheme) {
            imageIconElement.classList.remove('active')
        } else {
            imageIconElement.classList.add('active')
        }

        const tournamentContentElement = document.querySelector('.tournament-content-container')
        tournamentContentElement.style.backgroundImage = 'url('+tournamentDetails.tournamentTheme + ')'
        
        if (isSetTheme) {
            createPostTheme(postTheme)
        } 
    }, [isSetTheme, postTheme, tournamentDetails, createPostTheme, isChangeState])

    return (
        <>
            <div className="tournament-content-container">
                <label htmlFor="tournament-theme" className="to-be-small"><i className="fa-solid fa-image"></i></label>
                <input
                    type="file"
                    id="tournament-theme"
                    onChange={handleTheme}
                    name="tournament-theme"
                    accept=".jpeg, .png, .jpg"
                />
                <div className="tournament-details">
                    <h1>{tournamentDetails.tournamentName}</h1>
                    <p>Game : {tournamentDetails.gameName}</p>
                    <p>Game Type : {tournamentDetails.gameType}</p>
                </div>
                <div className="players-and-team-count">
                    <p>Maximum teams : {tournamentDetails.maxNoOfTeams}</p>
                    <p>Players for a team : {tournamentDetails.noOfPlayersForATeam}</p>
                </div>
                <div className="tournament-link">
                    <p>{tournamentDetails.tournamentId}</p>
                    <button>Copy</button>
                </div>
            </div>
        </>
    )
}

export default Tournament