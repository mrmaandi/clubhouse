import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow } from '@material-ui/core';
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
                <Button onClick={modalStore.handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(DialogComponent);
