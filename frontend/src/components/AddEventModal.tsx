import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';
import Dropzone from './Dropzone';
import DialogComponent from './DialogComponent';

const AddEventModal: FC = () => {
    const { dropzoneStore } = useRootStore();

    return (
        <DialogComponent title="Add new challenge event">
            <Dropzone>
                <div style={{ height: 300, width: 250 }}>
                    {dropzoneStore.files.map((file, i) => (
                        <div key={i}>{file}</div>
                    ))}
                </div>
            </Dropzone>
        </DialogComponent>
    );
};

export default observer(AddEventModal);
