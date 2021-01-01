import React from 'react';
import Countdown from './Countdown';
import sample from '../assets/club.mp4';

interface IMainContentState {
    date?: number;
}

class MainContent extends React.Component<any, IMainContentState> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    componentDidMount(): void {
        fetch('http://localhost:8080/calendar/next', { mode: 'cors' })
            .then((response) => response.json())
            .then((json) => this.setState({ date: json }));
    }

    render(): JSX.Element {
        return (
            <>
                <div className="backdrop">
                    <video className="videoTag" autoPlay loop muted>
                        <source src={sample} type="video/mp4" />
                    </video>
                    <div className="overlay">
                        <p>Next event in</p>
                        {!this.state.date ? <>Loading</> : <Countdown date={new Date(this.state.date)} />}
                    </div>
                </div>
                <div className="events-section">Previous events</div>
            </>
        );
    }
}

export default MainContent;
