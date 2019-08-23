import React, { PureComponent, createRef } from 'react';
import Overlay from './Overlay';
import PropTypes from 'prop-types';

export default class Balloon extends PureComponent {
    constructor(props) {
        super(props);

        this.box = createRef();

        this.state = {
            top: 0,
            left: 0,
            updatedPosition: true
        }
    }

    static propTypes = {
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
        msg: PropTypes.string,
        targetTop: PropTypes.number,
        targetLeft: PropTypes.number,
        width: PropTypes.number,
        excludeOutSideComponents: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        isOpen: false,
        msg: '',
        targetTop: 0,
        targetLeft: 0,
        width: 0,
    }

    componentDidUpdate(prevProps) {
        if (!this.state.updatedPosition) {
            const { targetTop, targetLeft, width } = this.props;

            this.setState({
                left: targetLeft - width / 2,
                top: targetTop - (this.box.current ? this.box.current.clientHeight : 0) - 20,
                updatedPosition: true
            });
        }

        if (!prevProps.isOpen && this.props.isOpen
            && (prevProps.targetTop !== this.props.targetTop || prevProps.targetLeft !== this.props.targetLeft || prevProps.msg !== this.props.msg)) {
            this.setState({ updatedPosition: false });
        }
    }

    render() {
        const { msg, targetTop, targetLeft, width, isOpen, onClose, excludeOutSideComponents } = this.props;
        const { top, left } = this.state;

        return (
            <Overlay isOpening={isOpen} onClose={onClose} excludeOutSideComponents={excludeOutSideComponents}>
                <div className='balloon' style={{ top: top, left: left }} ref={this.box} >
                    <div className='balloon-msg' style={{ width: width }}>{msg}</div>
                    <div className='balloon-arrow-border' style={{ left: (width - 10) / 2 }}></div>
                    <div className='balloon-arrow' style={{ left: (width - 10) / 2 }}></div>
                </div>
            </Overlay>
        )
    }
}