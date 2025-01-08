import { Button, Result } from "antd";
import { useCurrentApp } from "../context/app.context";
import { Link } from "react-router-dom";
import NotFound from "../share/not.found";

interface IProps {
    children: React.ReactNode
}




const ProtectedRoute = (props: IProps) => {
    const { isAuthenticated, user } = useCurrentApp();


    if (isAuthenticated === false) {
        return (
            <Result
                status="404"
                title="Not Login"
                subTitle="Bạn vui lòng đăng nhập để sử dụng tính năng này."
                extra={<Button type="primary">
                    <Link to="/login">Đăng nhập</Link>
                </Button>}
            />
        )
    }


    const protectedRoutes = ["/admin", "/teacher", "/student"];

    const isProtectedRoute = protectedRoutes.some((route) =>
        location.pathname.startsWith(route)
    );
    const localPath = location.pathname.replace(/^\//, "").split("/")[0];
    if (isAuthenticated && isProtectedRoute) {
        const role = user?.role?.name.toLocaleLowerCase();
        if (role !== localPath) {
            return (
                <NotFound role={role} />
            );
        }
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedRoute