import { ICONS } from './icons';
import styles from './Icon.module.css';

<<<<<<< HEAD
function Icon({ name, className = '', ...props }) {
=======
function Icon({name, className = '', ...props}) {
>>>>>>> origin/main
  const IconComponent = ICONS[name];
  if (!IconComponent) {
    console.error(`Icon ${name} 아이콘을 찾을 수 없습니다.`);
    return null;
  }
<<<<<<< HEAD

  return <IconComponent className={`${styles.icon} ${className}`} {...props} />;
}

export { Icon };
=======
  
  return <IconComponent className={`${styles.icon} ${className}`} {...props} />;
}

export { Icon}
>>>>>>> origin/main
