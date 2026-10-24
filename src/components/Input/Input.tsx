import type { InputHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isSuccess?: boolean;
  showEye?: boolean;
  onEyeClick?: () => void;
}

export const Input = ({
  label,
  error,
  isSuccess,
  showEye,
  onEyeClick,
  className = '',
  ...props
}: InputProps) => {
  const inputClass = `input ${error ? 'input--error' : ''} ${isSuccess ? 'input--success' : ''}`;

  return (
    <div className={`input-wrapper ${className}`}>
      <label className="input-label">
        <span className="input-label-text">{label}:</span>
        <input className={inputClass} {...props} />
      </label>

      {showEye && (
        <button type="button" onClick={onEyeClick} className="input-eye-btn">
          <Icon
            name={props.type === 'password' ? 'icon-eye' : 'icon-eye-off'}
            size={20}
          />
        </button>
      )}

      {error && (
        <span className="input-error-msg">
          <Icon name="icon-error" size={14} /> {error}
        </span>
      )}
      {isSuccess && (
        <span className="input-success-msg">
          <Icon name="icon-check" size={14} /> {props.value ? 'Valid' : ''}
        </span>
      )}
    </div>
  );
};
