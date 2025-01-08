import ButtonComponents from "@/components/share/button";
import DataTable from "@/components/share/data.table";
import { getClassAPI } from "@/services/api";
import { CloudUploadOutlined,  ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import queryString from "query-string";
import { useRef, useState } from "react";
import ModalClass from "./model.class";



const TableClass = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<IClass | null>(null);
    const [isDeleteCohort, setIsDeleteCohort] = useState<boolean>(false);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const [currentDataTable, setCurrentDataTable] = useState<IClass[]>([]);

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

    const columns: ProColumns<IClass>[] = [
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
            title: 'Tên lớp học',
            dataIndex: 'name',
        },
        {
            title: 'Số lượng chỗ ngồi',
            dataIndex: 'maxCapacity',
            hideInSearch: true
        },
        // {

        //     title: 'Actions',
        //     hideInSearch: true,
        //     width: 50,
        //     render: (_value, entity, _index, _action) => (
        //         <Space>
        //             {/* <Access
        //                 permission={ALL_PERMISSIONS.ROLES.UPDATE}
        //                 hideChildren
        //             >
                        
        //             </Access> */}
        //             <EditOutlined
        //                 style={{
        //                     fontSize: 20,
        //                     color: '#ffa500',
        //                 }}
        //                 type=""
        //                 onClick={async () => {
        //                     setDataUpdate(entity)
        //                     setOpenModal(true)
        //                 }}
        //             />
        //             {/* <Access
        //                 permission={ALL_PERMISSIONS.ROLES.DELETE}
        //                 hideChildren
        //             >
                        
        //             </Access> */}
        //             <Popconfirm
        //                 placement="leftTop"
        //                 title={"Xác nhận xóa role"}
        //                 description={"Bạn có chắc chắn muốn xóa role này ?"}
        //                 // onConfirm={() => handleDeleteRole(+entity.id)}
        //                 okText="Xác nhận"
        //                 cancelText="Hủy"
        //                 okButtonProps={{ loading: isDeleteCohort }}
        //             >
        //                 <span style={{ cursor: "pointer", margin: "0 10px" }}>
        //                     <DeleteOutlined
        //                         style={{
        //                             fontSize: 20,
        //                             color: '#ff4d4f',
        //                         }}
        //                     />
        //                 </span>
        //             </Popconfirm>
        //         </Space>
        //     ),

        // },
    ];

    const buildQuery = (params: any, sort: any) => {
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
            <DataTable<IClass>
                actionRef={tableRef}
                headerTitle="Danh sách Lớp"
                rowKey="id"
                columns={columns}
                dataSource={currentDataTable}
                request={async (params, sort): Promise<any> => {
                    const query = buildQuery(params, sort);
                    const res = await getClassAPI(query);
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
                        <RenderHeaderTable />
                    );
                }}
            />

            <ModalClass
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={reloadTable}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />
        </>
    )
}

export default TableClass