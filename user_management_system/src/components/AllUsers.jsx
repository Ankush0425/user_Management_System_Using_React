import { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUserById } from "../utils/reducer/app.reducer";

import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px auto 0 auto;
`;

const THead = styled(TableRow)`
    background: #000000;
    & > th {
        color: #fff;
        font-size: 20px;
    }
`;

const TBody = styled(TableRow)`
    & > td {
        font-size: 20px;
    }
`;

const AllUsers = () => {
    const { users } = useSelector(state => state.app);
    const dispatch = useDispatch();

    return (
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Serial No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.map((user, index) => (
                    <TBody key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                color="success"
                                style={{ marginRight: 10 }}
                                component={Link}
                                to={`/edit/${user._id}`}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => dispatch(deleteUserById(user._id))}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TBody>
                ))}
            </TableBody>
        </StyledTable>
    );
};

export default AllUsers;
