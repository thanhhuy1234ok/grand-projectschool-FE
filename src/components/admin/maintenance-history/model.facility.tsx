
import { DebounceSelect } from "@/components/share/debouce.select";
import { createCampusAPI, createCohortAPI, createFacilityAPI, createMaintenanceHistoryAPI, getCategoryFacilityAPI, getFacilityAPI, getMajorAPI, getRoomAPI, getStatusFacilityAPI, getSupplierAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProForm, ProFormDatePicker, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row, Select } from "antd";
import { useState } from "react";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IMaintenanceRequest | null) => void;
    dataUpdate: IMaintenanceRequest | null;
}

const statusOptions = [
    { label: 'Chờ xử lý', value: 'pending' },
    { label: 'Đang xử lý', value: 'in_progress' },
    { label: 'Hoàn thành', value: 'completed' },
    { label: 'Đã hủy', value: 'cancelled' },
];

const ModalMaintenance = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();
    const [category, setCategory] = useState<IOptionSelect[]>([]);
    const [status, setStatus] = useState<IOptionSelect[]>([]);
    const [supplier, setSupplier] = useState<IOptionSelect[]>([]);

    const [facility, setFacility] = useState<IOptionSelect[]>([]);
    const [room, setRoom] = useState<IOptionSelect[]>([]);

    const submitFacility = async (valuesForm: any) => {
        const { facility, notes ,quantity, maintenanceType ,status ,room } = valuesForm;
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
            const facilityData = {
                facility_id: facility.value, room_id: room.value, maintenance_type: maintenanceType, status, notes,quantity
            };
    
            const res = await createMaintenanceHistoryAPI(facilityData);
            if (res.data) {
                message.success("Thêm mới Maintenance History thành công");
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


    async function fetchFacility(): Promise<IOptionSelect[]> {
        const res = await getFacilityAPI(`current=1&pageSize=100`);
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
        async function fetchRoom(): Promise<IOptionSelect[]> {
            const res = await getRoomAPI(`current=1&pageSize=100`);
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
                        <ProForm.Item
                            name="facility"
                            label="Thiết bị hư"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={facility}
                                value={facility}
                                placeholder="Chọn Thiết bị hư"
                                fetchOptions={fetchFacility}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setFacility(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="room"
                            label="Phòng có thiết bị đang hư"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={room}
                                value={room}
                                placeholder="Chọn phòng"
                                fetchOptions={fetchRoom}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setRoom(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="status"
                            label="Trạng thái thiết bị"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái thiết bị!' }]}
                        >
                            <Select
                                allowClear
                                showSearch
                                placeholder="Chọn Trạng thái thiết bị"
                                options={statusOptions}
                                value={status}
                                onChange={(value) => setStatus(value)}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số lượng thiết bị hư"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập số lượng thiết bị hư"
                            min={1}
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Loại bảo trì"
                            name="maintenanceType"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="Loại bảo trì"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="notes tình trạng"
                            name="notes"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="notes tình trạng"
                        />
                    </Col>
                </Row>
            </ModalForm >
        </>
    )
}

export default ModalMaintenance