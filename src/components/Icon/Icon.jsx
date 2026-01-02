import { ICONS } from './icons';
import styles from './Icon.module.css';

function Icon({ name, className = '', ...props }) {
  const IconComponent = ICONS[name];
  if (!IconComponent) {
    console.error(`Icon ${name} 아이콘을 찾을 수 없습니다.`);
    return null;
  }

  return <IconComponent className={`${styles.icon} ${className}`} {...props} />;
}

export { Icon };
