
import { createBuildingAPI, createCohortAPI, getMajorAPI, updateCohortAPI } from "@/services/api";
import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, DatePicker, Form, message, notification, Row } from "antd";

import { isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
}

const ModalBuilding = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable} = props;
    const [form] = Form.useForm();
    const params = useParams();
    const id = params.id as string;

    const submitBuilding = async (valuesForm: any) => {
        const { name, totalFloors, hasFloors } = valuesForm;
        const building = {
          name,
            totalFloors : +totalFloors,
            hasFloors: hasFloors === "true" ? true : false,
            campusID: +id,
        };
        const res = await createBuildingAPI(building);
        if (res.data) {
            message.success("Thêm mới Building thành công");
            handleReset();
            refreshTable();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    }
    const handleReset = () => {
        form.resetFields();
        setOpenModal(false);
    }

    return (
        <>
            <ModalForm
                title={<>{ "Tạo mới Building"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{ "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitBuilding}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên tòa nhà"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}

                            placeholder="Nhập tên tòa nhà"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Số lượng tầng"
                            name="totalFloors"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập nắm kết thúc"
                        />
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormSelect
                            label="Tòa nhà có nhiều hơn 1 tầng không?"
                            name="hasFloors"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Chọn kỳ học"
                            initialValue={"true"}
                            options={[
                                { label: 'Có', value: 'true' }, 
                                { label: 'Không', value: 'false' },
                            ]}
                        />
                    </Col>
                </Row>
            </ModalForm >
        </>
    )
}

export default ModalBuilding