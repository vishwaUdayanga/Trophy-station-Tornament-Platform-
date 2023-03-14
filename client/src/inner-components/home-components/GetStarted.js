import '../../styles/Home-style/get-started.css'

function GetStarted() {
    return (
        <div className="get-started-container">
            <h1 className="topic">Get Started !</h1>
            <div className="card-container">
                <div className="card">
                    <h1>01</h1>
                    <p>If you are new to this platform, click the above Sign Up button. The system will show you two options whether you need to register to the platform as a tournament admin or a competitor. You have to choose one of them according to your choice. Then the system will show you the required information to get access through the platform. Then you are automatically redirect to the login page.</p>
                </div>
                <div className="card">
                    <h1>02</h1>
                    <p>You just need to entire your user credentials correctly and hit the Sign in button. If you are using the platform later, you need to select the login type whether Admin or Competitor to redirect the particular login page and your dashboard.</p>
                </div>
                <div className="card">
                    <h1>03</h1>
                    <p>Admin Dashboard : Since this is a tournament organization platform, you can make your own tournament with a proper manner with our system. You just need to click the make a tournament button. Then you will be getting the tournament options. Fill that form with your tournament details and you will get a new page with your tournament details and a unique Id for it. Share that Id with your candidates to register with your tournament.</p>
                </div>
                <div className="card">
                    <h1>04</h1>
                    <p>Competitor Dashboard : Here you can participate to a tournament with your tram or giving access to your team leader to register to the tournament. If you are the team leader, choose the options called register a team and fill your information of the team and your team mates. Remember that you can register your team mates with your team only if he/she have gave you the access to register with your email. You must provide your registered email to your team mates before register the team.</p>
                </div>
            </div>
        </div>
    )
}

export default GetStarted
