import DataTable from "@/components/share/data.table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message, notification, Popconfirm, Space } from "antd";
import queryString from "query-string";
import { useRef, useState } from "react";
import { createListAttendanceScheduleAPI, getScheduleAPI } from "@/services/api";
import ModalSchedule from "./model.schedule";
import dayjs from "dayjs";

const TableSchedule = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<ISchedule | null>(null);
    const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const [currentDataTable, setCurrentDataTable] = useState<ISchedule[]>([]);

    const tableRef = useRef<ActionType>();
    const columns: ProColumns<ISchedule>[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
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
            title: 'Môn học',
            dataIndex: ['subject', 'name'],
            key: 'name',
            sorter: true,
        },
        {
            title: 'Giáo viên',
            dataIndex: ['teacher', 'name'],
            // sorter: true,
            hideInSearch: true
        },
        {
            title: 'Thời gian học',
            render: (_, record) => {
                const startTime = record.startTime ? record.startTime : 'N/A';
                const endTime = record.endTime ? record.endTime : 'N/A';
                return `${startTime} - ${endTime}`;
            },
            // sorter: true,
            hideInSearch: true
        },
        {
            title: 'Lớp',
            dataIndex: ['class', 'name'],
            // sorter: true,
            hideInSearch: true
        },
        {
            title: 'Thời gian',
            render: (_, record) => {
                const startDate = record.startDate ? record.startDate : 'N/A';
                const endDate = record.endDate ? record.endDate : 'N/A';
                return `${dayjs(startDate).format('DD-MM-YYYY')} - ${dayjs(endDate).format('DD-MM-YYYY')}`;
            },
            // sorter: true,
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
                        onClick={() => handlerAttendanceList(entity.id)}
                        loading={!!isLoading[entity.id]} 
                        key={_index}
                    >
                        Tạo lịch điểm danh
                    </Button>
                </Space>
            ),

        },
    ];

    const handlerAttendanceList = async (scheduleId: number) => {
        setIsLoading((prev) => ({ ...prev, [scheduleId]: true }));
        const res = await createListAttendanceScheduleAPI(scheduleId)
        if (res && res.data) {
            message.success('Tạo lịch điểm danh');
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsLoading((prev) => ({ ...prev, [scheduleId]: false })); 
    }

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };
        if (clone.name) clone.name = `${clone.name}`;

        let temp = queryString.stringify(clone);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name" : "sort=-name";
        }
        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === 'ascend' ? "sort=createdAt" : "sort=-createdAt";
        }
        if (sort && sort.updatedAt) {
            sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt" : "sort=-updatedAt";
        }

        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=id`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    }
    const refreshTable = () => {
        tableRef.current?.reload();
    }
    return (
        <>
            <DataTable<ISchedule>
                actionRef={tableRef}
                headerTitle="Danh sách Lịch học"
                rowKey="id"
                columns={columns}
                dataSource={currentDataTable}
                request={async (params, sort, filter): Promise<any> => {
                    const query = buildQuery(params, sort, filter);
                    const res = await getScheduleAPI(query);
                    if (res.data) {
                        setMeta(res.data.meta);
                        setCurrentDataTable(res.data?.result ?? [])
                    }
                    return {
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total
                    }
                }}
                scroll={{ x: true }}
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        showSizeChanger: true,
                        total: meta.total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                rowSelection={false}
                toolBarRender={(_action, _rows): any => {
                    return (
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={() => setOpenModal(true)}
                        >
                            Thêm mới
                        </Button>
                    );
                }}
            />
            <ModalSchedule
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={refreshTable}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />
        </>
    )
}

export default TableSchedule