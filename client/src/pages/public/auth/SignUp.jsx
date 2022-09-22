import SignUpForm from '../../../components/forms/auth/SignUpForm'
import BaseNotification from '../../../components/notifications/BaseNotification'

const InfoNotification = () => {
    const notificationProps = {
        title: 'Sign up',
        body: 'Please fill out the form to sign up.',
        footer: "We won't share your data with any third party companies.",
        type: 'info'
    }

    return <BaseNotification notification={notificationProps} />
}

const SignUp = () => {
    return (
        <>
            <InfoNotification />
            <SignUpForm />
        </>
    )
}

export default SignUp
