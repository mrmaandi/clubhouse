import React from 'react';
import { Typography } from '@material-ui/core';

interface IEventSubmission {
    user: string;
    type: string;
    fileUrl: string;
}

interface IPreviousEvent {
    id?: string;
    name?: string;
    description?: IEventSubmission[];
}

interface IPreviousEventsState {
    previousEvents: IPreviousEvent[];
}

class PreviousEvents extends React.Component<unknown, IPreviousEventsState> {
    constructor() {
        super({});

        this.state = {
            previousEvents: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/calendar/previous', { mode: 'cors' })
            .then((response) => response.json())
            .then((json) => this.setState({ previousEvents: json }));
    }

    render(): JSX.Element {
        if (this.state.previousEvents.length == 0) {
            return <>No previous events</>;
        }

        return (
            <>
                <Typography variant="h6" style={{ paddingTop: '15px' }}>
                    Previous Events
                </Typography>
                {this.state.previousEvents.map((event: IPreviousEvent) => {
                    console.log(event);

                    return (
                        <div key={event.id}>
                            {event.name}
                            {event.description
                                ?.filter((submission: IEventSubmission) => submission.type === 'music')
                                .map((submission: IEventSubmission) => {
                                    return (
                                        <>
                                            {submission.user}
                                            {submission.fileUrl}
                                        </>
                                    );
                                })}
                        </div>
                    );
                })}
            </>
        );
    }
}

export default PreviousEvents;
