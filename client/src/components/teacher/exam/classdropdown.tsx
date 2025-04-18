// @/components/teacher/exam/classdropdown.tsx
'use client';
import { Select, Spin } from 'antd';
import { Classroom } from '@/types/classroom.type';

interface ClassDropdownProps {
    classrooms: Classroom[];
    onSelect: (classId: string | undefined) => void;
    loading: boolean;
}

const ClassDropdown: React.FC<ClassDropdownProps> = ({
    classrooms,
    onSelect,
    loading,
}) => {
    return (
        <div className="mb-8 w-52 overflow-hidden rounded-full border-2 border-black shadow-md">
            <Select
                placeholder="Chọn lớp học"
                onChange={(value) => onSelect(value || undefined)}
                loading={loading}
                className="w-full !text-black"
                allowClear
            >
                <Select.Option key="all" value="">
                    Tất cả
                </Select.Option>
                {classrooms.map((classroom) => (
                    <Select.Option key={classroom.id} value={classroom.id}>
                        {classroom.className}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default ClassDropdown;
