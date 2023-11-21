import React from 'react';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from './constants';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Popup = (props) => {
    const { title, isShow, width, height, isHtml, children, iframeUrl, isShowTitle, className } = props;
    let content;
    if (iframeUrl) {
        content = (<iframe frameBorder="0" src={iframeUrl} width="100%" height="100%" />);
    }
    else {
        content = isHtml ?
            (<div className='popup-content' dangerouslySetInnerHTML={{ __html: children }} />) :
            (<div className='popup-content'>{children}</div>)
    }
    
    const classes = classNames('popup-container', isShow ? 'show' : 'hide', className)

    return (
    <div className={classes} onClick={props.onClick}>
        <div className='popup-block-body'></div>
        <div className='flat-popup' style={{ height: height, width: width }}>
            {isShowTitle && (<div className='popup-title'>
                <div className="txt-title">{title}</div>
                <a className="popup-close" onClick={() => { props.onClose && props.onClose() }}><i className="icon-close"></i></a>
            </div>)}
            {content}
        </div>
    </div >
    )
}

Popup.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    isShow: PropTypes.bool,
    onClose: PropTypes.func,
    isHtml: PropTypes.bool,
    iframeUrl: PropTypes.string,
    onClick: PropTypes.func,
    isShowTitle: PropTypes.bool,
    className: PropTypes.string
}

Popup.defaultProps = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    isShow: false,
    isHtml: false,
    iframeUrl: null,
    isShowTitle: true
}

export default Popup;
