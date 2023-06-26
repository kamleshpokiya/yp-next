// packages
import Image from 'next/image';
import { useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
// images
import IMAGES from '@/assets/images';
// components
import Iconify from '@/components/Iconify';
// store
import { getAccountAvatar } from '@/store/selectors/account';


// types
type FilePreview = {
    file: File;
    previewUrl: string;
}

type TeamAvatarProps = {
    isDefaultAvatarImage?: boolean
};

// team avatar component
const TeamAvatar = ({ isDefaultAvatarImage }: TeamAvatarProps) => {
    const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
    const defaultAvatar = useSelector(getAccountAvatar);
    const { boyAvatar } = IMAGES;

    // handle add and preview image
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
                            ) : isDefaultAvatarImage ? (
                                <Image
                                    src={defaultAvatar ?? boyAvatar.src} alt={boyAvatar.alt}
                                    className="form__image"
                                    width={110}
                                    height={110}
                                />
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
