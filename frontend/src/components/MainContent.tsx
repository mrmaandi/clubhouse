import React from 'react';
import Countdown from './Countdown';
import sample from '../assets/club.mp4';
import { Container, Divider, Typography } from '@material-ui/core';
import TwitchEmbed from './TwitchEmbed';
import PreviousEvents from './PreviousEvents';

interface IEvent {
    start: number;
    end: number;
}

interface IMainContentState {
    event?: IEvent;
}

class MainContent extends React.Component<any, IMainContentState> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    componentDidMount(): void {
        fetch('http://localhost:8080/calendar/next', { mode: 'cors' })
            .then((response) => response.json())
            .then((json) => this.setState({ event: json }));
    }

    render(): JSX.Element {
        if (!this.state.event) {
            return <></>;
        }

        return (
            <>
                <div className="backdrop">
                    <Container maxWidth="lg" disableGutters={true}>
                        {this.isEventActive() ? this.activeEventView() : this.eventCountdownView()}
                    </Container>
                </div>
                <div className="events-section">
                    <Container maxWidth="lg">
                        <PreviousEvents />
                    </Container>
                </div>
            </>
        );
    }

    private isEventActive(): boolean {
        if (!this.state.event) {
            return false;
        }

        //fix this
        if (new Date().getTime() > this.state.event.end) {
            return false;
        }

        return new Date().getTime() > this.state.event.start && new Date().getTime() < this.state.event.end;
    }

    private activeEventView(): JSX.Element {
        return <TwitchEmbed />;
    }

    private eventCountdownView(): JSX.Element {
        return (
            <>
                <video className="videoTag" autoPlay loop muted>
                    <source src={sample} type="video/mp4" />
                </video>
                <div className="overlay">
                    <p>Next event in</p>
                    {!this.state.event ? <>Loading</> : <Countdown date={new Date(this.state.event.start)} />}
                </div>
            </>
        );
    }
}

export default MainContent;
