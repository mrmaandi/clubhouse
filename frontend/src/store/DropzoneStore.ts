import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import { addEntries, EntryType, getEntryType } from '../helpers/Requests';

type UploadStatus = 'initial' | 'success' | 'failed' | 'loading';

export interface DropzoneFile {
    id: string;
    userName: string;
    fileName: string;
    file: File;
    entryType: EntryType;
    isOriginalSample: boolean;
}

export class DropzoneStore {
    isDragging = false;
    dragCounter = 0;
    files: DropzoneFile[] = [];
    challengeId = '';
    uploadStatus: UploadStatus = 'initial';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    handleDrag = (e: any): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDragIn = (e: any): void => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.isDragging = true;
        }
    };

    handleDragOut = (e: any): void => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter === 0) {
            this.isDragging = false;
        }
    };

    handleDrop = (e: any): void => {
        e.preventDefault();
        e.stopPropagation();
        this.isDragging = false;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    };

    handleFiles = (files: File[]): void => {
        const fileList = this.files;

        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return;
            const currentTime = new Date().getMilliseconds();
            fileList.push({
                id: files[i].name + ' - ' + currentTime,
                file: files[i],
                userName: '',
                fileName: files[i].name,
                entryType: getEntryType(files[i].type),
                isOriginalSample: false,
            });
        }
        this.files = fileList;
    };

    handleFileUpload = (): void => {
        this.uploadStatus = 'loading';
        addEntries(this.rootStore.dropzoneStore.challengeId, this.files, this.rootStore.securityStore.securityToken)
            .then(() => {
                this.uploadStatus = 'success';
                this.clearFiles();
            })
            .catch(() => (this.uploadStatus = 'failed'));
    };

    changeUserOfFile = (id: string, fileName: string, userName: string): void => {
        this.files[this.files.findIndex((file) => file.fileName === fileName)].userName = userName;
    };

    setChallengeId = (id: string): void => {
        this.challengeId = id;
    };

    removeFromList = (dropzoneFile: DropzoneFile): void => {
        const fileIndex = this.files.findIndex((file) => file.id === dropzoneFile.id);
        this.files.splice(fileIndex, 1);
    };

    clearFiles = (): void => {
        this.files = [];
    };

    changeOriginalSampleFile(dropzoneFile: DropzoneFile, checked: boolean) {
        dropzoneFile.isOriginalSample = checked;
    }
}
