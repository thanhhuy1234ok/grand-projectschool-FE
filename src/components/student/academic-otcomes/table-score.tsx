import DataTable from "@/components/share/data.table"
import { showAllListScoreStudentAPI } from "@/services/api"
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Space, Table } from "antd"
import { TableProps } from "antd/lib"
import { useEffect, useRef, useState } from "react"

const TableAllListScore = () => {
    const [dataScoreUser, setDataScoreUser] = useState<IScoreSemester[]>([])

    const tableRef = useRef<ActionType>();

    const semester: TableProps<IScoreSemester>['columns'] = [
        {
            dataIndex: "semesterName",
            key: "id",
            render: (semesters) => semesters || "Không xác định", // Hiển thị tên học kỳ
        },
    ]

    const columns: ProColumns<IScore>[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (text, record, index, action) => {
                return (
                    <span>
                        {index + 1}
                    </span>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Mã môn học',
            dataIndex: ['subject', 'code'],
            key: 'name',
        },
        {
            title: 'Môn học',
            dataIndex: ['subject', 'name'],
        },
        {
            title: 'Số tín chỉ',
            dataIndex: ['subject', 'type'],
        },
        {
            title: 'Điểm chuyên cần',
            dataIndex: 'attendanceScore',
            render(dom, entity, index, action, schema) {
                return (
                    <span style={{ color: entity.attendanceScore < 5 ? 'red' : 'inherit' }}>
                        {entity.attendanceScore}
                    </span>
                )
            },
        },
        {
            title: 'Điểm giữa kỳ',
            dataIndex: 'midtermScore',
            render(dom, entity, index, action, schema) {
                return (
                    <span style={{ color: entity.attendanceScore < 5 ? 'red' : 'inherit' }}>
                        {entity.midtermScore}
                    </span>
                )
            },
        },
        {
            title: 'Điểm cuối kỳ',
            dataIndex: 'finalScore',
            render(dom, entity, index, action, schema) {
                return (
                    <span style={{ color: entity.attendanceScore < 5 ? 'red' : 'inherit' }}>
                        {entity.finalScore}
                    </span>
                )
            },
        },

        {
            title: 'Điểm trung bình',
            render(dom, entity, index, action, schema) {
                const averageScore = (
                    (entity.attendanceScore * 0.1) +
                    (entity.midtermScore * 0.3) +
                    (entity.finalScore * 0.6)
                ).toFixed(2);
                return (
                    <span style={{ color: +averageScore < 5 ? 'red' : 'inherit' }}>
                        {averageScore}
                    </span>
                );
            },
        },
        {
            title: 'Xếp loại',
            render(dom, entity, index, action, schema) {
                const averageScore = (
                    (entity.attendanceScore * 0.1) +
                    (entity.midtermScore * 0.3) +
                    (entity.finalScore * 0.6)
                ).toFixed(2);

                let classification = '';
                if (Number(averageScore) >= 8.5) {
                    classification = 'Xuất sắc';
                } else if (Number(averageScore) >= 7) {
                    classification = 'Giỏi';
                } else if (Number(averageScore) >= 5) {
                    classification = 'Khá';
                } else {
                    classification = 'Yếu';
                }

                return (
                    <span style={{ color: +averageScore < 5 ? 'red' : 'inherit' }}>
                        {classification}
                    </span>
                );
            },
        },
    ];

    const fetchDataStudent = async () => {
        const res = await showAllListScoreStudentAPI();
        console.log(res.data);
        if (res.data) {
            setDataScoreUser(res.data ?? [])
        }
    }
    useEffect(() => {
        fetchDataStudent();
    }, [])

    const headerTittle = () => {
        return <h1>Kết quả học tập</h1>
    }

    return (
        <>
            <Table
                title={headerTittle}
                dataSource={dataScoreUser}
                columns={semester}
                expandable={{
                    expandedRowRender: (record) => (

                        <DataTable<IScore>
                            headerTitle
                            actionRef={tableRef}
                            dataSource={record.scores}
                            columns={columns}
                            pagination={false}
                            search={false}
                            toolBarRender={false}
                        />
                    ),
                }}
                pagination={false}
                rowKey="id"

            />

        </>
    )
}

export default TableAllListScore

