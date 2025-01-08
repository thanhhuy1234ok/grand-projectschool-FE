import DataTable from "@/components/share/data.table";
import { getClassStudentListAPI } from "@/services/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ModalAddScore from "./model.addscore";

const ShowListStudent = () => {
    const { id } = useParams();
    const [dataClass, setDataClass] = useState<ISchedule>()
    const tableRef = useRef<ActionType>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IUserTable | null>(null);

    const columns: ProColumns<IUserTable>[] = [
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Điểm chuyên cần',
            dataIndex: 'scores',
            hideInSearch: true,
            render: (value, record) => {
                const listScore: any = record.scores || [];
                return (
                    <>
                        {listScore.map((score: IScore) => (
                            <span key={score.id}>
                                {score.attendanceScore}
                                <br />
                            </span>
                        ))}
                    </>
                );
            }
        },
        {
            title: 'Điểm giữa kì',
            dataIndex: 'scores',
            hideInSearch: true,
            render: (value, record) => {
                const listScore: any = record.scores || [];
                return (
                    <>
                        {listScore.map((score: IScore) => (
                            <span key={score.id}>
                                {score.midtermScore}
                                <br />
                            </span>
                        ))}
                    </>
                );
            }
        },
        {
            title: 'Điểm cuối thi',
            dataIndex: 'scores',
            hideInSearch: true,
            render: (value, record) => {
                const listScore: any = record.scores || [];
                return (
                    <>
                        {listScore.map((score: IScore) => (
                            <span key={score.id}>
                                {score.finalScore}
                                <br />
                            </span>
                        ))}
                    </>
                );
            }
        },
        {

            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Button type="primary" onClick={async () => {
                        setDataUpdate(entity)
                        setOpenModal(true)
                    }}>
                        Nhập điểm
                    </Button>
                </Space>
            ),

        },
    ]


    const reloadTable = () => {
        tableRef.current?.reload();
    }
    return (
        <>
            <DataTable<IUserTable>
                actionRef={tableRef}
                headerTitle={`Danh sách lớp ${dataClass?.class.name} - ${dataClass?.subject.name}`}
                rowKey="id"
                columns={columns}
                dataSource={dataClass?.class.students}
                request={async (): Promise<any> => {
                    const res = await getClassStudentListAPI(Number(id))
                    if (res.data) {
                        setDataClass(res.data)
                    }
                }}
                scroll={{ x: true }}
                pagination={
                    {
                        hideOnSinglePage: true
                    }
                }
                rowSelection={false}
                search={false}
                toolBarRender={false}

            />

            <ModalAddScore
                dataUpdate={dataUpdate}
                openModal={openModal}
                refreshTable={reloadTable}
                setDataUpdate={setDataUpdate}
                setOpenModal={setOpenModal}
            />
        </>
    )
}

export default ShowListStudent