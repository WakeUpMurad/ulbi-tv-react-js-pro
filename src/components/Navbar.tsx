import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const router = useNavigate();
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useActions()

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
            onClick: () => logout(),
        },
    ];

    return (
        <Layout.Header>
            <Row justify={"end"}>
                {
                    isAuth
                    ?   <>
                            <div style={{color: 'white'}}>
                                {user.username}
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
