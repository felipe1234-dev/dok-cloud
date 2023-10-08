import { Platform } from "react-native";
import { getDocumentAsync, DocumentPickerOptions } from "expo-document-picker";
import { Buffer } from "buffer";
import { LocalFileSystem } from "./LocalFileSystem";
import { LocalFile } from "@types";

/** Wrapper for DocumentPicker */
async function loadLocalFile(
    options: DocumentPickerOptions
): Promise<LocalFile[]> {
    const result = await getDocumentAsync(options);
    if (result.canceled) return [];

    const files: LocalFile[] = [];

    if (Platform.OS === "web" && result.output) {
        const promises: Promise<LocalFile>[] = [];

        for (const file of result.output) {
            const promise: Promise<LocalFile> = new Promise<LocalFile>(
                async (resolve) => {
                    resolve({
                        name: file.name,
                        mimetype: file.type,
                        size: file.size,
                        buffer: await file.arrayBuffer().catch(() => undefined),
                    });
                }
            );

            promises.push(promise);
        }

        const filesToPush = await Promise.all(promises);
        files.push(...filesToPush);
    } else if (result.assets) {
        const promises: Promise<LocalFile>[] = [];

        for (const asset of result.assets) {
            const promise: Promise<LocalFile> = new Promise<LocalFile>(
                async (resolve) => {
                    resolve({
                        name: asset.name,
                        mimetype: asset.mimeType,
                        size: asset.size,
                        buffer: await LocalFileSystem.readAsStringAsync(
                            asset.uri,
                            { encoding: LocalFileSystem.EncodingType.Base64 }
                        )
                            .then((fileContent) =>
                                Buffer.from(fileContent, "base64")
                            )
                            .catch(() => undefined),
                    });
                }
            );

            promises.push(promise);
        }

        const filesToPush = await Promise.all(promises);
        files.push(...filesToPush);
    }

    return files;
}

export { loadLocalFile };
