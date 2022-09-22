import { useState } from 'react'
import axios from 'axios'

const useRequest = ({ url, method, body, onSuccess }) => {
    const [requestErrors, setRequestErrors] = useState(null)

    const doRequest = async () => {
        setRequestErrors(null)

        await axios[method](url, body)
            .then((res) => {
                if (onSuccess) {
                    onSuccess(res.data)
                }

                return res.data
            })
            .catch((err) => {
                if (err.response.data.errors) {
                    setRequestErrors(
                        <div className='alert alert-danger'>
                            <h4>Ooops</h4>
                            <ul className='my-0'>
                                {err.response.data.errors.map((err) => (
                                    <li key={err.message}>{err.message}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            })
    }

    return { doRequest, requestErrors }
}

export default useRequest
