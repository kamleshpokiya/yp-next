import Iconify from "@/components/Iconify";
import Image from "next/image";
import { useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

type FilePreview = {
    file: File;
    previewUrl: string;
}


const TeamAvatar = () => {
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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        maxFiles: 1,
    } as DropzoneOptions);

    const filePreview = filePreviews.length ? filePreviews[filePreviews.length - 1] : null;

    return (
        <div className="col-md-4 left">
            <div className="team-logo">
                <div className="file-input">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <span className="label team-avatar-icon-wrapper">
                            {filePreview ? (
                                <div className="form__image-container js-remove-image">
                                    {filePreview.file.type.startsWith('image/') ? (
                                        <Image
                                            src={filePreview.previewUrl} alt={filePreview.file.name}
                                            className="form__image"
                                            width={110}
                                            height={110}
                                        />
                                    ) : (
                                        <Iconify
                                            icon="fa-solid:users"
                                            width={110}
                                            sx={{ color: '#BABABC', margin: '25px' }}
                                        />
                                    )}
                                </div>
                            ) : (
                                <Iconify
                                    icon="fa-solid:users"
                                    width={110}
                                    sx={{ color: '#BABABC' }}
                                />
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamAvatar;
