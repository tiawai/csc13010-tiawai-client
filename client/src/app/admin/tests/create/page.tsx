'use client';
import { useState, useMemo } from 'react';
import { FormNavigation, PageTitle } from '@/components/test/page-ui';
import { FormNational } from '@/components/test/form-national';
import { FormToeicListening } from '@/components/test/form-toeic-listening';
import { FormToeicReading } from '@/components/test/form-toeic-reading';
import { BoxBorder } from '@/components/common/box';
import { FormToeicExport } from '@/components/test/form-toeic-ui';

export default function AdminCreateTestPage() {
    const [form, setForm] = useState(0);
    const formMap = useMemo(
        () => [
            <FormToeicReading key="toeic-reading" />,
            <FormToeicListening key="toeic-listening" />,
            <FormNational key="national" />,
        ],
        [],
    );

    return (
        <div className="space-y-10 p-4">
            <PageTitle title="Tạo đề thủ công" />
            <BoxBorder className="flex h-full justify-between">
                <FormNavigation formIndex={form} onNavigate={setForm} />
            </BoxBorder>
            <BoxBorder>{formMap[form]}</BoxBorder>
            <FormToeicExport />
        </div>
    );
}
