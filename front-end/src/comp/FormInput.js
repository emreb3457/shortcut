import { Input, Text } from "@chakra-ui/react"
import { Fragment } from "react"

const FormInput = ({ placeholder, value, setValue, error, type, ...props }) => {
    return (
        <Fragment>
            <Input onChange={(x) => setValue(x.target.value)} value={value} placeholder={placeholder} type={type} my="5px" />
            {error && <Text fontSize={"14px"} color="red" textAlign={"start"}>{error}</Text>}
        </Fragment>
    )
}

export default FormInput