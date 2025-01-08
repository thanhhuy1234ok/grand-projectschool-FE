import { createQrCodeAPI, getAttendanceByDateAPI, updateAttendanceAPI } from "@/services/api";
import { Button, Checkbox, Image, message, notification, QRCode } from "antd";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AttendanceList = () => {
    const location = useLocation();
    const [dataStudent, setDataStudent] = useState<IAttendance[]>([])
    const { scheduleId, className, date } = location.state || {};
    const [qrCode, setQrCode] = useState<string>('');

    useEffect(() => {
        fetchListStudentAttendance(scheduleId)
    }, [scheduleId])
    const fetchListStudentAttendance = async (id: number) => {
        const res = await getAttendanceByDateAPI(`scheduleId=${id}&date=${date}`)
        if (res && res?.data) {
            setDataStudent(res.data)
        }
    }

    const handleCheckboxChange = (id: number) => {
        setDataStudent((prevState) =>
            prevState.map((student) =>
                student.id === id
                    ? { ...student, isPresent: !student.isPresent }
                    : student
            )
        );
    };

    const handleSubmitAttendance = async (id: number) => {
        try {
            // Prepare the data to send to the API
            const updatedAttendance = dataStudent.map((student) => ({
                studentId: student.student.id,
                isPresent: student.isPresent ? true : false,
            }));
            const attendanceArray = Object.values(updatedAttendance);

            const res = await updateAttendanceAPI(`scheduleId=${id}&date=${date}`, { students: attendanceArray });

            if (res && res.data) {
                message.success('điểm danh thành công');
            } else {
                notification.error({
                    message: 'Đã có lỗi xảy ra',
                    description: res.message
                })
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
            alert("An error occurred while updating attendance.");
        }
    };

    const handleGenerateQRCode = async () => {
        try {
            const date = dayjs().format('YYYY-MM-DD')
            const response = await createQrCodeAPI(scheduleId, date);
            if (response && response.data) {
                setQrCode(response.data.qrCode);
            }
        } catch (err) {
            console.error('Error generating QR code:', err);
        }
    };

    return (
        <div>
            <h1>Check Attendance</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>Class Name:</strong> {className}</div>
                <Button type="primary" onClick={handleGenerateQRCode}>Tạo mã điểm danh</Button>
            </div>
            <div style={{ marginTop: "20px" }}>
                {
                qrCode && 
                <Image
                    src={qrCode}
                    alt="QR Code"
                    style={{ width: '150px', height: '150px' }}
                />
                }
            </div>
            <table style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Attendance Rate</th>
                        <th>Absence Rate</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {dataStudent.length > 0 ? (
                        dataStudent.map((student, index) => {
                            const studentAttendanceRate = student.isPresent ? 100 : 0;
                            const studentAbsenceRate = student.isPresent ? 0 : 100;
                            return (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.student.id}</td>
                                    <td>{student.student.name}</td>
                                    <td>{studentAttendanceRate}%</td>
                                    <td>{studentAbsenceRate}%</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={student.isPresent}
                                            onChange={() => handleCheckboxChange(student.id)}
                                        />
                                    </td>

                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>
                                No attendance data available.
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
                <Button
                    type="primary"
                    onClick={() => handleSubmitAttendance(scheduleId)}
                >
                    Submit Attendance
                </Button>
            </div>
        </div>
    );
}

export default AttendanceList