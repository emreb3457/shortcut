import { Box, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { loginUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useValidate } from "../hooks/useValidate";
import FormInput from "../comp/FormInput"

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { success } = useSelector(state => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState();
    const { errors } = useValidate({ email, password });

    useEffect(() => {
        if (success) {
            navigation("/location")
            dispatch({ type: "CLEAR_SUCCESS" })
        }
    }, [success])

    const onSubmit = async () => {
        setFormError(errors)
        const err = { ...errors };
        if (Object.keys(err).length === 0) {
            dispatch(loginUser({ email, password }));
        }
    }

    const err = { ...formError };
    return (
        <Box maxW={["80%", " 60%", "30%"]} margin="auto" mt="50px" border="1px solid #f1e8e8" p="30px" borderRadius={"10px"} >
            <FormInput value={email} setValue={setEmail} placeholder="E-Mail Adress" error={err.email} />
            <FormInput value={password} type={"password"} setValue={setPassword} placeholder="Password" error={err.password} />
            <Button onClick={() => onSubmit()} w="100%" color={"white"} bg="green.400" _hover={{ bg: "green.600" }} mt="10px">Login</Button>
        </Box >
    )
}
export default LoginForm

