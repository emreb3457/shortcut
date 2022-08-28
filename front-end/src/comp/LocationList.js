import { Box, list, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const LocationList = ({ listitem, select }) => {

    const [active, setActive] = useState("");

    return (
        <Box>
            {listitem?.map((item, index) =>
                <Box key={index} cursor="pointer" onClick={() => { select([item.lng, item.lat]); setActive(item) }} borderBottom="1px solid black" bg={active == item ? "#a8df80b8" : "#f4f4f4bf"} p="20px">
                    <Text>{item?.name}</Text>
                </Box>
            )
            }

        </Box >
    )
}
export default LocationList