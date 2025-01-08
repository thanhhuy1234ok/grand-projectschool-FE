
import { callUpdateMailUserAPI } from "@/services/api";
import { ModalForm, ProForm, ProFormDatePicker, ProFormDateTimeRangePicker, ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, Form, message, notification, Row } from "antd";
import dayjs from "dayjs";
import { isMobile } from 'react-device-detect';

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IUserTable | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}

const UpdateProfileModal = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [form] = Form.useForm();

    // useEffect(() => {
    //     if (dataInit?.id) {
    //         form.setFieldsValue(dataInit);
    //     }
    // }, [dataInit]);

    const submitProfileUpdate = async (valuesForm: any) => {
        const { date_of_birth, gender, address, phone } = valuesForm;
        if (!dataInit) {
            console.error('Dữ liệu gốc (dataInit) không khả dụng.');
            return;
        }
        const changes = Object.entries({ date_of_birth, gender, address, phone }).reduce(
            (acc, [key, value]) => {
                if (value !== dataInit[key as keyof typeof dataInit]) {
                    acc[key] = value;
                }
                return acc;
            },
            {} as Record<string, any>
        );

        const updatedProfile = { data: changes };

        const res = await callUpdateMailUserAPI(updatedProfile);
        if (res.message) {
            message.success(res.message);
            reloadTable();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    };


    return (
        <>
            <ModalForm
                title="Cập nhật hồ sơ"
                open={openModal}
                modalProps={{
                    onCancel: () => setOpenModal(false),
                    afterClose: () => setOpenModal(false),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 600,
                    keyboard: false,
                    maskClosable: false,
                    okText: "Cập nhật",
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitProfileUpdate}
                initialValues={dataInit?.id ? dataInit : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                                { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
                            ]}
                            disabled={true}
                            placeholder="Nhập email"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên hiển thị"
                            name="name"
                            disabled={true}
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập tên hiển thị"
                        />
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormDatePicker
                            label="Sinh nhật"
                            name="date_of_birth"
                            fieldProps={{
                                disabledDate: (current) => {
                                    const today = dayjs();
                                    const todayMinus18Years = today.subtract(18, 'years');
                                    const todayMinus28Years = today.subtract(28, 'years');

                                    if (dataInit?.role?.name === 'TEACHER') {
                                        // For teachers, only allow dates 28 years ago or earlier
                                        return current && current.isAfter(todayMinus28Years, 'day');
                                    } else {
                                        // For others, only allow dates 18 years ago or earlier
                                        return current && current.isAfter(todayMinus18Years, 'day');
                                    }
                                },
                            }}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="gender"
                            label="Giới Tính"
                            valueEnum={{
                                MALE: 'Nam',
                                FEMALE: 'Nữ',
                                OTHER: 'Khác',
                            }}
                            placeholder="Vui lòng chọn giới tính"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        />
                    </Col>
                    <Col lg={10} md={10} sm={24} xs={24}>
                        <ProFormText
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập địa chỉ"
                        />
                    </Col>

                    <Col lg={10} md={10} sm={24} xs={24}>
                        <ProFormText
                            label="Số điện thoại"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống số điện thoại' },
                                {
                                    pattern: /^(\+84|0)\d{9,10}$/,
                                    message: 'Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng',
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default UpdateProfileModal;
