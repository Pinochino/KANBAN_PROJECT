import { colors } from '@/constants/colors';
import { ToggleSupplier } from '@/modals';
import { FilterFilled } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import Table, { ColumnProps } from 'antd/es/table';
import React from 'react';
const { Title } = Typography;

const SupplierScreen = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const columns: ColumnProps<any>[] = [];

    return (
        <>
            <Table
                dataSource={[]}
                columns={columns}
                title={() => (
                    <div className="row">
                        <div className="col">
                            <Title level={5}>Suppliers</Title>
                        </div>
                        <div className="col text-right d-flex justify-content-end">
                            <Space>
                                <Button type='primary' onClick={() => setOpen(true)}>Add Supplier</Button>
                                <Button icon={<FilterFilled size={20} color={colors.gray600} />}>Filters</Button>
                                <Button>Download all</Button>
                            </Space>
                        </div>
                    </div>

                )}
            >
                SupplierScreen
            </Table>
            <ToggleSupplier visible={open} onClose={() => setOpen(false)} onAddNew={val => console.log(val)}/>
        </>
    );
};

export default SupplierScreen;
