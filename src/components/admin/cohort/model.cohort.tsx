
import { createCohortAPI, getMajorAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: ICohort | null) => void;
    dataUpdate: ICohort | null;
}

const ModalCohort = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();



    const submitCohort = async (valuesForm: any) => {
        const { startYear, endYear } = valuesForm;
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const cohort = {
                startYear: Number(startYear),
                endYear: Number(endYear)
            };

            const res = await updateCohortAPI(+id, cohort);
            if (res.data) {
                message.success("Cập nhật Cohort thành công");
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
            const cohort = {
                startYear: Number(startYear),
                endYear: Number(endYear)
            };
            const res = await createCohortAPI(cohort);
            if (res.data) {
                message.success("Thêm mới Cohort thành công");
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

    async function fetchMajorList(): Promise<IOptionSelect[]> {
        const res = await getMajorAPI(`current=1&pageSize=100`);
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
                title={<>{dataUpdate?.id ? "Cập nhật Cohort" : "Tạo mới Cohort"}</>}
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
                            label="Start Year"
                            name="startYear"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="Nhập năm bắt đầu"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="End Year"
                            name="endYear"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập nắm kết thúc"
                        />
                    </Col>

                </Row>
            </ModalForm >
        </>
    )
}

export default ModalCohort