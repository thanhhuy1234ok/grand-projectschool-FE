
import { createCampusAPI, createCohortAPI, getMajorAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: ICampus | null) => void;
    dataUpdate: ICampus | null;
}

const ModalCampus = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();



    const submitCampus = async (valuesForm: any) => {
        const { name, location } = valuesForm;
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const campus = {
                name, location
            };

            // const res = await updateCohortAPI(+id, cohort);
            // if (res.data) {
            //     message.success("Cập nhật Campus thành công");
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
            const campus = {
                name, location
            };
            const res = await createCampusAPI(campus);
            if (res.data) {
                message.success("Thêm mới Campus thành công");
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
                title={<>{dataUpdate?.id ? "Cập nhật Campus" : "Tạo mới Campus"}</>}
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
                onFinish={submitCampus}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên cơ sở"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="Nhập tên cơ sở"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Vị trí cơ sở"
                            name="location"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập vị trí cơ sở"
                        />
                    </Col>

                </Row>
            </ModalForm >
        </>
    )
}

export default ModalCampus