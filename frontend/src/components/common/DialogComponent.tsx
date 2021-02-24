import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../section/Wrapper';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grow,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Grow ref={ref} {...props} />;
});

export interface IModalProps {
    title: string;
    children: JSX.Element;
    onClose?: () => void;
    onSubmit?: () => void;
}

const DialogComponent: FC<IModalProps> = (props: IModalProps) => {
    const { modalStore } = useRootStore();

    const dialogContent = (): JSX.Element => {
        return props.children;
    };

    if (!modalStore.isModalOpen) {
        return null;
    }

    return (
        <Dialog
            open={modalStore.isModalOpen}
            onClose={modalStore.handleClose}
            fullWidth
            maxWidth="md"
            TransitionComponent={Transition}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogContent()}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Box display="inline" mr={1}>
                    <Button
                        onClick={() => {
                            props.onSubmit && props.onSubmit();
                        }}
                        color="primary"
                        variant="contained"
                    >
                        Finish
                    </Button>
                </Box>
                <Button
                    onClick={() => {
                        props.onClose && props.onClose();
                        modalStore.handleClose();
                    }}
                    color="secondary"
                    variant="outlined"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(DialogComponent);
