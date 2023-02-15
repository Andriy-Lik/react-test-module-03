import React from "react";
import PropTypes from 'prop-types';
import './IconButton.css';

const IconButton = ({ children, onClick, ...allyProps }) => (
    <button type="button" className="IconButton" onClick={onClick} {...allyProps}>
        {children}
    </button>
);

IconButton.defaultProps = {
    onclick: () => null,
    children: null,
};

IconButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    'aria-label': PropTypes.string.isRequired,
};

export default IconButton;