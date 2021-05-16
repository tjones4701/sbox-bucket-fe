

import React, { useEffect } from 'react'

export interface IPrompt {
    defaultValue?: string;
    question: string;
    onChange: (value: string) => void;
}
const Prompt: React.FC<IPrompt> = ({ question, defaultValue, onChange }) => {

    useEffect(() => {
        try {
            let message = window.prompt(question, defaultValue);
            onChange(message);
        } catch (e) {

        }
    }, [defaultValue, question, onChange])

    return <></>;
}

export default Prompt