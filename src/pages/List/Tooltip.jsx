import { useState } from "react";
import styles from './Tooltip.module.css'

export function Tootip({ text, children }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.tooltip}
         onMouseEnter={() => setVisible(true)}
         onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && text && <div className={styles.tooltiptext}>{text}</div>}
        </div>
    );
}