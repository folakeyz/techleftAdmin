import React, { useEffect } from 'react'
import styles from './modal.module.css'

const Modal = ({ isVisible = false, title, content, footer, onClose, size = "md" }) => {
    const keydownHandler = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    return !isVisible ? null : (
        <div className={styles.modal} onClick={onClose}>
            <div className={`${styles.modalDialog} ${styles[size]}`} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <span className={styles.modalClose} onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.modalContent}>{content}</div>
                </div>
                {footer && <div className={styles.modalFooter}>{footer}</div>}
            </div>
        </div>
    );
};

export default Modal