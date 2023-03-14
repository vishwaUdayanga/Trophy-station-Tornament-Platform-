const mongoose = require('mongoose')

const Tournament = new mongoose.Schema(
    {
        tournamentName: { type: String, required: true },
        maxNoOfTeams: { type: Number, required: true },
        noOfPlayersForATeam: { type: Number, required: true },
        gameName: { type: String, required: true },
        gameType: { type: String, required: true },
        adminEmail: { type: String, required: true },
        tournamentTheme: { type: String }
    },
    { collection: 'tournaments' }
)

const model = mongoose.model('TournamentData', Tournament)

module.exports = model