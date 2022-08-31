import { Box, Button, Select, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { setLocation } from "../actions/locationActions";
import FormInput from "../comp/FormInput"
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/userActions";
import { toast } from 'react-toastify';
import { useValidate } from "../hooks/useValidate";

const AddLocationForm = ({ location, ...props }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [name, setName] = useState("");
    const [selectUser, setUser] = useState("");
    const [formError, setFormError] = useState();
    const { errors } = useValidate({ location, selectUser, user });

    const sessionuser = JSON.parse(sessionStorage.getItem("sessionUser"))

    useEffect(() => {
        dispatch(getUsers());
    }, [location])

    const onSubmit = async () => {
        setFormError(errors)
        const err = { ...errors };
        err.location && toast.error(err.location)
        if (Object.keys(err).length === 0) {
            dispatch(setLocation({ lng: location[0], lat: location[1], id: selectUser, name }));
        }
    }

    const err = { ...formError };
    return (
        <Box maxW={["80% ", " 60% ", "30% "]} margin="auto" mt="50px" border="1px solid #f1e8e8" p="30px" borderRadius={"10px"} {...props} >
            < Text fontSize={"18px"} fontWeight="bold" mb="10px" > Add New Location</Text >
            <FormInput value={name} setValue={setName} placeholder="Location Name" error={err.name} />
            <Select onChange={(x) => setUser(x.target.value)} defaultValue="" >
                <option value="" disabled >Choose here</option>
                {user?.result?.map(x =>
                    sessionuser.user._id !== x._id && <option key={x._id} value={x._id}>{x.name} - {x.email}</option>
                )}
            </Select>
            <Button onClick={() => onSubmit()} w="100%" color={"white"} bg="green.400" _hover={{ bg: "green.600" }} mt="10px">Save</Button>
        </Box >
    )
}
export default AddLocationForm

