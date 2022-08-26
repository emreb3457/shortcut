import { Box, Img, Button, } from "@chakra-ui/react"
import RegisterForm from "../comp/RegisterForm"
import logo from "../assets/logo.png"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/userActions";
import LoginForm from "../comp/LoginForm";
const Home = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth);
    const [loginBtn, setLoginBtn] = useState(false);
    useEffect(() => {
        dispatch(getUsers());
    }, [])
    return (
        <Box >
            <Box mt="100px" textAlign={"center"}>
                <Img src={logo} margin="auto" boxShadow={"0px 6px 25px -6px rgba(0,0,0,0.67)"} />
                {loginBtn ?
                    user?.result.length !== 0 ? <LoginForm />
                        :
                        <RegisterForm />
                    :
                    <Button onClick={() => setLoginBtn(true)} w="30%" color={"white"} bg="green.300" _hover={{ bg: "green.500" }} textTransform={"uppercase"} mt="100px" isLoading={loading} >Login</Button>
                }
            </Box>
        </Box>
    )
}
export default Home