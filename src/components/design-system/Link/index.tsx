import Button, { ButtonType } from 'antd/lib/button';
import NLink from 'next/link';
import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation';

export interface ILink {
    href: string,
    button?: boolean,
    type?: ButtonType;
    icon?: React.ReactNode,
    children?: React.ReactNode
}
const Link: React.FC<ILink> = ({ href, children, button, type, icon }) => {
    const navigate = useNavigation();
    const handleClick = (e) => {
        navigate(href);
        e.preventDefault();
    }
    if (button) {
        return (
            <Button href={href} icon={icon} type={type ?? 'primary'} onClick={handleClick}>
                {children}
            </Button>
        );
    } else {
        return (
            <NLink href={href}>
                {children}
            </NLink>
        )
    }
}

export default Link;