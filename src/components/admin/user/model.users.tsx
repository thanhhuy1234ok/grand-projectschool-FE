import { DebounceSelect } from "@/components/share/debouce.select";
import { createUserAPI, getClassAPI, getCohortsAPI, getMajorAPI, getRolesAPI, updateUserAPI } from "@/services/api";
import { ModalForm, ProCard, ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, Form, message, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IUserTable | null) => void;
    dataUpdate: IUserTable | null;
}


const ModalUsers = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;
    const [roles, setRoles] = useState<IOptionSelect[]>([]);
    const [major, setMajor] = useState<IOptionSelect[]>([])
    const [classes, setClasses] = useState<IOptionSelect[]>([])
    const [cohort, setCohort] = useState<IOptionSelect[]>([])

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate?.id) {
            if (dataUpdate.role) {
                setRoles([
                    {
                        label: dataUpdate.role?.name as string,
                        value: dataUpdate.role?.id as number,
                        key: dataUpdate.role?.id as string,
                    }
                ])
            }
            if (dataUpdate.class) {
                setClasses([
                    {
                        label: dataUpdate.class.name as string,
                        value: dataUpdate.class.id as number,
                        key: dataUpdate.class.id as string,
                    }
                ])
            }
            if (dataUpdate?.major) {
                setMajor([
                    {
                        label: dataUpdate.major.name as string,
                        value: dataUpdate.major.id as number,
                        key: dataUpdate.major?.id as string,
                    }
                ])
            }
            if (dataUpdate?.yearOfAdmission) {
                setCohort([
                    {
                        label: `${dataUpdate.yearOfAdmission?.startYear} - ${dataUpdate.yearOfAdmission?.endYear}` as string,
                        value: dataUpdate.yearOfAdmission.id as number,
                        key: dataUpdate.yearOfAdmission?.id as string,
                    }
                ])
            }
        }
    }, [ dataUpdate]);

    const submitUser = async (valuesForm: any) => {
       try {
           const { name, email, password, address, gender, role, major, classes, yearOfAdmission } = valuesForm
           const classID = classes?.value || undefined;
           const cohort = yearOfAdmission?.value || undefined;
           const majorId = major?.value || undefined;
           const roleId = role?.value || undefined;
           if (dataUpdate?.id) {
               const data = { name, email, address, gender, role: roleId, major: majorId, class: classID, yearOfAdmission: cohort }
               const res = await updateUserAPI(+dataUpdate.id, data)
               if (res && res.data) {
                   message.success('update user thành công');
                   form.resetFields();
                   setOpenModal(false);
                   refreshTable();
               } else {
                   notification.error({
                       message: 'Đã có lỗi xảy ra',
                       description: res.message
                   })
               }

           } else {
               const data = { name, email, password, address, gender, role: roleId, major: majorId, class: classID, yearOfAdmission: cohort }
               const res = await createUserAPI(data)
               if (res && res.data) {
                   message.success('Tạo mới user thành công');
                   form.resetFields();
                   setOpenModal(false);
                   refreshTable();
               } else {
                   notification.error({
                       message: 'Đã có lỗi xảy ra',
                       description: res.message
                   })
               }
           }
       } catch (error) {
        console.log(error);
       }
    }
    const handleReset = () => {
        form.resetFields();
        setDataUpdate(null);
        setRoles([])
        setMajor([])
        setClasses([])
        setCohort([])
        setOpenModal(false);
    }

    async function fetchRoleList(): Promise<IOptionSelect[]> {
        const res = await getRolesAPI(`current=1&pageSize=100`);
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

    async function fetchClassesList(): Promise<IOptionSelect[]> {
        const res = await getClassAPI(`current=1&pageSize=100`);
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
                    label: `${item.startYear} - ${item.endYear}`,
                    value: item.id as number
                }
            })
            return temp;
        } else return [];
    }

    return (
        <>
            <ModalForm
                title={<>{dataUpdate?.id ? "Cập nhật User" : "Tạo mới User"}</>}
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
                onFinish={submitUser}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên User"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập name"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText.Password
                            disabled={dataUpdate?.id ? true : false}
                            label="Password"
                            name="password"
                            rules={[{ required: dataUpdate?.id ? false : true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập password"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                                { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
                            ]}
                            placeholder="Nhập email"
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
                            placeholder="Please select a gender"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        />
                    </Col>

                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="role"
                            label="Vai trò"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}

                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={roles}
                                value={roles}
                                placeholder="Chọn công vai trò"
                                fetchOptions={fetchRoleList}
                                onChange={(newValue: any) => {
                                    console.log(newValue)
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setRoles(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>

                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="major"
                            label="Chuyên ngành"
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={major}
                                value={major}
                                placeholder="Chọn chuyên ngành"
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
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="classes"
                            label="Lớp học"
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={classes}
                                value={classes}
                                placeholder="Chọn lớp học"
                                fetchOptions={fetchClassesList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setClasses(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>

                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="yearOfAdmission"
                            label="Năm nhập học"
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={cohort}
                                value={cohort}
                                placeholder="Chọn năm nhập học"
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
                </Row>
            </ModalForm >
        </>
    )
}

export default ModalUsers