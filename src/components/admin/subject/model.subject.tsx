import { DebounceSelect } from "@/components/share/debouce.select";
import { createSubjectAPI } from "@/services/api";

import { ModalForm, ProForm, ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, Form, message, notification, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: ISubject | null) => void;
    dataUpdate: ISubject | null;
}
const ModalSubject = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    const submitSubject = async (valuesForm: any) => {
        const { code, name, type, credits, teacher } = valuesForm;

        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const subject = {
                code,
                name,
                type,
                credits: Number(credits),
                teacher: teacher.map((t: IOptionSelect) => t.value)
            };
            // const res = await callUpdateSubject(+id, subject);
            // if (res.data) {
            //     message.success("Cập nhật subject thành công");
            //     handleReset();
            //     reloadTable();
            // } else {
            //     notification.error({
            //         message: 'Có lỗi xảy ra',
            //         description: res.message
            //     });
            // }
        } else {
            //create
            const subject = {
                code,
                name,
                type,
                credits: Number(credits),
            };
            const res = await createSubjectAPI(subject);
            if (res.data) {
                message.success("Thêm mới Subject thành công");
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
    console.log(dataUpdate?.code);

    const handleReset = async () => {
        form.resetFields();
        setDataUpdate(null);
        setOpenModal(false);
    }
    return (
        <>
            <ModalForm
                title={<>{dataUpdate?.id ? "Cập nhật Subject" : "Tạo mới Subject"}</>}
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
                onFinish={submitSubject}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            disabled={dataUpdate?.id ? true : false}
                            label="Mã môn học"
                            name="code"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Mã môn học"

                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên môn học"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Tên môn học"
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormSelect
                            label="Chọn loại môn học"
                            name="type"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Chọn loại môn học"
                            options={[
                                { label: 'Lý thuyết', value: 'Lý thuyết' },
                                { label: 'Thực hành', value: 'Thực hành' },
                            ]}
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số tín chỉ"
                            name="credits"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            min={1}
                            max={6}
                            placeholder="Nhập số tín chỉ"
                        />
                    </Col>

                </Row>
            </ModalForm>
        </>
    )
}

export default ModalSubject