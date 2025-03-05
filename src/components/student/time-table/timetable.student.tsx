import { getScheduleTimeTableStudentAPI } from "@/services/api";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const TimeTable = () => {
    const [scheduleData, setScheduleData] = useState<ISchedule[]>([]);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
        { label: 'Morning', start: '00:00:00', end: '12:00:00' },
        { label: 'Afternoon', start: '12:00:00', end: '18:00:00' },
        { label: 'Evening', start: '18:00:00', end: '23:59:00' },
    ];

    useEffect(() => {
        // Fetch API
        fetchSchedule();
    }, []);
    const fetchSchedule = async () => {
        const res = await getScheduleTimeTableStudentAPI();

        if (res && res.data) {
            const data = await res.data

            setScheduleData(data);
        }
    };

    const renderScheduleCell = (day: string, slot: { start: string; end: string }) => {
        const filteredSchedules = scheduleData.filter((schedule) =>
            schedule.daysOfWeek.some((dow) => dow.name === day) &&
            schedule.startTime >= slot.start &&
            schedule.endTime <= slot.end
        );



        if (filteredSchedules.length > 0) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {filteredSchedules.map((schedule) => (
                        <div
                            key={schedule.id}
                            style={{
                                backgroundColor: '#ffecb3',
                                padding: '8px',
                                borderRadius: '5px',
                                border: '1px solid #ff9800',
                                textAlign: 'left',
                            }}
                        >
                            <strong>{schedule.subject.name}</strong>
                            <p>Class: {schedule.class.name}</p>
                            <p>Room: {schedule.room.name}</p>
                            <p>Teacher: {schedule.teacher.name}</p>
                            <p>Giờ: {dayjs(schedule.startTime, "HH:mm:ss").format("HH:mm")} - {dayjs(schedule.endTime, "HH:mm:ss").format("HH:mm")}</p>
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Lịch học theo tuần</h1>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px',
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', backgroundColor: '#f4f4f4', padding: '10px' }}>Time</th>
                        {daysOfWeek.map((day) => (
                            <th
                                key={day}
                                style={{ border: '1px solid #ccc', backgroundColor: '#f4f4f4', padding: '10px' }}
                            >
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((slot) => (
                        <tr key={slot.label}>
                            <td
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    textAlign: 'center',
                                    backgroundColor: '#e3f2fd',
                                }}
                            >
                                {slot.label}
                            </td>
                            {daysOfWeek.map((day) => (
                                <td
                                    key={day}
                                    style={{ border: '1px solid #ccc', padding: '10px', verticalAlign: 'top' }}
                                >
                                    {renderScheduleCell(day, slot)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TimeTable