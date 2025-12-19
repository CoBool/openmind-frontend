import styles from './Card.module.css';

function Card({ className, ...props }) {
  return <div className={`${styles.card} ${className}`} {...props} />;
}

function CardHeader({ className, ...props }) {
  return <div className={`${styles.cardHeader} ${className}`} {...props} />;
}

function CardTitle({ className, ...props }) {
  return <div className={`${styles.cardTitle} ${className}`} {...props} />;
}

function CardDescription({ className, ...props }) {
  return (
    <div className={`${styles.cardDescription} ${className}`} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return <div className={`${styles.cardContent} ${className}`} {...props} />;
}

function CardFooter({ className, ...props }) {
  return <div className={`${styles.cardFooter} ${className}`} {...props} />;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
