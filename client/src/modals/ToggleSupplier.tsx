import handleAPI from '@/apis/handleApi';
import { SupplierModel } from '@/models/SupplierMode';
import { replaceName } from '@/utils/replaceName';
import uploadFile from '@/utils/uploadFile';
import { Avatar, Button, Form, Input, message, Modal, Select, Typography } from 'antd';
import { User } from 'iconsax-react';
import React from 'react';
import { data } from 'react-router-dom';

const { Paragraph } = Typography;

interface AddSupplierProps {
    visible: boolean;
    onClose: () => void;
    onAddNew: (val: any) => void;
    supplier?: SupplierModel;
}

const ToggleSupplier = (props: AddSupplierProps) => {
    const { visible, onAddNew, onClose, supplier } = props;

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isTaking, setTaking] = React.useState<boolean>();
    const [file, setFile] = React.useState<any>();

    const [form] = Form.useForm();
    const inputRef = React.useRef<any>(null);
    const api: string = `/supplier/add-new`;


    const addNewSupplier = async (values: any) => {
        console.log(values);
        setIsLoading(true)

        const data: any = {
            name: values.name || '',
            product: values.product || '', // ensure empty string if no product
            categories: values.categories || '', // ensure empty string if no categories
            price: values.price ? parseInt(values.price) : 0, // Default to 0 if no price
            contact: values.contact || '', // Default to empty if no contact
            isTaking: isTaking ? 1 : 0, // convert boolean to 1/0
            slug: replaceName(values.name), // Generate a slug from name
            photoUrl: values.photoUrl
        };

        console.log(data); // Debugging the data object

        // for (const i in values) {
        //     data[i] = values[i] ?? '';
        // }


        // data.price = values.price ? parseInt(values.price) : 0;
        // data.isTaking = isTaking ? 1 : 0;

        console.log(data);
        if (file) {
            data.photoUrl = await uploadFile(file);
        }
        console.log(data.photoUrl);

        data.slug = replaceName(values.name);
        try {
            const res: any = await handleAPI(api, data, 'post');
            message.success(res.message);
            onAddNew(res.data);
            handleClose();
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
            closable={!isLoading}
            okButtonProps={{
                loading: isLoading
            }}
            title="Add Supplier"
            okText="Add Supplier"
            cancelText="Discard"
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
                        <Avatar size={100} >
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
                disabled={isLoading}
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
                        size='middle'
                        type={isTaking === false ? 'primary' : 'default'}
                        className="mb-2"
                        onClick={() => setTaking(false)}
                    >
                        Not Taking return
                    </Button>
                    <Button
                        size='middle'
                        type={isTaking ? 'primary' : 'default'} onClick={() => setTaking(true)}>
                        Taking return
                    </Button>
                </Form.Item>
                <div className="">
                    {' '}
                    <input
                        type="file"
                        name="photoUrl"
                        ref={inputRef}
                        id="inpFile"
                        accept="image/*"
                        onChange={(val: any) => setFile(val.target.files[0])}
                    />
                </div>
            </Form>
        </Modal>
    );
};

export default ToggleSupplier;
