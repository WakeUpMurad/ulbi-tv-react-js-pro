import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Navbar: FC = () => {
    const router = useNavigate();
    const {isAuth} = useTypedSelector(state => state.auth);

    const menuLoginItems = [
        {
            key: 'Login',
            icon: 'Login',
            onClick: () => router(`${RouteNames.LOGIN}`)
        },
    ];
    const menuLogoutItems = [
        {
            key: 'Logout',
            icon: 'Logout',
            onClick: () => router(`${RouteNames.LOGIN}`)
        },
    ];

    return (
        <Layout.Header>
            <Row justify={"end"}>
                {
                    isAuth
                    ?   <>
                            <div style={{color: 'white'}}>
                                Murad G.
                            </div>
                            <Menu theme={"dark"} mode={"horizontal"} selectable={false} items={menuLogoutItems}/>
                        </>
                    : <Menu theme={"dark"} mode={"horizontal"} selectable={false} items={menuLoginItems}/>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;
