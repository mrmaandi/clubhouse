import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';

export class DropzoneStore {
    isDragging = false;
    dragCounter = 0;
    files: string[] = [];

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            isDragging: observable,
            dragCounter: observable,
            files: observable,
            handleDrag: action,
            handleDragIn: action,
            handleDragOut: action,
            handleDrop: action,
        });
    }

    handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDragIn = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.isDragging = true;
        }
    };

    handleDragOut = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter === 0) {
            this.isDragging = false;
        }
    };

    handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        this.isDragging = false;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    };

    handleFiles = (files: any[]) => {
        const fileList = this.files;
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return;
            fileList.push(files[i].name);
        }
        this.files = fileList;
    };
}
