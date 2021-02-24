import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';
import { uploadFiles } from '../helpers/ApiService';

type UploadStatus = 'initial' | 'success' | 'failed';

export interface DropzoneFile {
    id: string;
    userId: string;
    fileName: string;
    fileType: string;
    file: File;
}

export class DropzoneStore {
    isDragging = false;
    dragCounter = 0;
    files: DropzoneFile[] = [];
    challengeId = '';
    uploadStatus: UploadStatus = 'initial';

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            isDragging: observable,
            dragCounter: observable,
            files: observable,
            challengeId: observable,
            uploadStatus: observable,

            handleDrag: action,
            handleDragIn: action,
            handleDragOut: action,
            handleDrop: action,
            handleFileUpload: action,
            changeUserIdOfFile: action,
            setChallengeId: action,
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

    handleFiles = (files: File[]) => {
        const fileList = this.files;
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return;
            const currentTime = new Date().getMilliseconds();
            fileList.push({
                id: files[i].name + ' - ' + currentTime,
                file: files[i],
                userId: '',
                fileName: files[i].name,
                fileType: files[i].type,
            });
        }
        this.files = fileList;
    };

    handleFileUpload = (): void => {
        uploadFiles(this.rootStore.dropzoneStore.challengeId, this.files, this.rootStore.securityStore.securityToken)
            .then(() => (this.uploadStatus = 'success'))
            .catch(() => (this.uploadStatus = 'failed'));
    };

    changeUserIdOfFile = (id: string, fileName: string, userId: string): void => {
        this.files[this.files.findIndex((file) => file.fileName === fileName)].userId = userId;
    };

    setChallengeId = (id: string): void => {
        this.challengeId = id;
    };
}
