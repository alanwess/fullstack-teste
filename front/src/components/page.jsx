import { useState } from 'react';
import Error from './error'

const Page = () => {
    const [ messageError, setMessageError ] = useState('')
    const [ showErrors, setShowErrors ] = useState(false)
    const [ jsonTarget, setJsonTarget ] = useState()
    const [ responseJson, setResponseJson ] = useState({})

    const handleError = () => {
        setShowErrors(false)
    }

    const handleJson = async () => {
        try {
            const response = await fetch(`http://localhost:3001/process_json`, {
                method: "POST",
                body: JSON.stringify({
                    target_json: JSON.stringify(jsonTarget)
                })
            }) 

            const returned_response = await response.json()
            console.log(returned_response)

            if (!returned_response?.success){
                setShowErrors(true)
                setMessageError(returned_response.error)
            }

            if (returned_response?.success){
                setResponseJson(JSON.parse(returned_response.data))
            }
        } catch (error) {
            setShowErrors(true)
            setMessageError(error.toString())
        }
    }

    return (
        <div className="code-processor">
            <textarea
                value={JSON.stringify(jsonTarget, null, 2)}
                onChange={(e) => setJsonTarget(JSON.parse(e.target.value))}
                style={{ width: 400, height: 550 }}
            />
            <button 
                style={{ width: 30, height: 550 }}
                onClick={handleJson}
            >
                {'>>'}
            </button>
            <textarea
                value={JSON.stringify(responseJson, null, 2)}
                readOnly
                style={{ width: 400, height: 550 }}
            />
            {showErrors && (
                <Error message={messageError} onSetHideToast={handleError} />
            )}
        </div>
    )
}

export default Page