import { Link, useNavigate } from "react-router-dom";
import { Button, Result } from 'antd';

const NotFound = (props: any) => {
    const navigate = useNavigate();
    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary">
                        <Link to={`/${props.role}`}>Back Home</Link>
                    </Button>
                }
            />
        </>
    )
}

export default NotFound;