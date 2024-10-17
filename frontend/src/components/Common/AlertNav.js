import { Alert, AlertIcon, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"


export const AlertNav = () => {
    const {user} = useSelector(state => state.GetUser);
    return (
        <Alert status='info'>
            <AlertIcon />
            { user && user.isEmailVerified? 
            <Text> For Free version you have to wait 60 seconds for first visit. If there is any error please reach out us via contact us form in home page </Text>
            : <Text>Please <Text as='a' textDecoration={'underline'} href="/verify-email" >verify</Text> this e-mail</Text>
            }
        </Alert>
    )
}