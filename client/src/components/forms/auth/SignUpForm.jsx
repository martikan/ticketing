import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useRequest from '../../../hooks/request_hook'
import { useState } from 'react'
import * as Yup from 'yup'

const SignUpForm = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email address is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 4 characters long')
            .max(64, 'Password must be at max 64 characters long'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { doRequest, requestErrors } = useRequest({
        url: '/api/v1/auth/signup',
        method: 'post',
        body: {
            email,
            password
        }
    })

    const onSubmit = async (data, event) => {
        event.preventDefault()

        await doRequest()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {requestErrors}
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    {...register('email')}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Form.Label className='invalid-feedback'>{errors.email?.message}</Form.Label>
                <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Form.Label className='invalid-feedback'>{errors.password?.message}</Form.Label>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    {...register('confirmPassword')}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                />
                <Form.Label className='invalid-feedback'>{errors.confirmPassword?.message}</Form.Label>
            </Form.Group>
            <Button variant='primary' type='submit' style={{ marginRight: '4px' }}>
                Sign up
            </Button>
            <Button variant='warning' onClick={() => reset()}>
                Reset
            </Button>
        </Form>
    )
}

export default SignUpForm
