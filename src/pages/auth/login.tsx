import { App, Button, Divider, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { useCurrentApp } from '@/components/context/app.context';
import "@/styles/login.scss"
import { LoginAPI } from '@/services/api';
import ModalChangePassword from './modal.change.password';
type FieldType = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { message, notification } = App.useApp();
    const { setIsAuthenticated, setUser,user } = useCurrentApp();
    const [changePassword, setChangePassword] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            navigate(`/${user.role?.name.toLocaleLowerCase()}`)
        }
    }, [])

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await LoginAPI(username, password);
        setIsSubmit(false);
        if (res?.data) {
            setIsAuthenticated(true);
            setUser(res?.data?.user)
            localStorage.setItem('access_token', res.data.access_token);
            message.success('Đăng nhập tài khoản thành công!');

            navigate(`/${res.data.user.role?.name.toLocaleLowerCase()}`)
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    };




    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Nhập</h2>
                            <Divider />

                        </div>
                        <Form
                            name="login-form"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="username"
                                rules={[
                                    { required: true, message: 'Email không được để trống!' },
                                    { type: "email", message: "Email không đúng định dạng!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                                style={{ marginBottom: "5px" }}
                            >
                                <Input.Password />
                            </Form.Item>

                            <div className="forgot-password">
                                <Button type='link' onClick={() => setChangePassword(true)} style={{ padding: "0px", marginBottom: "20px" }}>Quên mật khẩu ?</Button>
                            </div>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmit}  >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </main>
            <ModalChangePassword
                isModalOpen={changePassword}
                setIsModalOpen={setChangePassword}
            />
        </div>
    )
}

export default LoginPage;
