import { Button } from "antd"
import { ReactNode } from "react"

interface IProps {
    title: string
    isVisible: boolean,
    onClick: () => void;
    icon: ReactNode
}

const ButtonComponents = (props: IProps) => {
    if (!props.isVisible) return null;
    return (
        <>
            <Button
                icon={props.icon}
                type="primary"
                onClick={props.onClick}
            >{props.title}</Button>
        </>
    )
}

export default ButtonComponents