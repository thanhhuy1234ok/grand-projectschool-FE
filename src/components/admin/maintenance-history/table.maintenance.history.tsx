import ButtonComponents from "@/components/share/button";
import DataTable from "@/components/share/data.table";
import { getFacilityAPI, getFacilityAssignmentAPI, getMaintenanceHistoryAPI, getMajorAPI } from "@/services/api";
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Popconfirm, Space } from "antd";

import queryString from "query-string";
import { useRef, useState } from "react";
import ModalMaintenance from "./model.facility";




const TableMaintenanceHistory = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<IMaintenanceRequest | null>(null);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [isDeleteCohort, setIsDeleteCohort] = useState<boolean>(false);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const [currentDataTable, setCurrentDataTable] = useState<IMaintenanceRequest[]>([]);

    const tableRef = useRef<ActionType>();

    const handleDeleteRole = async (id: number) => {
        // setIsDeleteCohort(true)
        // const res = await deleteUserAPI(id);
        // if (res && res.data) {
        //     message.success('Xóa user thành công');
        //     reloadTable();
        // } else {
        //     notification.error({
        //         message: 'Đã có lỗi xảy ra',
        //         description: res.message
        //     })
        // }
        // setIsDeleteCohort(false)
    }

    const columns: ProColumns<IMaintenanceRequest>[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (_text, record,) => {
                return (
                    <div>
                        <a href="#" onClick={() => {
                            setOpenViewDetail(true);
                            setDataUpdate(record);
                        }}>
                            {record.id}
                        </a>
                    </div>

                )
            },
            hideInSearch: true,
        },
        {
            title: 'Tên thiết bị',
            dataIndex: ['facility', 'name'],
        },
        {
            title: 'Vị trí thiết bị',
            dataIndex: 'room',
            render: (_text, record,) => {
                return (
                    <span>
                        {record.room?.building?.campus.name} - {record.room?.building?.name} -{record.room?.name}
                    </span>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Số lượng thiết bị hư',
            dataIndex: 'quantity',
            hideInSearch: true,
        },
        {
            title: 'Trạng thái thiết bị',
            dataIndex: 'status',
            hideInSearch: true,
        },
        {
            title: 'nội dung bảo trì',
            dataIndex: 'notes',
            hideInSearch: true,
        },
        {

            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    {/* <Access
                        permission={ALL_PERMISSIONS.ROLES.UPDATE}
                        hideChildren
                    >
                        
                    </Access> */}
                    <EditOutlined
                        style={{
                            fontSize: 20,
                            color: '#ffa500',
                        }}
                        type=""
                        onClick={async () => {
                            setDataUpdate(entity)
                            setOpenModal(true)
                        }}
                    />
                    {/* <Access
                        permission={ALL_PERMISSIONS.ROLES.DELETE}
                        hideChildren
                    >
                        
                    </Access> */}
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa role"}
                        description={"Bạn có chắc chắn muốn xóa role này ?"}
                        // onConfirm={() => handleDeleteRole(+entity.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        okButtonProps={{ loading: isDeleteCohort }}
                    >
                        <span style={{ cursor: "pointer", margin: "0 10px" }}>
                            <DeleteOutlined
                                style={{
                                    fontSize: 20,
                                    color: '#ff4d4f',
                                }}
                            />
                        </span>
                    </Popconfirm>
                </Space>
            ),

        },
    ];

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

    const handleExportData = () => {

    }

    const RenderHeaderTable = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', gap: 15 }}>
                    <ButtonComponents
                        icon={<ExportOutlined />}
                        onClick={() => handleExportData()}
                        title="Export"
                        isVisible={false}
                    />


                    <ButtonComponents
                        icon={<CloudUploadOutlined />}
                        onClick={() => setOpenModalImport(true)}
                        title="Import"
                        isVisible={false}
                    />

                    <ButtonComponents
                        icon={<PlusOutlined />}
                        onClick={() => setOpenModal(true)}
                        title="Thêm mới"
                        isVisible={true}
                    />
                </span>
            </div>
        )
    }


    const reloadTable = () => {
        tableRef.current?.reload();
    }
    return (
        <>
            <DataTable<IMaintenanceRequest>
                actionRef={tableRef}
                headerTitle="Danh sách lịch sử bảo trì thiết bị"
                rowKey="id"
                columns={columns}
                dataSource={currentDataTable}
                request={async (params, sort, filter): Promise<any> => {
                    const query = buildQuery(params, sort, filter);
                    const res = await getMaintenanceHistoryAPI(query);
                    if (res.data) {
                        console.log(res.data?.result);
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
                        <RenderHeaderTable />
                    );
                }}
            />
            
            <ModalMaintenance
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={reloadTable}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />

            {/* <ViewDetailAssignment
                dataInit={dataUpdate}
                onClose={setOpenViewDetail}
                open={openViewDetail}
                setDataInit={setDataUpdate}
            /> */}
        </>
    )
}

export default TableMaintenanceHistory