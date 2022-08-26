import { Box, Input, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { loginUser } from "../actions/userActions";
import { FormInput } from "./RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { success } = useSelector(state => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState();

    useEffect(() => {
        if (success) {
            navigation("/location")
            dispatch({ type: "CLEAR_SUCCESS" })
        }
    }, [success])

    const onSubmit = async () => {
        const err = valid();
        setErrors(err);
        if (Object.keys(err).length === 0) {
            dispatch(loginUser({ email, password }));
        }
    }

    const valid = () => {
        const errors = {};
        if (!email) errors.email = "Required";
        if (!password) errors.password = "Required";
        return errors;
    }

    const err = { ...errors };
    return (
        <Box maxW={["80%", " 60%", "30%"]} margin="auto" mt="50px" border="1px solid #f1e8e8" p="30px" borderRadius={"10px"} >
            <FormInput value={email} setValue={setEmail} placeholder="E-Mail Adress" error={err.email} />
            <FormInput value={password} setValue={setPassword} placeholder="Password" error={err.password} />
            <Button onClick={() => onSubmit()} w="100%" color={"white"} bg="green.300" _hover={{ bg: "green.500" }} mt="10px">Login</Button>
        </Box >
    )
}
export default LoginForm

