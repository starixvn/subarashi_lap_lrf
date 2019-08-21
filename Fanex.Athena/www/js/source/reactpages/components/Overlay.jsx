import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const wrapperClasses = {
    OVERLAY: "overlay",
    OVERLAY_OPEN: "overlay-open"
}

export default class Overlay extends Component {
    constructor(props) {
        super(props);

        this.containerElement = null;
        this.refHandlers = {
            container: (ref) => { this.containerElement = ref }
        }

        this.state = {
            isOpening: this.props.isOpening
        }
    }

    static propTypes = {
        closeOnOutsideClick: PropTypes.bool,
        isOpening: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        excludeOutSideComponents: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        closeOnOutsideClick: true,
        isOpening: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpening !== prevProps.isOpening) {
            const { onOpen } = this.props;
            this.props.isOpening && onOpen && onOpen();
            this.setState({ isOpening: this.props.isOpening });

            window.setTimeout(() => {
                if (this.props.isOpening) {
                    this._registerEvents();
                }
                else {
                    this._unRegisterEvents();
                }
            }, 0);
        }
    }

    componentWillUnmount() {
        this._unRegisterEvents();
    }

    _registerEvents() {
        const { closeOnOutsideClick } = this.props;

        if (closeOnOutsideClick) {
            document.addEventListener('click', this._handleClickOutSide);
        }
    }

    _unRegisterEvents = () => {
        const { closeOnOutsideClick } = this.props;

        if (closeOnOutsideClick) {
            document.removeEventListener('click', this._handleClickOutSide);
        }
    }

    _handleClickOutSide = (event) => {
        const clickOutside = !((this.containerElement && this.containerElement.contains(event.target))
            || (this.props.excludeOutSideComponents && this.props.excludeOutSideComponents.indexOf(event.target) >= 0));

        if (clickOutside && this.state.isOpening) {
            this._close();
        }
    }

    _close() {
        const { onClose } = this.props;
        this.setState({ isOpening: false }, () => onClose && onClose());
    }

    render() {
        const { className, children } = this.props;
        const mergedClassName = classNames(
            wrapperClasses.OVERLAY,
            {
                [wrapperClasses.OVERLAY_OPEN]: this.state.isOpening
            },
            className
        );
        const style = {
            display: this.state.isOpening ? "block" : "none"
        }

        return (
            <div className={mergedClassName} style={style} ref={this.refHandlers.container}>
                {children}
            </div>
        )
    }
}