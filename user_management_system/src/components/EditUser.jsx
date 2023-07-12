import styled from "@emotion/styled";
import { Button, FormControl, FormGroup, Input, InputLabel, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch , useSelector} from "react-redux";
import { fetchUserById, editUserById } from "../utils/reducer/app.reducer";

const Container = styled(FormGroup)`
  width: 40%;
  margin: 5% auto 0 auto;
  & div {
    margin-top: 20px;
  }
`;

const DefaultValue = {
  name: '',
  email: '',
  phone: ''
};

const EditUser = () => {
  const { editingUser } = useSelector(state => state.app);
  const [user, setUser] = useState(DefaultValue);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id]);

  useEffect(() => {
    setUser(editingUser);
  }, [editingUser])

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">Edit User</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input onChange={onValueChange} name="name" value={user?.name ?? ""}/>
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input onChange={onValueChange} name="email" value={user?.email ?? ""}/>
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input onChange={onValueChange} name="phone" value={user?.phone ?? ""}/>
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => {
          dispatch(editUserById({...user, _id: id}));
          navigate("/all")
        }}>Edit User</Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
