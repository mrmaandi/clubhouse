import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { IEntriesByChallenge } from '../../store/EntriesStore';
import AlbumIcon from '@material-ui/icons/Album';

const Analytics: FC = () => {
    const { entriesStore } = useRootStore();
    const challengesSizes: number[] = [];
    const challengesLabels: string[] = [];

    const handleChallenge = (challenge: IEntriesByChallenge) => {
        challengesSizes.push(challenge.entries.length);
        challengesLabels.push(challenge.challenge.name);
    };

    if (entriesStore.groupedEntriesByChallengeId !== null) {
        entriesStore.groupedEntriesByChallengeId.forEach((challenge: IEntriesByChallenge) =>
            handleChallenge(challenge),
        );
    }

    const data = {
        labels: challengesLabels,
        datasets: [
            {
                label: '# of sample flips',
                data: challengesSizes,
                backgroundColor: 'rgba(255,255,255,0.7)',
                // borderColor: 'rgba(255,255,255)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const render = (): JSX.Element => {
        const { previousEventsStore, usersStore } = useRootStore();

        return (
            <Box mt={3}>
                <Box display="div">
                    <Typography color="textSecondary" variant="subtitle2" align="center">
                        There are currently{' '}
                        <Typography display="inline" color="textPrimary">
                            {previousEventsStore.totalMusicCount}
                        </Typography>{' '}
                        sample flips from{' '}
                        <Typography display="inline" color="textPrimary">
                            {usersStore.filteredUsersWithMusicEntries.length}
                        </Typography>{' '}
                        people
                    </Typography>
                </Box>
                <Button startIcon={<AlbumIcon />} color="inherit" size="medium">
                    <Box fontSize={20} fontWeight={800} letterSpacing={1}>
                        Statistics
                    </Box>
                </Button>
                <Bar data={data} options={options} />
            </Box>
        );
    };

    return <Container maxWidth="lg">{render()}</Container>;
};

export default observer(Analytics);
