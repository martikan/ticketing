import { Alert } from 'react-bootstrap'

/* EXAMPLE params
const hello = {
        title: 'Hey, nice to see you',
        body: 'Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
        footer: 'Whenever you need to, be sure to use margin utilities to keep things nice and tidy.',
        type: 'success'
}
*/

const BaseNotification = (props) => {
    const { type, title, body, footer } = props.notification

    return (
        <Alert variant={type}>
            <Alert.Heading>{title}</Alert.Heading>
            <p>{body}</p>
            {footer && (
                <>
                    <hr />
                    <p className='mb-0'>{footer}</p>
                </>
            )}
        </Alert>
    )
}

export default BaseNotification
