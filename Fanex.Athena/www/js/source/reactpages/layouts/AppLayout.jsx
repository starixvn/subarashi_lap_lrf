import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const AppLayout = (props) => {
    const className = classNames(props.className, "container-fluid")
    return (
      <div id="container" className={className}>
        {props.children}
      </div>
    ); 
}

const propTypes = {
  className: PropTypes.string
};

AppLayout.propTypes = propTypes;

export default AppLayout;