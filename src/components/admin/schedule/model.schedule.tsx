
import { ModalForm, ProForm, ProFormDateRangePicker, ProFormDateTimeRangePicker } from "@ant-design/pro-components";
import { Col, ConfigProvider, DatePicker, Form, message, notification, Row } from "antd";
import { isMobile } from "react-device-detect";
import enUS from 'antd/lib/locale/en_US';
import { useEffect, useState } from "react";
import { DebounceSelect } from "@/components/share/debouce.select";
import { createScheduleAPI, getClassAPI, getDayOfWeekAPI, getRoomAPI, getSemesterAPI, getSubjectAPI, getUsersAPI } from "@/services/api";


interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: ISchedule | null) => void;
    dataUpdate: ISchedule | null;
}


const { RangePicker } = DatePicker;

const ModalSchedule = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, dataUpdate, setDataUpdate } = props;
    const [room, setRoom] = useState<IOptionSelect[]>([])
    const [dayOfWeek, setDayOfWeek] = useState<IOptionSelect[]>([])
    const [subject, setSubject] = useState<IOptionSelect[]>([])
    const [teacher, setTeacher] = useState<IOptionSelect[]>([]);
    const [classes, setClasses] = useState<IOptionSelect[]>([]);
    const [semester, setSemester] = useState<IOptionSelect[]>([]);
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            ...dataUpdate,
            contractTime: [dataUpdate?.startDate, dataUpdate?.endDate],
        });
        if (dataUpdate?.id) {
            if (dataUpdate.room) {
                setRoom([
                    {
                        label: dataUpdate.room?.name as string,
                        value: dataUpdate.room?.id as number,
                        key: dataUpdate.room?.id as string, 
                    }
                ])
            }
            if (dataUpdate?.daysOfWeek) {
                setDayOfWeek(
                    dataUpdate.daysOfWeek.map((day: any) => ({
                        label: day.name,
                        value: day.id,
                        key: day.id,
                    }))
                );

            }
            if (dataUpdate?.teacher) {
                setTeacher([
                    {
                        label: dataUpdate.room?.name as string,
                        value: dataUpdate.room?.id as number,
                        key: dataUpdate.room?.id as string, 
                    }
                ])
            }
            if (dataUpdate?.subject) {
                setSubject([
                    {
                        label: dataUpdate.room?.name as string,
                        value: dataUpdate.room?.id as number,
                        key: dataUpdate.room?.id as string, 
                    }
                ])
            }
        }
    }, [dataUpdate, form]);


    async function fetchTeacherList(): Promise<IOptionSelect[]> {
        const res = await getUsersAPI(`current=1&pageSize=100&role=teacher`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number
                }
            })
            return temp as any;
        } else return [];
    }

    async function fetchSemesterList(): Promise<IOptionSelect[]> {
        const res = await getSemesterAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number
                }
            })
            return temp as any;
        } else return [];
    }

    async function fetchSubjectList(): Promise<IOptionSelect[]> {
        const res = await getSubjectAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number
                }
            })
            return temp as any;
        } else return [];
    }

    async function fetchRoomList(): Promise<IOptionSelect[]> {
        const res = await getRoomAPI(`current=1&pageSize=100`);
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

    async function fetchDayOfWeekList(): Promise<IOptionSelect[]> {
        const res = await getDayOfWeekAPI();
        if (res && res.data) {
            const list = res.data
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number
                }
            })
            return temp;
        } else return [];
    }
    async function fetchClassList(): Promise<IOptionSelect[]> {
        const res = await getClassAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as number
                }
            })
            return temp;
        } else return [];
    }

    const submitSchedule = async (valuesForm: any) => {
        const { roomId,
            contractDate,
            contractTime,
            dayOfWeekIds,
            subjectId,
            teacher,
            classes, semester
        } = valuesForm

        const schedule = {
            room: Number(roomId.value),
            subjectId: Number(subjectId.value),
            teacherId: Number(teacher.value),
            startDate: contractDate[0],
            endDate: contractDate[1],
            startTime: contractTime[0],
            endTime: contractTime[1],
            dayOfWeek: dayOfWeekIds.map((dayOfWeek: IOptionSelect) => dayOfWeek.value),
            classId: classes.value,
            semesterId: semester.value
        }
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            // const res = await callUpdateSchedule(+id, schedule);
            // if (res.data) {
            //     message.success("Cập nhật schedule thành công");
            //     handleReset();
            //     refreshTable();
            // } else {

            //     notification.error({
            //         message: 'Có lỗi xảy ra',
            //         description: res.message
            //     });
            // }
        } else {
            const res = await createScheduleAPI(schedule);
            if (res.data) {
                message.success("Thêm mới schedule thành công");
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

    const handleReset = async () => {
        form.resetFields();
        setDataUpdate(null);
        setTeacher([]);
        setDayOfWeek([])
        setSubject([]);
        setRoom([])
        setOpenModal(false);
    }
    return (
        <>
            <ModalForm
                form={form}
                title={<>{dataUpdate?.id ? "Cập nhật Schedule" : "Tạo mới Schedule"}</>}
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
                onFinish={submitSchedule}
                initialValues={dataUpdate?.id ? dataUpdate : {}}

            >
                <Row gutter={16}>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="roomId"
                            label="Mã phòng"
                            rules={[{ required: true, message: 'Vui lòng chọn phòng!' }]}

                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={room}
                                value={room}
                                placeholder="Chọn mã phòng"
                                fetchOptions={fetchRoomList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setRoom(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>

                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ConfigProvider locale={enUS}>
                            <ProFormDateRangePicker
                                name="contractDate"
                                label="Start Date -> End Date"
                                disabled={dataUpdate?.id ? true : false}
                                placeholder={['Start Date', 'End Date']}
                                width={"lg"}
                            />
                        </ConfigProvider>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <ConfigProvider locale={enUS}>
                            <ProFormDateTimeRangePicker
                                name="contractTime"
                                label="Start Time -> End Time"
                                disabled={dataUpdate?.id ? true : false}
                                placeholder={['Start Time', 'End Time']}
                                width={"lg"}
                                fieldProps={{
                                    format: 'HH:mm', // Time format
                                    showTime: { format: 'HH:mm' }, // Ensures only time is displayed
                                    picker: 'time', // Ensures it only allows time selection
                                }} />
                        </ConfigProvider>
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProForm.Item
                            name="subjectId"
                            label="Mã môn học"
                            rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}

                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={subject}
                                value={subject}
                                placeholder="Chọn mã môn học"
                                fetchOptions={fetchSubjectList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setSubject(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>

                    </Col>
                    <Col lg={10} md={10} sm={24} xs={24}>
                        <ProForm.Item
                            name="teacher"
                            label="Giáo viên hướng dẫn"
                            rules={[{ required: true, message: 'Vui lòng chọn giáo viên hướng dẫn!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={teacher}
                                value={teacher}
                                placeholder="Chọn giáo viên hướng dẫn của lớp"
                                fetchOptions={fetchTeacherList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setTeacher(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="dayOfWeekIds"
                            label="Thứ"
                            rules={[{ required: true, message: 'Vui lòng chọn buổi học!' }]}

                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                mode="multiple"
                                defaultValue={dayOfWeek}
                                value={dayOfWeek}
                                placeholder="Chọn buổi học"
                                fetchOptions={fetchDayOfWeekList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setDayOfWeek(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>

                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="classes"
                            label="Lớp"
                            rules={[{ required: true, message: 'Vui lòng chọn lớp học!' }]}

                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={classes}
                                value={classes}
                                placeholder="Chọn Lớp"
                                fetchOptions={fetchClassList}
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
                            name="semester"
                            label="Kỳ học"
                            rules={[{ required: true, message: 'Vui lòng chọn lớp học!' }]}

                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={semester}
                                value={semester}
                                placeholder="Chọn Lớp"
                                fetchOptions={fetchSemesterList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setSemester(newValue as IOptionSelect[]);
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

export default ModalSchedule