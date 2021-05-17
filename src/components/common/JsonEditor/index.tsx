import { EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import prompt from "antd-prompt";
import dynamic from "next/dynamic";
import React from 'react';
import { InteractionProps } from "react-json-view";
import ClientOnly from '../ClientOnly';


const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

export interface IJsonEditor {
    onChange?: any;
    readOnly?: boolean;
    value?: any;
    name?: string;
}
const JsonEditor: React.FC<IJsonEditor> = ({ onChange, readOnly, value, name }) => {

    let handleChange: any = (data: InteractionProps) => {
        if (readOnly) {
            return false;
        }

        if (onChange != null) {
            onChange(data?.updated_src);
        }
    }

    if (readOnly) {
        handleChange = false;
    }

    const handlePrompt = async () => {
        try {
            const dataString = await prompt({
                title: "Enter raw json",
                placeholder: "JSON data",
                rules: [
                    {
                        required: true,
                        message: "You must enter json"
                    }
                ]
            });
            try {
                let jsonData = JSON.parse(dataString as any);
                onChange(jsonData);
            } catch (e) {
                message.error("Invalid json data entered");
            }

        } catch (e) {

        }
    }



    return (
        <ClientOnly>
            {!readOnly && <Button size='small' onClick={handlePrompt} type='ghost'><EditOutlined /></Button>}
            <DynamicReactJson onAdd={handleChange} enableClipboard={!readOnly} onDelete={handleChange} onEdit={handleChange} name={name ?? false} src={value ?? {}} theme="monokai" />

        </ClientOnly>
    )
}

export default JsonEditor