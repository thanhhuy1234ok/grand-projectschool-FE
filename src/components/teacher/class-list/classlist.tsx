import DataTable from "@/components/share/data.table"
import { getClassListTeacher } from "@/services/api"
import { ActionType, ProColumns } from "@ant-design/pro-components"
import { Button, Popconfirm, Space } from "antd"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


const ClassList = () => {
    const [dataSchedule, setDataSchedule] = useState<ISchedule[]>([])
    const navigate = useNavigate()

    const tableRef = useRef<ActionType>();


    const columns: ProColumns<ISchedule>[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (text, record, index, action) => {
                return (
                    <span>
                        {record.id}
                    </span>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Tên lớp',
            dataIndex: ['class', 'name'],
            key: 'name',
            hideInSearch: true 
        },
        {
            title: 'Môn học',
            dataIndex: ['subject', 'name'],
            hideInSearch: true
        },
        {
            title: 'Số lượng sinh viên',
            dataIndex: ['class', 'maxCapacity'],
            hideInSearch: true
        },
        {

            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handlerClassListStudent(entity)}
                    >
                        Xem danh sách sinh viên
                    </Button>
                </Space>
            ),

        },
    ];

    const handlerClassListStudent = (data: ISchedule) => {
        navigate(`${data.id}`)
    }

    return (
        <>
            <DataTable<ISchedule>
                actionRef={tableRef}
                headerTitle="Danh sách lớp"
                rowKey="id"
                columns={columns}
                dataSource={dataSchedule}
                request={async (params, sort, filter): Promise<any> => {
                    const res = await getClassListTeacher();
                    if (res.data) {
                        setDataSchedule(res.data ?? [])
                    }
                }}
                pagination={{
                    hideOnSinglePage: true
                }}
                scroll={{ x: true }}
                rowSelection={false}
                search={false}
            />


        </>
    )
}

export default ClassList