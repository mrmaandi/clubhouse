import React from 'react';

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';
const TARGET_ID = 'twitch-embed';
const CHANNEL_NAME = 'its_bustre';

class TwitchEmbed extends React.Component {
    componentDidMount() {
        const script = document.createElement('script');
        script.setAttribute('src', EMBED_URL);
        script.addEventListener('load', () => {
            new window.Twitch.Embed(TARGET_ID, {
                channel: CHANNEL_NAME,
                width: '100%',
                height: '100%',
            });
        });
        document.body.appendChild(script);
    }

    render() {
        return <div id={TARGET_ID} className="twitch-embed" />;
    }
}

export default TwitchEmbed;
