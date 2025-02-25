import React from 'react';

interface ImageUploadProps {
    fieldId: string;
    onChange: (fieldId: string, value: File) => void;
}

const ImageUpload = ({ fieldId, onChange }: ImageUploadProps) => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onChange(fieldId, file);
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