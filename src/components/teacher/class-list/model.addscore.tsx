
import { createCohortAPI, createMajorAPI, createRoomAPI, updateCohortAPI, updateScoreStudentAPI } from "@/services/api";
import { ModalForm, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IUserTable | null) => void;
    dataUpdate: IUserTable | null;
}

const ModalAddScore = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();
    const targetScore = dataUpdate?.scores?.find(score => score.id);

    const submitCohort = async (valuesForm: any) => {
        const { midtermScore, finalScore } = valuesForm;

        if (targetScore?.id) {
            let id = targetScore.id
            //update
            const data = {
                midtermScore, finalScore
            };
            const res = await updateScoreStudentAPI(+id, data);
            if (res.data) {
                message.success("Cập nhật điểm thành công");
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
                title={<>{dataUpdate?.id ? "Cập nhật điểm sinh viên" : "Tạo mới Room"}</>}
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
                            label="Mã số sinh viên"
                            name="id"
                            disabled={dataUpdate?.id ? true : false}
                            rules={[{ required: dataUpdate?.id ? false : true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Tên Phòng học"
                        />

                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên sinh viên"
                            name="name"
                            disabled={dataUpdate?.id ? true : false}
                            initialValue={dataUpdate?.name}
                            placeholder="Tên Phòng học"
                        />
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormDigit
                            label="Điểm chuyên cần"
                            name='attendanceScore'
                            min={0}
                            max={10}
                            disabled={true}
                            initialValue={targetScore?.attendanceScore}
                            placeholder="Điểm chuyên cần"
                            rules={[{ required: dataUpdate?.id ? false : true, message: 'Vui lòng không bỏ trống' }]}
                            fieldProps={{
                                step: 0.1,
                                precision: 1,
                            }}
                        />
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormDigit
                            label="Điểm giữa kỳ"
                            name="midtermScore"
                            initialValue={targetScore?.midtermScore}
                            min={0}
                            max={10}
                            placeholder="Điểm giữa kỳ"
                            fieldProps={{
                                step: 0.1,
                                precision: 1,
                            }}
                        />
                    </Col>

                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormDigit
                            label="Điểm cuối kỳ"
                            name="finalScore"
                            initialValue={targetScore?.finalScore}
                            min={0}
                            max={10}
                            placeholder="Điểm cuối kỳ"
                            fieldProps={{
                                step: 0.1,
                                precision: 1,
                            }}
                        />
                    </Col>

                </Row>
            </ModalForm >
        </>
    )
}

export default ModalAddScore