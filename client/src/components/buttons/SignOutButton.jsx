import { Button } from 'react-bootstrap'
import { Router } from 'react-router'
import useRequest from '../../../hooks/request_hook'

const SignOutButton = (props) => {
    const { doRequest } = useRequest({
        url: '/api/v1/auth/signin',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    })

    const { variant } = props.data

    // FIXME: If no current user then it should be invisible
    return (
        <Button variant={variant} onClick={doRequest}>
            Sign out
        </Button>
    )
}

export default SignOutButton
