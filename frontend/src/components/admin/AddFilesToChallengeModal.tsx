import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../section/Wrapper';
import Dropzone from './Dropzone';
import DialogComponent from '../common/DialogComponent';
import { DropzoneFile } from '../../store/DropzoneStore';
import { Alert, Autocomplete } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Box,
    Checkbox,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { IUser } from '../../store/UsersStore';

const AddFilesToChallengeModal: FC = () => {
    const { challengesStore, usersStore, addChallengesStore, dropzoneStore, securityStore } = useRootStore();

    const renderAddChallengeSection = () => {
        return (
            <Box p={2}>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            size="small"
                            id="challenge-id"
                            label="Challenge Number"
                            color="secondary"
                            variant="outlined"
                            onChange={(e: any) => addChallengesStore.setChallengeId(e.target.value)}
                            value={addChallengesStore.challengeId}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            size="small"
                            id="challenge-name"
                            label="Challenge Name"
                            color="secondary"
                            variant="outlined"
                            onChange={(e: any) => addChallengesStore.setChallengeName(e.target.value)}
                            value={addChallengesStore.challengeName}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            size="small"
                            id="start-date"
                            label="Start datetime"
                            color="secondary"
                            variant="outlined"
                            onChange={(e: any) => addChallengesStore.setStartDate(e.target.value)}
                            value={addChallengesStore.startDate}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            size="small"
                            id="start-date"
                            label="End datetime"
                            color="secondary"
                            variant="outlined"
                            onChange={(e: any) => addChallengesStore.setEndDate(e.target.value)}
                            value={addChallengesStore.endDate}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const renderAddEntriesSection = () => {
        if (!challengesStore.challenges.payload) {
            return null;
        }

        return (
            <Box p={2}>
                <Box pb={2}>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <FormControl variant="outlined" size="small" fullWidth={true}>
                                <InputLabel>Challenge</InputLabel>
                                <Select
                                    labelId="challenge"
                                    id="challenge"
                                    value={dropzoneStore.challengeId}
                                    onChange={(e: any) => dropzoneStore.setChallengeId(e.target.value)}
                                >
                                    {challengesStore.challenges.payload
                                        .slice()
                                        ?.sort(
                                            (challenge1, challenge2) =>
                                                challenge1.challengeNumber - challenge2.challengeNumber,
                                        )
                                        .map((challenge, index) => {
                                            return (
                                                <MenuItem key={index} value={challenge.challengeNumber}>
                                                    {challenge.challengeNumber + ' - ' + challenge.name}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                size="small"
                                id="security-token"
                                label="Security token"
                                color="secondary"
                                variant="outlined"
                                onChange={(e: any) => securityStore.setSecurityToken(e.target.value)}
                                value={securityStore.securityToken}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Dropzone>
                    <div>
                        {dropzoneStore.files.length == 0 && (
                            <Box pt={1} pb={1}>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Typography align="center">Drag and drop files in here</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        {dropzoneStore.files
                            .filter((dropzoneFile) => dropzoneFile.id != null)
                            .map((dropzoneFile: DropzoneFile, i) => (
                                <div key={i}>
                                    {i != 0 && (
                                        <Box pt={1} pb={1}>
                                            <Divider light />
                                        </Box>
                                    )}
                                    <Box mb={1}>
                                        <Grid container spacing={1} alignItems="center">
                                            <Grid item xs>
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {dropzoneFile.file.type}
                                                    </Typography>{' '}
                                                    <Typography variant="subtitle1" color="textPrimary">
                                                        <Box display="inline" fontWeight={800}>
                                                            {dropzoneFile.file.name}
                                                        </Box>
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs>
                                                <Autocomplete
                                                    fullWidth
                                                    id="user-select-auto-complete"
                                                    options={usersStore.users.payload as IUser[]}
                                                    getOptionLabel={(user: IUser) => user.name}
                                                    onInputChange={(e: any, value) =>
                                                        dropzoneStore.changeUserOfFile(
                                                            dropzoneFile.id,
                                                            dropzoneFile.fileName,
                                                            value,
                                                        )
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            label="User select"
                                                            variant="outlined"
                                                            error={
                                                                !dropzoneStore.files[
                                                                    dropzoneStore.files.findIndex(
                                                                        (file) =>
                                                                            dropzoneFile.fileName === file.fileName,
                                                                    )
                                                                ].userName
                                                            }
                                                            size="small"
                                                            value={
                                                                dropzoneStore.files[
                                                                    dropzoneStore.files.findIndex(
                                                                        (file) => dropzoneFile.id === file.id,
                                                                    )
                                                                ].userName
                                                            }
                                                        />
                                                    )}
                                                    freeSolo
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Checkbox
                                                    checked={dropzoneFile.isOriginalSample}
                                                    onChange={(e) =>
                                                        dropzoneStore.changeOriginalSampleFile(
                                                            dropzoneFile,
                                                            e.target.checked,
                                                        )
                                                    }
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => dropzoneStore.removeFromList(dropzoneFile)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            ))}
                    </div>
                </Dropzone>
                <Grid container spacing={1}>
                    <Grid item>
                        <Box pt={1}>
                            {dropzoneStore.uploadStatus === 'success' && <Alert severity="success">Success</Alert>}
                            {dropzoneStore.uploadStatus === 'failed' && <Alert severity="error">Failed</Alert>}
                            {dropzoneStore.uploadStatus === 'loading' && (
                                <Alert severity="info">Making request ...</Alert>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    useEffect(() => {
        challengesStore.fetchChallenges();
        usersStore.fetchUsers();
    });

    return (
        <DialogComponent title="Create challenges and add files" onSubmit={dropzoneStore.handleFileUpload}>
            <div>
                {/*{renderAddChallengeSection()}*/}
                {renderAddEntriesSection()}
            </div>
        </DialogComponent>
    );
};

export default observer(AddFilesToChallengeModal);
