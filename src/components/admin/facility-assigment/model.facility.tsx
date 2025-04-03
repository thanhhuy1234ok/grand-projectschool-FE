
import { DebounceSelect } from "@/components/share/debouce.select";
import { createCampusAPI, createCohortAPI, createFacilityAPI, createFacilityAssignmentAPI, getCategoryFacilityAPI, getFacilityAPI, getMajorAPI, getRoomAPI, getStatusFacilityAPI, getSupplierAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProForm, ProFormDatePicker, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";
import { useState } from "react";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IAssignment | null) => void;
    dataUpdate: IAssignment | null;
}

const ModalAssignment = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();
    const [facility, setFacility] = useState<IOptionSelect[]>([]);
    const [room, setRoom] = useState<IOptionSelect[]>([]);

    const submitFacility = async (valuesForm: any) => {
        const { 
             quantity, facility, room } = valuesForm;
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const facility = {
                name,
            };

            // const res = await updateCohortAPI(+id, cohort);
            // if (res.data) {
            //     message.success("Cập nhật Facility Assigment thành công");
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
                quantity:Number(quantity), facility_id: facility.value, room_id: room.value
            };
            const res = await createFacilityAssignmentAPI(facilityData);
            if (res.data) {
                message.success("Thêm mới Facility Assigment thành công");
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
                title={<>{dataUpdate?.id ? "Cập nhật Facility Assigment" : "Tạo mới Facility Assigment"}</>}
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
                            label="Tên thiết bị"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={facility}
                                value={facility}
                                placeholder="Chọn Tên thiết bị"
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
                            label="Phòng"
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
                        <ProFormDigit
                            label="Số lượng thiết bị"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập số lượng thiết bị"
                            min={1}
                        />
                    </Col>
                </Row>
            </ModalForm >
        </>
    )
}

export default ModalAssignment