export const readFile = async (file: File): Promise<string> => {
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
