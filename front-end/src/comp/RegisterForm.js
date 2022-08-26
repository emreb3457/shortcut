import { Box, Input, Button, Text } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { createUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
const RegisterForm = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState();

    useEffect(() => {
        if (success) {
            navigation("/location")
            dispatch({ type: "CLEAR_SUCCESS" })
        }
    }, [success])

    const onSubmit = () => {
        const err = valid();
        setErrors(err);
        if (Object.keys(err).length === 0) {
            dispatch(createUser({ name, email, password }));
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
        <Box maxW={["80%", " 60%", "30%"]} margin="auto" mt="50px" border="1px solid #f1e8e8" p="30px" borderRadius={"10px"} >
            <FormInput value={name} setValue={setName} placeholder="Name" error={err?.name} />
            <FormInput value={email} setValue={setEmail} placeholder="E-Mail Adress" error={err?.email} />
            <FormInput value={password} setValue={setPassword} placeholder="Password" error={err?.password} />
            <Button onClick={() => onSubmit()} w="100%" color={"white"} bg="green.300" _hover={{ bg: "green.500" }} mt="10px">Register</Button>
        </Box >
    )
}
export default RegisterForm

export const FormInput = ({ placeholder, value, setValue, error, ...props }) => {
    return (
        <Fragment>
            <Input onChange={(x) => setValue(x.target.value)} value={value} placeholder={placeholder} my="5px" />
            {error && <Text fontSize={"14px"} color="red" textAlign={"start"}>{error}</Text>}
        </Fragment>
    )
}