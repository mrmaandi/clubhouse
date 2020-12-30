import React from 'react';
import { Content } from 'antd/es/layout/layout';
import Countdown from './Countdown';
import sample from '../assets/dance.mp4';

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
        console.log(this.state.date);

        return (
            <Content className="site-layout" style={{ marginTop: 64 }}>
                <div className="backdrop">
                    <video className="videoTag" autoPlay loop muted>
                        <source src={sample} type="video/mp4" />
                    </video>
                    <div className="overlay" style={{ padding: 24, minHeight: 380 }}>
                        {!this.state.date ? <>Loading</> : <Countdown date={new Date(this.state.date)} />}
                    </div>
                </div>
            </Content>
        );
    }
}

export default MainContent;
