import ButtonComponents from "@/components/share/button";
import DataTable from "@/components/share/data.table";
import { getCampusAPI, getClassAPI } from "@/services/api";
import { CloudUploadOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import queryString from "query-string";
import { useRef, useState } from "react";
import ViewDetailCampus from "./view.campus";
import ModalCampus from "./model.campus";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";



const TableCampus = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<ICampus | null>(null);
    const [isDeleteCohort, setIsDeleteCohort] = useState<boolean>(false);
        const navigate = useNavigate();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const [currentDataTable, setCurrentDataTable] = useState<ICampus[]>([]);

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

    const columns: ProColumns<ICampus>[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (_text, record, _index, _action) => {
                return (
                    <span>
                        {record.id}
                    </span>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Tên cơ sở',
            dataIndex: 'name',
            render: (_text, record, _index, _action) => {
                return (
                    <a href="#" onClick={() => {
                        setOpenViewDetail(true);
                        setDataUpdate(record);
                    }}>
                        {record.name}
                    </a>
                )
            },
        },
        {
            title: 'Vị trí',
            dataIndex: 'location',
            hideInSearch: true
        },
        {
            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <ButtonComponents
                        icon={<PlusOutlined />}
                        onClick={() => {
                            handleViewDetail(+entity.id);
                        }}
                        title="Xem chi tiết cơ sở"
                        isVisible={true}
                    />
                </Space>
            ),

        },
    ];

    const handleViewDetail = (id: number) => {
        navigate(`${id}`);
    };

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
            <DataTable<ICampus>
                actionRef={tableRef}
                headerTitle="Danh sách Campus"
                rowKey="id"
                columns={columns}
                dataSource={currentDataTable}
                request={async (params, sort): Promise<any> => {
                    const query = buildQuery(params, sort);
                    const res = await getCampusAPI(query);
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

            <ModalCampus
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={reloadTable}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />
            <ViewDetailCampus
                dataInit={dataUpdate}
                onClose={setOpenViewDetail}
                open={openViewDetail}
                setDataInit={setDataUpdate}
            />
        </>
    )
}

export default TableCampus