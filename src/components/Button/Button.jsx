import PropTypes from "prop-types";

function Button({ type, name, onBtnClick, className }) {
  return (
    <button className={className} type={type} onClick={onBtnClick}>
      {name}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBtnClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
