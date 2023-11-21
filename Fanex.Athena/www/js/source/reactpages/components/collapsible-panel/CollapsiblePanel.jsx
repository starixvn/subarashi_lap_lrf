import React from 'react';
import PropTypes from 'prop-types';

class CollapsiblePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: props.isInitCollapsed
        };
    };

    static propTypes = {
        stickyFooter: PropTypes.node,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
        isCollapseMode: PropTypes.bool,
        isInitCollapsed: PropTypes.bool,
        isCustomCollapse: PropTypes.bool
    }

    onClick = () => {
        const newState = !this.state.isCollapsed;

        const { onCollapse, onExpand } = this.props;
        if (newState) {
            onCollapse && onCollapse();
        }

        this.setState({ isCollapsed: newState }, () => {
            window.dispatchEvent(new Event('resize'));
            if (!newState) {
                onExpand && onExpand();
            }
        });
    }

    render() {
        const { stickyFooter, iconContainerStyle, iconToggle, isCustomCollapse } = this.props;
        const { tag, className, style, ...attrs } = iconToggle;
        const IconTag = tag;
        const iconStyle = style || {
            transform: this.state.isCollapsed ? null : 'rotate(180deg)',
            color: '#fff',
            textAlign: 'center',
            background: '#4c6274',
            height: "15px",
            width: "20px",
            float: 'left'
        };

        const contendStyle =  isCustomCollapse ? {display: 'block'} : { display: this.state.isCollapsed ? 'none' : 'block' }

        return (
            <div className={`${this.props.className}`}>
                <div style={contendStyle}>
                    {this.props.children}
                </div>
                <div className='caret-block'>
                    {stickyFooter}
                </div>
                {!!this.props.isCollapseMode && <div className="filter-handle" style={iconContainerStyle} onClick={this.onClick}>
                    <IconTag className={className} style={iconStyle} {...attrs} />
                </div>
                }
            </div>
        )
    }
}

const propTypes = {
    stickyFooter: PropTypes.node,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    iconToggle: PropTypes.object,
    isCollapseMode: PropTypes.bool,
    isInitCollapsed: PropTypes.bool,
    isCustomCollapse: PropTypes.bool
}
const defaultProps = {
    iconContainerStyle: {
        height: '15px',
        width: '20px',
        cursor: 'pointer',
        position: 'absolute',
        left: 'calc(50% - 10px)',
        bottom: 0,
        background: '#4c6274',
        textAlign: 'center'
    },
    iconToggle: {
        tag: 'i',
        className: 'icon-arrow',
        style: null
    },
    isCollapseMode: true,
    isInitCollapsed: false,
    isCustomCollapse: false
};

CollapsiblePanel.propTypes = propTypes;
CollapsiblePanel.defaultProps = defaultProps;

export default CollapsiblePanel;