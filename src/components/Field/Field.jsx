import { Label } from '@/components/Label';

import styles from './Field.module.css';

function Field({ className = '', ...props }) {
  return (
    <div
      className={`${styles.field} ${className}`}
      {...props}
    />
  );
}

function FieldLabel({ className = '', ...props }) {
  return (
    <Label
      className={`${className}`}
      {...props}
    />
  );
}

function FieldContent({ className = '', ...props }) {
  return (
    <div
      className={`${styles.content} ${className}`}
      {...props}
    />
  );
}

function FieldDescription({ className = '', ...props }) {
  return (
    <p
      className={`${styles.description} ${className}`}
      {...props}
    />
  );
}

export {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
};
