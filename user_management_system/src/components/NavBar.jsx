// import { AppBar,ToolBar } from "@mui/material";
import { AppBar, Toolbar, styled} from  "@mui/material";

import { NavLink } from "react-router-dom";

const Header = styled(AppBar)`
    background: #111111
`

const Tabs = styled(NavLink)`
    font-size: 20px;
    color: inherit;
    margin-left: 20px;
    text-decoration:none
`

const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar>
                <Tabs>Simple User Management System</Tabs>
                <Tabs to="/add">Add User</Tabs>
                <Tabs to="/all">All Users</Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;