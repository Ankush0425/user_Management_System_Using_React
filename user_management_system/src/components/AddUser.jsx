import styled from "@emotion/styled";
import { Button, FormControl, FormGroup, Input, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/reducer/app.reducer";

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

const AddUser = () => {
  const [user, setUser] = useState(DefaultValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onValueChange = (e) => {
    setUser((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const addUserDetails = () => {
    dispatch(addUser(user));
    navigate("/all");
  };

  return (
    <Container>
      <Typography variant="h4">Add User</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input onChange={onValueChange} name="name" />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input onChange={onValueChange} name="email" />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input onChange={onValueChange} name="phone" />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={addUserDetails}>Add User</Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
