
import { createCohortAPI, createMajorAPI, createRoomAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";

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



    const submitCohort = async (valuesForm: any) => {
        const { name, capacity } = valuesForm;

        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const room = {
                name, capacity
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
                name, capacity
            };
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
                onFinish={submitCohort}
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

                </Row>
            </ModalForm >
        </>
    )
}

export default ModalRoom