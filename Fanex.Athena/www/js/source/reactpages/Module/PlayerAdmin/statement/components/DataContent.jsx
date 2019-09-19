import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper';
import Service, { BreadcrumbText, Level } from '../lib/service';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import Timer from '@jsroot/components/utils/timer';
import { Breadcrumb } from '@9softstudio/react-breadcrumb';

export class DataContent extends PureComponent {
    constructor(props) {
        super(props);

        this.contentRef = React.createRef();

        this.state = {
            src: '',
            height: document.body.clientHeight,
            level: Level.level1,
            isDrilldown: false
        }

        this.resize = Timer.debounce(this._handleResize, 15).bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.requestParam !== this.props.requestParam) {
            this._getUrl(this.props.requestParam);
        }

        if (prevState.src !== this.state.src) {
            this.props.toggleLoader(false);
        }
    }

    componentDidMount() {
        this._getUrl(this.props.requestParam);
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    _handleResize(event) {
        event && event.preventDefault();

        if (this.contentRef.current) {
            const height = window.innerHeight - this.contentRef.current.getBoundingClientRect().top - 20;

            this.setState({ height: height });
        }
    }

    _updateSrc(src) {
        this.setState({ src: src, level: Level.level1, isDrilldown: false });
    }

    _handleError() {
        Service.showErrorMsg();
        this.props.toggleLoader(false);
    }

    _getUrl(param) {
        this.props.toggleLoader(true);

        Service.getData(param, this._updateSrc.bind(this), this._handleError.bind(this));
    }

    _renderBreadcrumb() {
        const items = [{
            label: BreadcrumbText.level1,
            value: Level.level1,
            }, {
                label: BreadcrumbText.level2,
                value: Level.level2,
            }, {
                label: BreadcrumbText.level3,
                value: Level.level3
            }
        ];

        const level = this.state.level;

        return <Breadcrumb items={items} value={level} onChange={this.onBack} />
    }

    onBack = (item) => {
        const level = this.state.level;
        const newLevel = item.value;
        let step = -1;

        if (level === Level.level3 && newLevel === Level.level1) {
            step = -2;
        }

        this.setState({ level: newLevel, isDrilldown: false }, () => window.history.go(step));
    }

    onLoad = (e) => {
        if (!this.state.isDrilldown) {
            this.setState({ isDrilldown: true }, () => this._handleResize());
            return;
        }

        const level = this.state.level; 
        let newLevel = level;

        if (level === Level.level1) {
            newLevel = Level.level2;
        }
        else if (level === Level.level2) {
            newLevel = Level.level3;
        }

        this.setState({ level: newLevel }, () => this._handleResize());
    }

    render() {
        const { src, height } = this.state;

        return (
            <div>
                {this._renderBreadcrumb()}
                {
                    src
                    ? <iframe frameBorder="0" src={src} width="100%" height={height} onLoad={this.onLoad} ref={this.contentRef} />
                    : <NoDataTitle />
                }
            </div>
        );      
    }
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader } = ActionCreators;
    return bindActionCreators({ toggleLoader }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataContent);