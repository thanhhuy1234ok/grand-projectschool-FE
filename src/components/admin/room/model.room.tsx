
import { DebounceSelect } from "@/components/share/debouce.select";
import { createCohortAPI, createMajorAPI, createRoomAPI, getCampusAPI, getFloorAPI, getListBuildingByCampusAPI, getRolesAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProForm, ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";
import { useState } from "react";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IRoom | null) => void;
    dataUpdate: IRoom | null;
}

const ModalRoom = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();
    const [campus, setCampus] = useState<IOptionSelect | null>(null);
    const [building, setBuilding] = useState<IOptionSelect | null>(null);
    const [floor, setFloor] = useState<IOptionSelect | null>(null);


    const submitRoom = async (valuesForm: any) => {
        const { name, capacity, buildingID, floorId, status } = valuesForm;

        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const room = {
                name, capacity, buildingID, floorId, status
            };

            const res = await updateCohortAPI(+id, room);
            if (res.data) {
                message.success("Cập nhật room thành công");
                handleReset();
                refreshTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const room = {
                name, capacity, buildingID: Number(buildingID.value), floorID:Number(floorId.value), status
            };

            console.log(room);
            const res = await createRoomAPI(room);
            if (res.data) {
                message.success("Thêm mới room thành công");
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


    async function fetchCampusList(): Promise<IOptionSelect[]> {
        const res = await getCampusAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number,
                    key: item.id as string
                }
            })
            return temp;
        } else return [];
    }

    async function fetchBuildingList(): Promise<IOptionSelect[]> {
        const res = await getListBuildingByCampusAPI(`${campus?.value}&current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number
                }
            })
            return temp;
        } else return [];
    }

    async function fetchFloorList(): Promise<IOptionSelect[]> {
        console.log(building);
        const res = await getFloorAPI(`${building?.value}&current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number
                }
            })
            return temp;
        } else return [];
    }

    return (
        <>
            <ModalForm
                title={<>{dataUpdate?.id ? "Cập nhật Room" : "Tạo mới Room"}</>}
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
                onFinish={submitRoom}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên Phòng học"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="Tên Phòng học"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Sức chứa"
                            name="capacity"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Sức chứa"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="campusID"
                            label="Chọn cơ sở"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={campus as { label: React.ReactNode; value: string | number } | null}
                                value={campus as { label: React.ReactNode; value: string | number } | null}
                                placeholder="Chọn cơ sở"
                                fetchOptions={fetchCampusList}
                                // onChange={(newValue: any) => {
                                //     console.log(newValue)
                                //     if (newValue?.length === 0 || newValue?.length === 1) {
                                //         setCampus(newValue as IOptionSelect[]);
                                //         setBuilding(null); 
                                //     }
                                // }}
                                onChange={(newValue, _option) => {
                                    setCampus(newValue as IOptionSelect | null);
                                    setBuilding(null);
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="buildingID"
                            label="Chọn Tòa nhà"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={building}
                                value={building}
                                placeholder="Chọn Tòa nhà"
                                fetchOptions={fetchBuildingList}
                                onChange={(newValue, _option) => {
                                    setBuilding(newValue as IOptionSelect | null);
                                    setFloor(null);
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="floorId"
                            label="Chọn Tầng"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={floor}
                                value={floor}
                                placeholder="Chọn Tầng"
                                fetchOptions={fetchFloorList}
                                onChange={(newValue: any) => {
                                    console.log(newValue)
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setFloor(newValue as IOptionSelect);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>

                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormSelect
                            name="status"
                            label="Trạng Thái"
                            options={[
                                { label: 'Hoạt động', value: "Available" },
                                { label: 'Không hoạt động', value: "Occupied" },
                                { label: 'Chờ duyệt', value: "Under Maintenance" },
                            ]}
                            placeholder="Vui lòng chọn trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        />
                    </Col>
                </Row>
            </ModalForm >
        </>
    )
}

export default ModalRoom