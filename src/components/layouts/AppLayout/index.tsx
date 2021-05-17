import { CodeOutlined } from "@ant-design/icons";
import Breadcrumb from "antd/lib/breadcrumb";
import React, { ReactNode } from "react";
import "reflect-metadata";
import { ApplicationConfig } from "../../../lib/config";
import RequiresAuthentication from "../../common/RequiresAuthentication";
import Link from "../../design-system/Link";
import styles from "./styles.module.scss";

export interface IAppLayout {
    children?: ReactNode,
    breadcrumbs?: {
        name: string,
        href?: string,
    }[]
}

const AppLayout: React.FC<IAppLayout> = ({ children, breadcrumbs }) => {

    breadcrumbs = breadcrumbs ?? [
        {
            name: "Home",
            href: "/home"
        }
    ];
    let breadcrumb = null;
    if ((breadcrumbs ?? [])?.length > 0) {
        breadcrumb = (
            <Breadcrumb>
                {breadcrumbs?.map((item, index) => {
                    let inner: any = item.name;
                    if ((item?.href ?? "").length > 0) {
                        inner = <Link href={item.href}>{item.name}</Link>
                    }

                    return (
                        <Breadcrumb.Item key={index}>{inner}</Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        );
    }
    return (
        <RequiresAuthentication>
            <div className={styles['app']}>
                <div className={styles['app-bar']}>
                    <div className={styles['app-bar-logo']}>
                        SBucket
                </div>
                    <div className={styles['app-bar-actions']}>
                        <div>
                            <Link type='ghost' icon={<CodeOutlined />} button href={`${ApplicationConfig.get('DOCUMENTATION_URL') ?? '/'}`}>Apis</Link>
                        </div>
                    </div>
                </div>
                <div className={styles['page']}>
                    <div className={styles['sidebar']}>

                    </div>
                    <div className={styles['content-container']}>
                        <div className={styles['content']}>
                            <br />
                            {breadcrumb}
                            <br />
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </RequiresAuthentication>
    )
};

export default AppLayout
