import { Form, Input, message, Upload, UploadFile } from 'antd';
import { FormLabel } from './form-ui';
import { NationalTestCreatorState } from '@/lib/slices/national-test-creator.slice';
import { ToeicTestCreatorState } from '@/lib/slices/toeic-test-creator.slice';
import type { TestType } from '@/lib/hooks/use-test-field';
import { InboxOutlined } from '@ant-design/icons';

export interface TestQuestionProps<T extends TestType> {
    getField: <
        K extends keyof (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState),
    >(
        field: K,
    ) => (T extends 'national'
        ? NationalTestCreatorState
        : ToeicTestCreatorState)[K];

    setField: <
        K extends keyof (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState),
    >(
        field: K,
        value: (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState)[K],
    ) => void;
}

export const TestQuestionTitle = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const title = getField('title');
    return (
        <Form.Item
            label={<FormLabel label="Tên đề" />}
            initialValue={title}
            name="title"
            rules={[
                {
                    required: true,
                    message: 'Tên đề không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập tên đề"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                variant="filled"
                value={title}
                onChange={(e) => setField('title', e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionStartDate = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const startDate = getField('startDate');
    return (
        <Form.Item
            label={<FormLabel label="Ngày bắt đầu" />}
            initialValue={startDate}
            name="startDate"
            rules={[
                {
                    required: true,
                    message: 'Ngày bắt đầu không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập ngày bắt đầu (YYYY-MM-DD)"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                variant="filled"
                type="date"
                value={startDate}
                onChange={(e) => setField('startDate', e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionEndDate = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const endDate = getField('endDate');

    return (
        <Form.Item
            label={<FormLabel label="Ngày kết thúc" />}
            initialValue={endDate}
            name="endDate"
            rules={[
                {
                    required: true,
                    message: 'Ngày kết thúc không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập ngày kết thúc (YYYY-MM-DD)"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                variant="filled"
                type="date"
                value={endDate}
                onChange={(e) => setField('endDate', e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionTotalQuestions = <T extends 'national'>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const totalQuestions = getField('totalQuestions');
    return (
        <Form.Item
            label={<FormLabel label="Số lượng câu hỏi" />}
            name="totalQuestions"
            rules={[
                {
                    required: true,
                    message: 'Số lượng câu hỏi không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập số lượng câu hỏi"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                value={totalQuestions}
                variant="filled"
                type="number"
                min={1}
                max={100}
                onChange={(e) => setField('totalQuestions', +e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionDuration = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const duration = getField('duration');
    return (
        <Form.Item
            label={<FormLabel label="Thời gian làm bài" />}
            name="duration"
            rules={[
                {
                    required: true,
                    message: 'Thời gian làm bài không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập thời gian làm bài (phút)"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                value={duration}
                variant="filled"
                type="number"
                min={1}
                onChange={(e) => setField('duration', +e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionAudio = <T extends 'toeic'>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const audioUrl = getField('audioUrl');

    const mimeToExt = (mime: string): string => {
        const map: Record<string, string> = {
            'audio/mpeg': 'mp3',
            'audio/wav': 'wav',
            'audio/ogg': 'ogg',
            'audio/mp4': 'mp4',
        };
        return map[mime] || 'mp3';
    };

    function base64ToFile(base64: string): File {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'audio/mpeg';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        const ext = mimeToExt(mime);
        return new File([u8arr], `audio.${ext}`, { type: mime });
    }

    const handleBeforeUpload = (file: File) => {
        const isAudio = file.type.startsWith('audio/');
        if (!isAudio) {
            message.error('Chỉ cho phép file âm thanh');
            return Upload.LIST_IGNORE;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const audioFileUrl = reader.result as string;
            setField('audioUrl', audioFileUrl);
        };
        reader.readAsDataURL(file);

        return false;
    };

    const fileList: UploadFile[] = audioUrl
        ? [
              {
                  uid: '-1',
                  name: base64ToFile(audioUrl).name,
                  status: 'done',
                  url: URL.createObjectURL(base64ToFile(audioUrl)),
              },
          ]
        : [];

    return (
        <Form.Item
            label={<FormLabel label="Audio" />}
            name="audio"
            extra="Chọn file âm thanh cho phần thi Listening (Part 1, Part 2, Part 3, Part 4)"
            rules={[
                {
                    required: true,
                    message: 'Audio không được bỏ trống',
                },
            ]}
        >
            <Upload.Dragger
                accept="audio/*"
                beforeUpload={handleBeforeUpload}
                fileList={fileList}
                onRemove={() => {
                    setField('audioUrl', '');
                }}
                maxCount={1}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Kéo thả hoặc bấm để chọn file âm thanh
                </p>
                <p className="ant-upload-hint">
                    Chỉ chấp nhận 1 file âm thanh (.mp3, .wav...)
                </p>
            </Upload.Dragger>
        </Form.Item>
    );
};
