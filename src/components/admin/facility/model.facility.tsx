
import { DebounceSelect } from "@/components/share/debouce.select";
import { createCampusAPI, createCohortAPI, createFacilityAPI, getCategoryFacilityAPI, getMajorAPI, getStatusFacilityAPI, getSupplierAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProForm, ProFormDatePicker, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";
import { useState } from "react";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IFacility | null) => void;
    dataUpdate: IFacility | null;
}

const ModalFacility = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();
    const [category, setCategory] = useState<IOptionSelect[]>([]);
    const [status, setStatus] = useState<IOptionSelect[]>([]);
    const [supplier, setSupplier] = useState<IOptionSelect[]>([]);

    const submitFacility = async (valuesForm: any) => {
        const { name, price, quantity, category, status, contractDate, supplier } = valuesForm;
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const facility = {
                name,
            };

            // const res = await updateCohortAPI(+id, cohort);
            // if (res.data) {
            //     message.success("Cập nhật Facility thành công");
            //     handleReset();
            //     refreshTable();
            // } else {
            //     notification.error({
            //         message: 'Có lỗi xảy ra',
            //         description: res.message
            //     });
            // }
        } else {
            //create
            const facility = {
                name, price, quantity, category_id: category.value, status_id:status.value, contractDate , supplier_id: supplier.value
            };
            const res = await createFacilityAPI(facility);
            if (res.data) {
                message.success("Thêm mới Facility thành công");
                handleReset();
                refreshTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }
    const handleReset = () => {
        form.resetFields();
        setDataUpdate(null);
        setOpenModal(false);

    }

        async function fetchCategoryList(): Promise<IOptionSelect[]> {
            const res = await getCategoryFacilityAPI(`current=1&pageSize=100`);
            if (res && res.data) {
                const list = res.data.result;
                const temp = list.map(item => {
                    return {
                        label: item.name as string,
                        value: item.id as number,
                        key: item.id as unknown as string
                    }
                })
                return temp;
            } else return [];
        }

    async function fetchStatusList(): Promise<IOptionSelect[]> {
        const res = await getStatusFacilityAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number,
                    key: item.id as unknown as string
                }
            })
            return temp;
        } else return [];
    }

    async function fetchSupplier(): Promise<IOptionSelect[]> {
        const res = await getSupplierAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number,
                    key: item.id as unknown as string
                }
            })
            return temp;
        } else return [];
    }

    return (
        <>
            <ModalForm
                title={<>{dataUpdate?.id ? "Cập nhật Facility" : "Tạo mới Facility"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataUpdate?.id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitFacility}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên thiết bị"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="Nhập tên cơ sở"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDatePicker
                            name="contractDate"
                            label="Contract Date"
                            disabled={dataUpdate?.id ? true : false}
                            placeholder="Select Date"
                            width="lg"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="status"
                            label="Trạng thái thiết bị"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={status}
                                value={status}
                                placeholder="Chọn Trạng thái thiết bị"
                                fetchOptions={fetchStatusList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setStatus(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="category"
                            label="Loại thiết bị"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={category}
                                value={category}
                                placeholder="Chọn Loại thiết bị"
                                fetchOptions={fetchCategoryList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setCategory(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số lượng thiết bị"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập số lượng thiết bị"
                            min={1}
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Giá tiền"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập giá tiền"
                            min={0}
                            fieldProps={{
                                addonAfter: 'VNĐ',
                                formatter: (value) =>
                                    value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '',
                                parser: (value) => value ? parseFloat(value.replace(/VNĐ\s?|(,*)/g, '')) : 0,
                            }}
                        />
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ProForm.Item
                            name="supplier"
                            label="Nhà cung cấp"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={supplier}
                                value={supplier}
                                placeholder="Chọn nhà cung cấp thiểt bị"
                                fetchOptions={fetchSupplier}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setSupplier(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                </Row>
            </ModalForm >
        </>
    )
}

export default ModalFacility