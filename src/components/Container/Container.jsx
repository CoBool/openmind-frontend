import styles from './Container.module.css';

function Container({ className = '', children }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export default Container;
