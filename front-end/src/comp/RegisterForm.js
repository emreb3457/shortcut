import { Box, Input, Button, Text } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { createUser, getUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
const RegisterForm = ({ otheruser, ...props }) => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState();

    useEffect(() => {
        if (success) {
            dispatch(getUsers());
            dispatch({ type: "CLEAR_SUCCESS" })
        }
    }, [success])

    const onSubmit = () => {
        const err = valid();
        setErrors(err);
        if (Object.keys(err).length === 0) {
            dispatch(createUser({ name, email, password }));
            setName("");
            setEmail("");
            setPassword("")
        }
    }

    const valid = () => {
        const errors = {};
        if (!name) errors.name = "Required";
        if (!email) errors.email = "Required";
        if (!password) errors.password = "Required";
        return errors;
    }

    const err = { ...errors };
    return (
        <Box maxW={["80%", " 60%", "40%"]} margin="auto" mt="50px" border="1px solid #f1e8e8" p="30px" borderRadius={"10px"}  {...props}>
            {otheruser && <Text fontSize={"18px"} fontWeight="bold" mb="10px">Add New User</Text>}
            <FormInput value={name} setValue={setName} placeholder="Name" error={err?.name} />
            <FormInput value={email} setValue={setEmail} type={"email"} placeholder="E-Mail Adress" error={err?.email} />
            <FormInput value={password} type={"password"} setValue={setPassword} placeholder="Password" error={err?.password} />
            <Button onClick={() => onSubmit()} w="100%" color={"white"} bg="green.400" _hover={{ bg: "green.600" }} mt="10px">Register</Button>
        </Box >
    )
}
export default RegisterForm

export const FormInput = ({ placeholder, value, setValue, error, type, ...props }) => {
    return (
        <Fragment>
            <Input onChange={(x) => setValue(x.target.value)} value={value} placeholder={placeholder} type={type} my="5px" />
            {error && <Text fontSize={"14px"} color="red" textAlign={"start"}>{error}</Text>}
        </Fragment>
    )
}