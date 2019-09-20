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
            height: 0,
            level: Level.level1
        }

        this.isDrilldown = false;
        this.resize = Timer.debounce(this._handleResize, 15).bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.requestParam !== this.props.requestParam) {
            this._getUrl(this.props.requestParam);
        }
    }

    componentDidMount() {
        this._getUrl(this.props.requestParam);
        this._handleResize();
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
        this.isDrilldown = false;
        this.setState({ src: src, level: Level.level1 });
    }

    _handleError() {
        Service.showErrorMsg();
        this.props.toggleLoader(false);
    }

    _getUrl(param) {
        this.props.toggleLoader(true);

        Service.getData(param, this._updateSrc.bind(this), () => this.props.toggleLoader(false), this._handleError.bind(this));
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

        this.isDrilldown = false;
        this.setState({ level: newLevel }, () => window.history.go(step));
    }

    onLoad = (e) => {
        if (!this.isDrilldown) {
            this.isDrilldown = true;
            return;
        }

        const level = this.state.level; 

        if (level === Level.level1) {
            this.setState({ level: Level.level2 }, () => this._handleResize());
        }
        else if (level === Level.level2) {
            this.setState({ level: Level.level3 });
        }   
    }

    render() {
        const { src, height } = this.state;

        return (
            <div>
                {this._renderBreadcrumb()}
                <div style={{ height: height }} ref={this.contentRef}>
                {
                    src
                    ? <iframe frameBorder="0" src={src} width="100%" height="100%" onLoad={this.onLoad} />
                    : <NoDataTitle />
                }
                </div>
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