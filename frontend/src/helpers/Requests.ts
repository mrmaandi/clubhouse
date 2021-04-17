import { DropzoneFile } from '../store/DropzoneStore';
import { IChallenge } from '../store/ChallengesStore';
import { readFile } from './FileUtil';
import { getRequest, postRequest } from './ApiService';
import { IUser } from '../store/UsersStore';
import { IEntry } from '../store/EntriesStore';

export type EntryType = 'ART' | 'MUSIC' | 'ORIGINAL_SAMPLE';

interface FileUploadRequest {
    userName: string;
    entryType: EntryType;
    fileName: string;
    fileContent: string;
}

export const getChallenges = (): Promise<IChallenge[]> => {
    return getRequest('/api/challenges');
};

export const getEntries = (): Promise<IEntry[]> => {
    return getRequest('/api/entries');
};

export const getUsers = (): Promise<IUser[]> => {
    return getRequest('/api/users');
};

export const addEntries = async (challengeId: string, files: DropzoneFile[], securityToken: string): Promise<any> => {
    const fileUploadRequests: FileUploadRequest[] = [];
    for (const file of files) {
        const fileContent = await readFile(file.file);
        const fileRequest: FileUploadRequest = {
            userName: file.userName,
            entryType: file.isOriginalSample ? 'ORIGINAL_SAMPLE' : file.entryType,
            fileName: file.file.name,
            fileContent: fileContent,
        };
        fileUploadRequests.push(fileRequest);
    }
    if (!challengeId || !securityToken || files.length === 0) {
        throw Error();
    }

    return postRequest(
        '/api/entries/' + challengeId + '/add-entries?securityToken=' + securityToken,
        JSON.stringify(fileUploadRequests),
    ).catch((error) => {
        console.error(error);
        throw Error();
    });
};

export const getEntryType = (fileType: string): EntryType => {
    if (fileType === 'image/jpeg' || fileType === 'image/png') {
        return 'ART';
    }
    return 'MUSIC';
};
