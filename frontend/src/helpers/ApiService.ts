import { IPreviousEvent } from '../store/PreviousEventsStore';
import { IEvent } from '../store/NextEventStore';
import { DropzoneFile } from '../store/DropzoneStore';

interface FileUploadRequest {
    userId?: string;
    fileContent: string;
    fileName: string;
    fileType: string;
}

const getRequest = (url: string): Promise<any> => {
    return fetch(url).then(handleRequest);
};

const postRequest = (url: string, body: string): Promise<any> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };

    return fetch(url, requestOptions).then(handleRequest);
};

const handleRequest = (response: Response): Promise<any> => {
    return response.json().catch((res) => {
        throw new Error('Request failed. ' + res);
    });
};

export const getPreviousEvents = (): Promise<IPreviousEvent> => {
    return getRequest('/api/files/list');
};

export const getNextEvents = (): Promise<IEvent[]> => {
    return getRequest('/api/calendar/next');
};

export const uploadFiles = async (challengeId: string, files: DropzoneFile[], securityToken: string): Promise<any> => {
    const fileUploadRequests: FileUploadRequest[] = [];
    for (const file of files) {
        const fileContent = await readFile(file.file);
        const fileRequest: FileUploadRequest = {
            userId: file.userId,
            fileName: file.file.name,
            fileType: file.file.type,
            fileContent: fileContent,
        };
        fileUploadRequests.push(fileRequest);
    }
    if (!challengeId || !securityToken || files.length === 0) {
        throw Error();
    }

    return postRequest(
        '/api/files/upload/' + challengeId + '?securityToken=' + securityToken,
        JSON.stringify(fileUploadRequests),
    ).catch((error) => {
        throw Error();
    });
};

const readFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let base64String = '';
        reader.onloadend = async () => {
            base64String = (reader.result! as string).replace('data:', '').replace(/^.+,/, '');
            resolve(base64String);
        };
    });
};
