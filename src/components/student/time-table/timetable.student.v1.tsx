import React from "react";
import "./TeacherSchedule.css";

type ClassType = "theory" | "practice" | "online" | "exam" | "cancel";

interface ClassItem {
    subject: string;
    className?: string;
    period: string;
    time: string;
    room?: string;
    teacher: string;
    type?: ClassType;
}

interface ScheduleData {
    [session: string]: {
        [day: string]: ClassItem[];
    };
}

const days = [
    { label: "Thứ 2", date: "31/03/2025" },
    { label: "Thứ 3", date: "01/04/2025" },
    { label: "Thứ 4", date: "02/04/2025" },
    { label: "Thứ 5", date: "03/04/2025" },
    { label: "Thứ 6", date: "04/04/2025" },
    { label: "Thứ 7", date: "05/04/2025" },
    { label: "Chủ nhật", date: "06/04/2025" },
];

const scheduleData: ScheduleData = {
    Sáng: {
        "Thứ 2": [
            {
                subject: "Chuỗi cung ứng căn bản",
                className: "CĐLOGT28C",
                period: "1–3",
                time: "07:00–09:15",
                room: "D306",
                teacher: "Trần Thị Mến",
            },
            {
                subject: "Kinh tế quốc tế",
                period: "4–6",
                time: "09:40–11:55",
                room: "D203",
                teacher: "Thái Phạm Phương Thùy",
            },
        ],
        "Thứ 3": [
            {
                subject: "Nguyên lý kế toán – tài chính",
                period: "1–3",
                time: "07:00–09:15",
                teacher: "Trịnh Thị Bảo Quyên",
            },
            {
                subject: "Logistics căn bản",
                period: "4–6",
                time: "09:40–11:55",
                room: "D301",
                teacher: "Phạm Thị Mai",
            },
        ],
        "Thứ 4": [
            {
                subject: "Containers đường biển",
                period: "1–3",
                time: "07:00–09:15",
                teacher: "Nguyễn Ngọc Trang",
            },
            {
                subject: "Tiếng Anh thương mại 1",
                period: "4–6",
                time: "09:40–11:55",
                room: "D017",
                teacher: "Huỳnh Đoàn Phương Dung",
            },
        ],
        "Thứ 5": [
            {
                subject: "Pháp luật và kinh tế",
                period: "1–3",
                time: "07:00–09:15",
                room: "D101",
                teacher: "Mai Xuân Minh",
            },
        ],
        "Thứ 7": [
            {
                subject: "Pháp luật và kinh tế",
                period: "1–3",
                time: "07:00–09:15",
                room: "D101",
                teacher: "Mai Xuân Minh",
            },
        ],
    },
    Chiều: {
        "Chủ nhật": [
            {
                subject: "Nghiệp vụ thanh toán quốc tế",
                period: "10–12",
                time: "15:40–17:55",
                room: "D307",
                teacher: "Phạm Đức Dũng",
            },
        ],
    },
    Tối: {},
};

const TeacherSchedule: React.FC = () => {
    return (
        <div className="schedule-wrapper">
            <h2>Thời khóa biểu giảng viên</h2>
            <table>
                <thead>
                    <tr>
                        <th>Ca học</th>
                        {days.map((day) => (
                            <th key={day.label}>
                                {day.label}
                                <br />
                                {day.date}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {["Sáng", "Chiều", "Tối"].map((session) => (
                        <tr key={session}>
                            <td className="time">{session}</td>
                            {days.map((day) => {
                                const classes = scheduleData[session]?.[day.label] || [];
                                return (
                                    <td key={day.label}>
                                        {classes.map((cls, index) => (
                                            <div
                                                key={index}
                                                className={`class-box ${cls.type ?? "theory"}`}
                                            >
                                                <strong>{cls.subject}</strong>
                                                <br />
                                                {cls.className && <>{cls.className}<br /></>}
                                                Tiết: {cls.period} ({cls.time})<br />
                                                {cls.room && <>Phòng: {cls.room}<br /></>}
                                                GV: {cls.teacher}
                                            </div>
                                        ))}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="legend">
                <span className="theory">Lý thuyết</span>
                <span className="practice">Thực hành</span>
                <span className="online">Trực tuyến</span>
                <span className="exam">Thi</span>
                <span className="cancel">Tạm ngưng</span>
            </div>
        </div>
    );
};

export default TeacherSchedule;
