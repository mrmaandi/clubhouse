import React, { FC, RefObject, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';

interface IDropzoneProps {
    children?: JSX.Element;
}

const Dropzone: FC<IDropzoneProps> = (props: IDropzoneProps) => {
    const { dropzoneStore } = useRootStore();
    const dropRef: RefObject<any> = React.createRef();

    useEffect(() => {
        const div = dropRef.current;
        div.addEventListener('dragenter', dropzoneStore.handleDragIn);
        div.addEventListener('dragleave', dropzoneStore.handleDragOut);
        div.addEventListener('dragover', dropzoneStore.handleDrag);
        div.addEventListener('drop', dropzoneStore.handleDrop);

        return () => {
            div.removeEventListener('dragenter', dropzoneStore.handleDragIn);
            div.removeEventListener('dragleave', dropzoneStore.handleDragOut);
            div.removeEventListener('dragover', dropzoneStore.handleDrag);
            div.removeEventListener('drop', dropzoneStore.handleDrop);
        };
    });

    return (
        <div style={{ border: '1px solid white', position: 'relative' }} ref={dropRef}>
            {dropzoneStore.isDragging && (
                <div
                    style={{
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36,
                        }}
                    >
                        <div>drop here :)</div>
                    </div>
                </div>
            )}
            {props.children}
        </div>
    );
};

export default observer(Dropzone);
