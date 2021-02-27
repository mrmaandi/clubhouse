import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../section/Wrapper';
import Dropzone from './Dropzone';
import DialogComponent from '../common/DialogComponent';
import { Box, Divider, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { DropzoneFile } from '../../store/DropzoneStore';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';

const AddFilesToChallengeModal: FC = () => {
    const { dropzoneStore, securityStore } = useRootStore();

    return (
        <DialogComponent title="Add files to existing challenge" onSubmit={dropzoneStore.handleFileUpload}>
            <Dropzone>
                <div>
                    <Box p={2}>
                        <Grid container spacing={1}>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="challenge-id"
                                    label="Challenge ID"
                                    color="secondary"
                                    variant="outlined"
                                    onChange={(e) => dropzoneStore.setChallengeId(e.target.value)}
                                    value={dropzoneStore.challengeId}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="security-token"
                                    label="Security token"
                                    color="secondary"
                                    variant="outlined"
                                    onChange={(e) => securityStore.setSecurityToken(e.target.value)}
                                    value={securityStore.securityToken}
                                />
                            </Grid>
                        </Grid>
                        {dropzoneStore.files.length == 0 && (
                            <Box mt={1}>
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
                                                <Typography variant="subtitle2">{dropzoneFile.file.type}</Typography>{' '}
                                                {dropzoneFile.file.name}
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    size="small"
                                                    id={'user-textfield-' + i}
                                                    label="User"
                                                    variant="filled"
                                                    onChange={(e) =>
                                                        dropzoneStore.changeUserIdOfFile(
                                                            dropzoneFile.id,
                                                            dropzoneFile.fileName,
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={
                                                        dropzoneStore.files[
                                                            dropzoneStore.files.findIndex(
                                                                (file) => dropzoneFile.fileName === file.fileName,
                                                            )
                                                        ].userId
                                                    }
                                                />
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        dropzoneStore.removeFromFiles(dropzoneFile.file.name)
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            ))}
                        <Grid container spacing={1}>
                            <Grid item>
                                {dropzoneStore.uploadStatus === 'success' && <Alert severity="success">Success</Alert>}
                                {dropzoneStore.uploadStatus === 'failed' && <Alert severity="error">Failed</Alert>}
                                {dropzoneStore.uploadStatus === 'loading' && (
                                    <Alert severity="info">Making request ...</Alert>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Dropzone>
        </DialogComponent>
    );
};

export default observer(AddFilesToChallengeModal);
