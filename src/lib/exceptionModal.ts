import { Modal } from 'antd';

export function exceptionModal(title, e) {
    try {
        if (e.getMessage() != null) {
            Modal.error({
                title: title,
                content: (
                    e.getMessage()
                ),
                onOk() { },
            });
        }
    } catch (e) {
        Modal.error({
            title: title,
            onOk() { },
        });

    }
}

export default exceptionModal