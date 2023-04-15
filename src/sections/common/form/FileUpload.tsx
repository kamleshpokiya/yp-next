import Image from 'next/image';
import { useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

type FilePreview = {
    file: File;
    previewUrl: string;
}

const FileUpload = () => {
    const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);

    const handleDrop = async (acceptedFiles: File[]) => {
        const newPreviews = await Promise.all(
            acceptedFiles.map(async (file) => ({
                file,
                previewUrl: URL.createObjectURL(file),
            })),
        );
        setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const handleRemove = (index: number) => {
        setFilePreviews((prevPreviews) =>
            prevPreviews.filter((_, i) => i !== index),
        );
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
    } as DropzoneOptions);

    return (
        <div className="account-box">
            <div className="input-main-box">
                <div className="forms">
                    <label htmlFor="inputDate">Upload document</label>

                    <div {...getRootProps()} className="form__container">
                        Choose or Drag &amp; Drop Files
                        <input {...getInputProps()} />
                    </div>

                    <div className="form__files-container" id="files-list-container">
                        {filePreviews.map(({ file, previewUrl }, index) => (
                            <div key={file.name} className="form__image-container js-remove-image" onClick={() => handleRemove(index)}>
                                {file.type.startsWith('image/') ? (
                                    <Image src={previewUrl} alt={file.name} className="form__image" />
                                ) : (
                                    <div className="file-icon form__image" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
