import React from 'react';

interface ImageUploadProps {
    fieldId: string;
    onChange: (fieldId: string, value: string) => void;
}

const ImageUpload = ({ fieldId, onChange }: ImageUploadProps) => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const localUrl = URL.createObjectURL(file);
        onChange(fieldId, localUrl);

        if (file) {
            console.log("File uploaded")
        } else {
            console.log("No file uploaded")
        }
    };

    return (
        <input
            id={`file-input-${fieldId}`}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
        />
    );
};

export default ImageUpload;