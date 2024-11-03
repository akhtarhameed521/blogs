import cloudinary from "./cloudinary";

export const UploadImage = async (file: File, folder: string): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const byte = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: folder
            },
            (err: any, result: any) => {
                if (err) {
                    return reject(err.message);
                }
                resolve(result.secure_url);  // Only return the secure URL
            }
        ).end(byte);
    });
};
