import React from 'react';

interface ICountdownProps {
    date: Date;
}

interface ICountdownState {
    timeLeft: ITimeLeft;
}

interface ITimeLeft {
    days: number;
    hours: number;
    min: number;
    sec: number;
}

class Countdown extends React.Component<ICountdownProps, ICountdownState> {
    public interval: any;

    constructor(props: ICountdownProps) {
        super(props);

        this.state = {
            timeLeft: {
                days: 0,
                hours: 0,
                min: 0,
                sec: 0,
            },
        };
    }

    componentDidMount(): void {
        this.interval = setInterval(() => {
            const timeLeft: ITimeLeft = this.calculateCountdown();
            timeLeft ? this.setState({ timeLeft: timeLeft }) : this.stop();
        }, 1000);
    }

    componentWillUnmount(): void {
        this.stop();
    }

    calculateCountdown(): ITimeLeft {
        let diff = (this.props.date.getTime() - Date.now()) / 1000;

        const timeLeft: ITimeLeft = {
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
        };

        // clear countdown when date is reached
        if (diff <= 0) return timeLeft;

        if (diff >= 24 * 60 * 60) {
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 60 * 60) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = Math.floor(diff);

        return timeLeft;
    }

    stop() {
        clearInterval(this.interval);
    }

    addLeadingZeros(value: number) {
        let date = String(value);
        while (date.length < 2) {
            date = '0' + value;
        }
        return date;
    }

    render() {
        const countDown = this.state.timeLeft;

        return (
            <div className="Countdown">
                <span className="Countdown-col">
                    <span className="Countdown-col-element">
                        <strong>{this.addLeadingZeros(countDown.days)}</strong>
                        <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
                    </span>
                </span>

                <span className="Countdown-col">
                    <span className="Countdown-col-element">
                        <strong>{this.addLeadingZeros(countDown.hours)}</strong>
                        <span>Hours</span>
                    </span>
                </span>

                <span className="Countdown-col">
                    <span className="Countdown-col-element">
                        <strong>{this.addLeadingZeros(countDown.min)}</strong>
                        <span>Min</span>
                    </span>
                </span>

                <span className="Countdown-col">
                    <span className="Countdown-col-element">
                        <strong>{this.addLeadingZeros(countDown.sec)}</strong>
                        <span>Sec</span>
                    </span>
                </span>
            </div>
        );
    }
}

export default Countdown;
