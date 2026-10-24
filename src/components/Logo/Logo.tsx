import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

export const Logo = () => {
  return (
    <Link to="/">
      {/* Для мобільних */}
      <Icon name="icon-logo-m" size={24} className="logo-mobile" />
      {/* Для планшетів та десктопів */}
      <div className="logo-desktop">
        <Icon name="icon-logo-m" size={24} />
        <span>READ JOURNEY</span>
      </div>
    </Link>
  );
};
