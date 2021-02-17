import React, {useState} from 'react';
import logo from '../logo.svg'
import './Form.css';

const DEFAULT_INPUTS = []

export function Form() {
    const [state, setState] = useState(DEFAULT_INPUTS)

    function handleCreateInputField(e) {
        e.preventDefault()
        if (state.length <= 10) {
            setState(() => [...state, {name: `field${state.length + 1}`, value: '', invalid: false}])
        }
    }

    const handleChange = e => {
        let newState = state.map((item) => item.name === e.target.name ? {
            ...item,
            value: (e.target.value).replace(/[^A-Za-zА-Я-а-я]/, '')
        } : item)
        setState(newState)
    };


    const handleSubmitForm = e => {
        e.preventDefault()

        const isFormInvalid = state.find(item => item.value.length < 1);

        if (isFormInvalid) {
            setState(state.map((item) => item.value.length < 1 ? {
                ...item,
                invalid: true
            } : item))
        } else {
            console.log(state)
        }
    }

    return (
        <div className="formContainer">
            <img src={logo} className="logo"/>
            <form className="form" onSubmit={handleSubmitForm}>
                <div className="inputList">
                    {state.length ? state.map((item, i) => (
                        <div key={i}>
                            <input
                                type="text"
                                name={item.name}
                                value={item.value}
                                onChange={(e) => handleChange(e)}
                                aria-invalid={item.invalid ? 'true' : undefined}
                            />
                        </div>
                    )) : null}

                    <div className="buttonContainer">
                        <button className="submitButton button" type="submit"
                                disabled={state.length < 1 ? true : false}>
                            Submit
                        </button>
                        <button className="addInputButton button" disabled={state.length === 10 ? true : false}
                                onClick={handleCreateInputField}>Add input
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


