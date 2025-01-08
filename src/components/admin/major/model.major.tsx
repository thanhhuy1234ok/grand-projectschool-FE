
import { createCohortAPI, createMajorAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IMajor | null) => void;
    dataUpdate: IMajor | null;
}

const ModalMajor = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();



    const submitCohort = async (valuesForm: any) => {
        const { name, code } = valuesForm;
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const major = {
                name, code
            };

            const res = await updateCohortAPI(+id, major);
            if (res.data) {
                message.success("Cập nhật major thành công");
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
            const major = {
                name, code
            };
            const res = await createMajorAPI(major);
            if (res.data) {
                message.success("Thêm mới major thành công");
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
                title={<>{dataUpdate?.id ? "Cập nhật Major" : "Tạo mới Major"}</>}
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
                            label="Tên chuyên ngành"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="Tên chuyên ngành"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Mã chuyên ngành"
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Mã chuyên ngành"
                        />
                    </Col>

                </Row>
            </ModalForm >
        </>
    )
}

export default ModalMajor