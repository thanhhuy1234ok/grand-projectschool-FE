
import { DebounceSelect } from "@/components/share/debouce.select";
import { createClassAPI, getCohortsAPI, getMajorAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProForm, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";
import { useState } from "react";

import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IClass | null) => void;
    dataUpdate: IClass | null;
}

const ModalClass = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [form] = Form.useForm();
    const [major, setMajor] = useState<IOptionSelect[]>([])
    const [cohort, setCohort] = useState<IOptionSelect[]>([])


    const submitClass = async (valuesForm: any) => {
        const { name, maxCapacity, major, cohort } = valuesForm;

        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const data = {
                name, maxCapacity
            };

            const res = await updateCohortAPI(+id, data);
            if (res.data) {
                message.success("Cập nhật class thành công");
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
            const data = {
                name, maxCapacity, majorId: major.value, cohortId: cohort.value
            };
            const res = await createClassAPI(data);
            if (res.data) {
                message.success("Thêm mới class thành công");
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

    async function fetchCohortList(): Promise<IOptionSelect[]> {
        const res = await getCohortsAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.startYear as number,
                    value: item.id as number
                }
            })
            return temp;
        } else return [];
    }

    return (
        <>
            <ModalForm
                title={<>{dataUpdate?.id ? "Cập nhật data" : "Tạo mới data"}</>}
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
                form={form}
                onFinish={submitClass}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="major"
                            label="Tên chuyên ngành"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={major}
                                value={major}
                                placeholder="Tên chuyên ngành"
                                fetchOptions={fetchMajorList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setMajor(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>

                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            label="Năm nhập học"
                            name="cohort"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={cohort}
                                value={cohort}
                                placeholder="Năm nhập học"
                                fetchOptions={fetchCohortList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setCohort(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số lượng sinh viên tối đa"
                            name="maxCapacity"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Số lượng sinh viên"
                        />
                    </Col>

                </Row>
            </ModalForm >
        </>
    )
}

export default ModalClass