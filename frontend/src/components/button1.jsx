import PropTypes from 'prop-types';
import Icon from './iconManager';

const Button1 = ({ onClick, label, className, iconName, img, imgClass, style, id }) => {
  return (
    <button id={id} className={`button1 ${className}`} onClick={onClick} style={{position:"relative"}}>
      <div className='outer' style={style}>
        {iconName ? (
          <Icon name={iconName} className={`placeholder my-auto ${imgClass}`} />
        ) : img ? (
          <img src={img} className={`placeholder my-auto me-2 ${imgClass}`} style={{height:"24px"}} alt="" />
        ) : null}
        {label}
      </div>
        <div className='inner'></div>
    </button>
  );
};

Button1.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  img: PropTypes.string,
  imgClass: PropTypes.string,
  id: PropTypes.string
};

export default Button1;