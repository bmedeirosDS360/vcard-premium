export const normalizeUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
};

export const getDirectImageUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        let id = null;
        if (url.includes('/file/d/')) {
            const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (match) id = match[1];
        } else if (url.includes('id=')) {
            const match = url.match(/id=([a-zA-Z0-9_-]+)/);
            if (match) id = match[1];
        }
        if (id) {
            return `https://drive.google.com/thumbnail?id=${id}&sz=s3000`;
        }
    }
    return url;
};

export const getVideoEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        let id = null;
        if (url.includes('/file/d/')) {
            const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (match) id = match[1];
        } else if (url.includes('id=')) {
            const match = url.match(/id=([a-zA-Z0-9_-]+)/);
            if (match) id = match[1];
        }
        if (id) return `https://drive.google.com/file/d/${id}/preview`;
    }
    return url;
};
