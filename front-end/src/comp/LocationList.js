import { Box, list, Text } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react";

const LocationList = ({ listitem, select }) => {

    const [active, setActive] = useState("");

    return (
        <Box maxH={"90vh"} overflow="scroll" overflowX={"hidden"} >
            {listitem?.map((item, index) =>
                    <Box key={index} cursor="pointer" onClick={() => { select(item); setActive(item) }} borderBottom="1px solid #d0cdcd" bg={active == item ? "#a8df80b8" : "#f4f4f4bf"} p="20px">
                        <Text>{item?.name}</Text>
                    </Box>
            )
            }

        </Box >
    )
}
export default LocationList