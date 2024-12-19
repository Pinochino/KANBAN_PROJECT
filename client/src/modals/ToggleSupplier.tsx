import { colors } from '@/constants/colors';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Modal, Select, Typography } from 'antd';
import { User } from 'iconsax-react';
import React, { useRef } from 'react';

const { Title, Paragraph } = Typography;

interface AddSupplierProps {
    visible: boolean;
    onClose: () => void;
    onAddNew: (val: any) => void;
    supplier?: any;
}

const ToggleSupplier = (props: AddSupplierProps) => {
    const { visible, onAddNew, onClose, supplier } = props;

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isTaking, setTaking] = React.useState<boolean>();
    const [file, setFile] = React.useState<any>();

    const [form] = Form.useForm();
    const inputRef = React.useRef<any>(null);

    const showLoading = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const addNewSupplier = async (values: any) => {
        setIsLoading(true)

        const data: any = {}
        for (const i in values) {
            data[i] = values[i] ?? '';
        }


        data.price = values.price ? parseInt(values.price) : 0;
        data.isTaking = isTaking ? 1 : 0;

        console.log(data);

        try {
            console.log(values);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Add Supplier"
            okText="Add Supplier"
            cancelText="Discard"
            loading={isLoading}
            open={visible}
            onClose={handleClose}
            onCancel={handleClose}
            onOk={() => form.submit()}
        >
            <div className="form-group d-flex justify-content-center align-items-center">
                <label htmlFor="inpFile" className="p-2 mb-3 ">
                    {file ? (
                        <Avatar size={100} src={URL.createObjectURL(file)} />
                    ) : (
                        <Avatar size={100}>
                            <User size={80} />
                        </Avatar>
                    )}
                </label>
                <div style={{ marginLeft: '1rem' }}>
                    <Paragraph className="text-muted m-0">Drag image here</Paragraph>
                    <Paragraph className="text-muted">Or</Paragraph>
                    <Button type="link" onClick={() => inputRef.current.click()}>
                        Browse image
                    </Button>
                </div>
            </div>

            <Form
                onFinish={addNewSupplier}
                layout="horizontal"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="additional-name"
                size="large"
            >
                <Form.Item
                    name={'name'}
                    label="Supplier name"
                    rules={[
                        {
                            required: true,
                            message: 'Enter supplier name',
                        },
                    ]}
                >
                    <Input placeholder="Enter supplier name" allowClear />
                </Form.Item>
                <Form.Item name={'product'} label="Product">
                    <Input placeholder="Enter product" allowClear />
                </Form.Item>
                <Form.Item name={'categories'} label="Category">
                    <Select options={[]} placeholder="Select product category" />
                </Form.Item>
                <Form.Item name={'price'} label="Buying Price">
                    <Input placeholder="Enter buying price" allowClear type="number" />
                </Form.Item>
                <Form.Item name={'contact'} label="Contact Number">
                    <Input placeholder="Enter supplier contact number" allowClear type="number" />
                </Form.Item>
                <Form.Item label="Type" className="d-flex flex-direction-column">
                    <Button
                        type={isTaking === false ? 'primary' : 'default'}
                        className="mb-2"
                        onClick={() => setTaking(false)}
                    >
                        Not Taking return
                    </Button>
                    <Button type={isTaking ? 'primary' : 'default'} onClick={() => setTaking(true)}>
                        Taking return
                    </Button>
                </Form.Item>
            </Form>
            <div className="d-none">
                {' '}
                <input
                    type="file"
                    name=""
                    ref={inputRef}
                    id="inpFile"
                    accept="image/*"
                    onChange={(val: any) => setFile(val.target.files[0])}
                />
            </div>
        </Modal>
    );
};

export default ToggleSupplier;
