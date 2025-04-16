import { DebounceSelect } from "@/components/share/debouce.select";
import {
    createRoomAPI,
    createRoomBulkFacilityAPI,
    getCampusAPI,
    getFacilityAPI,
    getFloorAPI,
    getListBuildingByCampusAPI,
    updateCohortAPI,
} from "@/services/api";
import {
    ModalForm,
    ProForm,
    ProFormDigit,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Button, Col, Form, message, notification, Row } from "antd";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import  "@/styles/modal-room.scss"
import { set } from "lodash";
interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IRoom | null) => void;
    dataUpdate: IRoom | null;
}

const ModalRoomFacility = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();
    const [campus, setCampus] = useState<IOptionSelect | null>(null);
    const [building, setBuilding] = useState<IOptionSelect | null>(null);
    const [floor, setFloor] = useState<IOptionSelect | null>(null);
    const [facility, setFacility] = useState<IOptionSelect[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addEquipmentRef = useRef<() => void>();
    const submitRoom = async (valuesForm: any) => {
        setIsLoading(true);
        const { name, capacity, buildingID, floorId, status, equipments } = valuesForm;

        const room = {
            name,
            capacity,
            buildingID: Number(buildingID.value),
            floorID: Number(floorId.value),
            status,
            equipments: equipments?.map((e: any) => ({
                facilityID: e.facility?.value,   
                quantity: Number(e.quantity),     
            })) || [],
        };

        if (dataUpdate?.id) {
            const res = await updateCohortAPI(+dataUpdate.id, room);
            if (res.data) {
                message.success("Cập nhật room thành công");
                setIsLoading(false);
                handleReset();
                refreshTable();
            } else {
                setIsLoading(false);
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            const res = await createRoomBulkFacilityAPI(room);
            if (res.data) {
                message.success("Thêm mới room thành công");
                setIsLoading(false);
                handleReset();
                refreshTable();
            } else {
                setIsLoading(false);
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    };

    const handleReset = () => {
        form.resetFields();
        setDataUpdate(null);
        setOpenModal(false);
    };

    async function fetchCampusList(): Promise<IOptionSelect[]> {
        const res = await getCampusAPI(`current=1&pageSize=100`);
        if (res?.data) {
            return res.data.result.map((item: any) => ({
                label: item.name,
                value: item.id,
                key: item.id,
            }));
        }
        return [];
    }

    async function fetchBuildingList(): Promise<IOptionSelect[]> {
        const res = await getListBuildingByCampusAPI(`${campus?.value}&current=1&pageSize=100`);
        if (res?.data) {
            return res.data.result.map((item: any) => ({
                label: item.name,
                value: item.id,
            }));
        }
        return [];
    }

    async function fetchFloorList(): Promise<IOptionSelect[]> {
        const res = await getFloorAPI(`${building?.value}&current=1&pageSize=100`);
        if (res?.data) {
            return res.data.result.map((item: any) => ({
                label: item.name,
                value: item.id,
            }));
        }
        return [];
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

    return (
        <ModalForm
            title={<>{dataUpdate?.id ? "Cập nhật Room" : "Tạo mới Room"}</>}
            open={openModal}
            modalProps={{
                onCancel: handleReset,
                afterClose: handleReset,
                destroyOnClose: true,
                width: isMobile ? "100%" : 900,
                keyboard: false,
                maskClosable: false,
            }}
            submitter={{
                render: (props, doms) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button
                                type="button"
                                className="custom-btn cancel"
                                onClick={handleReset}
                            >
                                Hủy
                            </button>

                            <button
                                type="button"
                                className="custom-btn dashed"
                                onClick={() => addEquipmentRef.current?.()}
                            >
                                + Thêm thiết bị
                            </button>

                            <Button
                                loading={isLoading}
                                type="primary"
                                className="custom-btn primary"
                                onClick={() => props.form?.submit()}
                                
                            >
                                {dataUpdate?.id ? "Cập nhật" : "Tạo mới"}
                            </Button>
                        </div>
                    );
                }
            }}


            scrollToFirstError
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
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
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
                        rules={[{ required: true, message: 'Vui lòng chọn cơ sở!' }]}
                    >
                        <DebounceSelect
                            allowClear
                            showSearch
                            value={campus}
                            placeholder="Chọn cơ sở"
                            fetchOptions={fetchCampusList}
                            onChange={(newValue) => {
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
                        rules={[{ required: true, message: 'Vui lòng chọn tòa nhà!' }]}
                    >
                        <DebounceSelect
                            allowClear
                            showSearch
                            value={building}
                            placeholder="Chọn Tòa nhà"
                            fetchOptions={fetchBuildingList}
                            onChange={(newValue) => {
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
                        rules={[{ required: true, message: 'Vui lòng chọn tầng!' }]}
                    >
                        <DebounceSelect
                            allowClear
                            showSearch
                            value={floor}
                            placeholder="Chọn Tầng"
                            fetchOptions={fetchFloorList}
                            onChange={(newValue: any) => {
                                setFloor(newValue as IOptionSelect);
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

            {/* Thiết bị cơ sở vật chất */}
            <Form.List name="equipments">
                {(fields, { add, remove }) => {
                    addEquipmentRef.current = () => add(); // Gán ra ngoài để dùng ở footer

                    return (
                        <>
                            <Row gutter={8}>
                                <Col span={24}>
                                    <label style={{ fontWeight: 500, fontSize: 16 }}>Cơ sở vật chất</label>
                                </Col>

                                {fields.map(({ key, name, ...restField }) => (
                                    <Col span={24} key={key}>
                                        <Row gutter={8} align="middle" justify="space-between">
                                            <Col flex="auto">
                                                <ProForm.Item
                                                    name={[name, 'facility']}
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
                                            <Col flex="auto">
                                                <ProFormDigit
                                                    label="Số lượng thiết bị"
                                                    name={[name, 'quantity']}
                                                    rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                                    placeholder="Nhập số lượng thiết bị"
                                                    min={1}
                                                />
                                            </Col>
                                            <Col flex="none">
                                                <Button
                                                    danger
                                                    type="primary"
                                                    onClick={() => remove(name)}
                                                >
                                                    Xóa
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    );
                }}
            </Form.List>



        </ModalForm>
    );
};

export default ModalRoomFacility;
