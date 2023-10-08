interface LocalFile {
    /** File name with extension. */
    name: string;
    /** Document size in bytes. */
    size?: number;
    mimetype?: string;
    buffer?: ArrayBuffer;
}

export type { LocalFile };
