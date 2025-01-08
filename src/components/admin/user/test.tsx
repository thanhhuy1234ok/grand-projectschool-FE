import { getUpdateUserInfo, updateUserInfo } from '@/services/api';
import { Button, message, notification } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';

const UpdateRequestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [dataUpdate, setDataUpdate] = useState<IUpdateData | null | undefined>(null);
    const [loading, setLoading] = useState(false);
    async function fetchUpdateRequestDetails(id: string) {
        try {
            const response = await getUpdateUserInfo(id);
            if (response) {
                setDataUpdate(response.data)
            }
        } catch (error) {
            console.error('Error fetching update request:', error);
            return null;
        }
    }

    useEffect(() => {
        if (id) {
            fetchUpdateRequestDetails(id)
        }
    }, [id]);
    const formatValue = (value: any) => (value ? value : 'Không có');

    const handlerUpdateUser = async () => {
        try {
            if (id) {
                setLoading(true)
                const res = await updateUserInfo(id)
                setLoading(false)
                if (res.data) {
                    message.success("Cập nhật user thành công");
                    navigate("/admin")
                }
                else{
                    notification.error({
                        message: 'Có lỗi xảy ra',
                        description: res.message
                    });
                }
            }
        } catch (error) {

        }
    }

    return (
        <div>
            <h2>Yêu cầu cập nhật thông tin</h2>

            <h3>Thông tin trước khi cập nhật:</h3>
            <ul>
                <li>
                    <strong>Ngày sinh:</strong>{' '}
                    {formatValue(dayjs(dataUpdate?.user.date_of_birth).format('DD-MM-YYYY'))}
                </li>
                <li>
                    <strong>Số điện thoại:</strong> {formatValue(dataUpdate?.user.phone)}
                </li>
                <li>
                    <strong>Địa chỉ:</strong> {formatValue(dataUpdate?.user.address)}
                </li>
            </ul>

            <h3>Thông tin sau khi cập nhật:</h3>
            <ul>
                <li>
                    <strong>Ngày sinh:</strong>{' '}
                    {formatValue(dayjs(dataUpdate?.data.date_of_birth).format('DD-MM-YYYY'))}
                </li>
                <li>
                    <strong>Số điện thoại:</strong> {formatValue(dataUpdate?.data.phone)}
                </li>
                <li>
                    <strong>Địa chỉ:</strong> {formatValue(dataUpdate?.data.address)}
                </li>
            </ul>
            <Button type='primary' onClick={handlerUpdateUser} loading={loading}>Cập nhật user</Button>
        </div>
    );
};

export default UpdateRequestDetails;

