import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Typography } from "antd"
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";


const { Title, Text } = Typography;
dayjs.extend(duration);
interface IProps {
    dataInit?: ISchedule | null;
    handleAttendanceClick: (v: any) => void
    date: string
}

const ScheduleCard = (props: IProps) => {
    const { dataInit, handleAttendanceClick, date } = props
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [status, setStatus] = useState('In progress');

    const getClassStatusMessage = (startTime: string, endTime: string,) => {
        const now = dayjs();
        const start = dayjs().set('hour', parseInt(startTime.split(':')[0]))
            .set('minute', parseInt(startTime.split(':')[1]))
            .set('second', parseInt(startTime.split(':')[2] || '0'));
        const end = dayjs().set('hour', parseInt(endTime.split(':')[0]))
            .set('minute', parseInt(endTime.split(':')[1]))
            .set('second', parseInt(endTime.split(':')[2] || '0'));

        if (now.isAfter(start) && now.isBefore(end)) {
            setStatus("CHECK ATTENDANCE")
            return "Đang diễn ra";
        } else if (now.isBefore(start)) {
            const diff = dayjs.duration(start.diff(now));
            const hours = Math.floor(diff.asHours());
            const minutes = diff.minutes();
            const seconds = diff.seconds();
            return `Sẽ bắt đầu sau ${hours} giờ ${minutes} phút ${seconds} giây`;
        } else {
            setStatus("Completed")
            return "Đã kết thúc";
        }
    };

    useEffect(() => {

        if (dataInit?.id) {
            const interval = setInterval(() => {
                setStatusMessage(getClassStatusMessage(
                    dataInit?.startTime, // Ensure `startTime` is a string
                    dataInit?.endTime,
                )
                );
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [dataInit]);

    const onDetailClick = () => {
        console.log("ok")
    }

    return (
        <>
            <Card
                style={{
                    marginBottom: "16px",
                    border: "1px solid #1890ff",
                    borderRadius: "8px",
                }}
                bodyStyle={{ padding: "16px" }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Title level={1}>{dataInit?.subject.name}</Title>
                    </Col>
                    <Col span={24}>
                        <Text
                            type="secondary"
                            style={{
                                fontSize: "14px",
                                color:
                                    statusMessage === "Đang diễn ra"
                                        ? "#1f00e7"
                                        : "#595959",
                            }}
                        >
                            {dataInit?.class.name} - {statusMessage}
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Divider style={{ margin: "12px 0" }} />
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <ClockCircleOutlined /> {dayjs(dataInit?.startTime, "HH:mm").format("HH:mm")} - {dayjs(dataInit?.endTime, "HH:mm").format("HH:mm")}
                            </Col>
                            <Col span={24}>
                                <CalendarOutlined /> {dayjs(date).format("DD-MM-YYYY")}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <UserOutlined /> {dataInit?.teacher.name}
                            </Col>
                            <Col span={24}>
                                <EnvironmentOutlined /> {dataInit?.room.name}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row justify="end" align="middle">
                            <Col>
                                <Button type="default" onClick={onDetailClick} style={{ marginRight: "20px" }}>
                                    Detail
                                </Button>
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor:
                                            status === "In progress"
                                                ? "#ff4d4f" // Red for In Progress
                                                : status === "Check Attendance"
                                                    ? "#d9d9d9" // Gray for Check Attendance
                                                    : "#f0f0f0", // Default (lighter gray) for Completed
                                        color:
                                            status === "In progress"
                                                ? "#ffffff" // White text for In Progress
                                                : "#000000", // Black text for other statuses
                                        borderColor:
                                            status === "In progress"
                                                ? "#ff4d4f"
                                                : status === "Check Attendance"
                                                    ? "#d9d9d9"
                                                    : "#f0f0f0",
                                        cursor: status === "Completed" ? "not-allowed" : "pointer",
                                    }}
                                    disabled={status === "Completed"}
                                    onClick={() => handleAttendanceClick(dataInit)}
                                >
                                    {status === "In progress"
                                        ? "IN PROGRESS"
                                        : status === "Check Attendance"
                                            ? "CHECK ATTENDANCE"
                                            : "COMPLETED"}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default ScheduleCard