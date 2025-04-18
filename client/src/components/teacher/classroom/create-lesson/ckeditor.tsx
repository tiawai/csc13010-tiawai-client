'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from 'react';

interface CkEditorProps {
    value: string;
    onChange: (data: string) => void;
}

const CkEditor: React.FC<CkEditorProps> = ({ value, onChange }) => {
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
        .ck-editor__editable_inline {
        min-height: 300px !important;
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
                licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY,
            }}
            onChange={(_, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    );
};

export default CkEditor;
