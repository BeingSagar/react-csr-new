import React from 'react';

import PropTypes from 'prop-types';
import {
    connect
} from 'react-redux';

import ClaimListStyles from './claimList.scss';
import LoaderWrapper from 'AppComponents/Loader/LoaderWrapper';
import claimListActions from 'AppActions/claimList';
import URLS from 'AppConstants/api-urls';
import {
    LOCAL_STORAGE_USER_KEY
} from 'AppConstants/app';

import moment from 'moment';
import SmartDataTable from 'react-smart-data-table'
import MultiSelect from "@khanacademy/react-multi-select";
import InputRange from 'react-input-range';
import $ from 'jquery';


class ClaimList extends React.Component {
    state = {
        selectedRow: {},
        min: 0,
        max: 86399,
        step: 1,
        currentValue: [0, 86399],
        selected: [],
        tableData: [],
        providerTypeOptions: [],
        showGraph: false,
        originalComment: '',
        sliderFilter: {
            min: 1,
            max: 86398,
        }
    };

    constructor(props) {
        super(props);
        this.SHOW_COLUMNS = {
            'assigned_to.first_name': {
                'invisible': true
            },
            'assigned_to.id': {
                'invisible': true
            },
            'assigned_to.last_name': {
                'invisible': true
            },
            'created_at': {
                'invisible': true
            },
            'updated_at': {
                'invisible': true
            },
            'id': {
                'invisible': true
            },
            'assigned_to.username': {
                'text': 'Assigned To'
            }
        };
        this.claimList = [];
        this.handleClick = this.handleClick.bind(this);
        this.assignCase = this.assignCase.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
        this.initializeGraph = this.initializeGraph.bind(this);
        this.applyProviderTypeFilters = this.applyProviderTypeFilters.bind(this);
        this.applySliderFilter = this.applySliderFilter.bind(this);
    }

    /**
     * Overide for react life cycle event
     * @memberof ClaimList
     */
    componentDidMount() {
        this.props.getDataList();
    }

    /**
     * Assign a claim object
     * @param {*} claimObject
     * @memberof ClaimList
     */
    assignCase(claimObject) {
        localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        fetch(
            URLS.assignCaseUrl(this.state.selectedRow.id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Token ' + JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)).token
                },
            }).then((response) => {
            response.json().then((data) => {
                let selectedRow = this.state.selectedRow;
                selectedRow.assigned_to = data;
                selectedRow['assigned_to.id'] = data.id;
                this.setState({
                    selectedRow
                });
                this.claimList.results.forEach((item) => {
                    if (item.id == selectedRow.id) {
                        item.assigned_to = data;
                    }
                })
                this.setState({
                    showGraph: false
                })
                setTimeout(() => {
                    this.handleSuccessResponse(JSON.parse(JSON.stringify(this.claimList)));
                }, 300);
            })
        })
    }

    /**
     * Update status of a row
     * @param {*} status
     * @memberof ClaimList
     */
    updateStatus(status) {
        fetch(
            URLS.updateStatusUrl(this.state.selectedRow.id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Token ' + JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)).token
                },
                body: JSON.stringify({
                    status
                }),
            }).then((response) => {
            let selectedRow = this.state.selectedRow;
            selectedRow.status = status;
            this.setState({
                selectedRow
            })
            this.claimList.results.forEach((item) => {
                if (item.id == selectedRow.id) {
                    item.status = status;
                }
            })
            this.setState({
                showGraph: false
            })
            setTimeout(() => {
                this.handleSuccessResponse(JSON.parse(JSON.stringify(this.claimList)));
            }, 300);
        })
    }

    /**
     * Add comment on a claim
     * @param {*} comment: New comment
     * @memberof ClaimList
     */
    addComment(comment) {
        fetch(
            URLS.addCommentUrl(this.state.selectedRow.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Token ' + JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)).token
                },
                body: JSON.stringify({
                    comment
                }),
            }).then((response) => {
            let selectedRow = this.state.selectedRow;
            selectedRow.latest_comment = comment;
            this.setState({
                selectedRow
            })
            this.claimList.results.forEach((item) => {
                if (item.id == selectedRow.id) {
                    item.latest_comment = comment;
                }
            })
            this.setState({
                showGraph: false,
                originalComment: comment
            })
            setTimeout(() => {
                this.handleSuccessResponse(JSON.parse(JSON.stringify(this.claimList)));
            }, 300);
        })
    }

    /**
     * Handle click on a row. handled this with jquery
     * @param {*} event: Click Event 
     * @param {*} data: Data of the row.
     * @memberof ClaimList
     */
    handleClick(event, data) {
        this.setState({
            selectedRow: data.rowData,
            originalComment: data.rowData.latest_comment
        });
        $('.' + ClaimListStyles['selected-row']).removeClass(ClaimListStyles['selected-row']);
        $(event.target).closest('tr').addClass(ClaimListStyles['selected-row']);
        $(event.target).on('DOMSubtreeModified', () => {
            $('.' + ClaimListStyles['selected-row']).removeClass(ClaimListStyles['selected-row']);
            this.setState({
                selectedRow: {},
                originalComment: ''
            });
        })
    }
    /**
     * React component life cycle event
     * @param {*} nextProps: Next props values
     * @memberof ClaimList
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.claimList && nextProps.claimList.results) {
            let providerTypes = [],
                providerTypeOptions = [];
            this.claimList = nextProps.claimList;
            this.handleSuccessResponse(JSON.parse(JSON.stringify(this.claimList)), true);
            this.claimList.results.forEach((value) => {
                if (value.provider_type && providerTypes.indexOf(value.provider_type) == -1) {
                    providerTypes.push(value.provider_type);
                }
            })
            providerTypes.forEach(function (providerType) {
                providerTypeOptions.push({
                    'label': providerType,
                    'value': providerType
                });
            });
            this.setState({
                providerTypeOptions,
                selected: providerTypes
            });
        }
    }

    /**
     * Handle success of claim list API
     * @param {*} result: Result from API
     * @param {*} initial: Flag to signify that this is first time load
     * @memberof ClaimList
     */
    handleSuccessResponse(result, initial) {
        const RANDOM_DATE = 'Mon, 29 Feb 2016 ';
        let xAxisValues = [],
            iterator = 0,
            hour = 0,
            parseTime, startTime = 0,
            endTime = 47;
        if (!initial) {
            // Apply filters if this is not the initial load and not all the providers
            // are selected.
            result.results = result.results.filter((value) => {
                return this.state.selected.indexOf(value.provider_type) != -1;
            })
            // Create the lower and upper limit of time from the selected time slider filter. What it does is it
            // divides the total time in a day(86400) seconds into the interval of half an hour(1800 seconds) and
            // Finds in which time interval the lower and upper ends of the slider fall. These intervals are then
            // selected along with the intermediate intervals for showing on graph as well filtering the data.
            var foundLowerLimit = false;
            for (iterator = 0; iterator < 48; iterator++) {
                if (iterator * 1800 > this.state.sliderFilter.min && !foundLowerLimit) {
                    startTime = iterator - 1;
                    foundLowerLimit = true;
                }
                if (iterator * 1800 > this.state.sliderFilter.max) {
                    endTime = iterator;
                    if (!foundLowerLimit) {
                        startTime = endTime;
                        foundLowerLimit = true
                    }
                    break;
                }
            }
            // If lower limit is not found by above logic it means marker is at the ends.
            if (!foundLowerLimit) {
                endTime = startTime = 47
            }
        }
        // Divide 24 hours in a day to the interval of 2 hours with comparable datetime object
        for (iterator = startTime; iterator <= endTime; iterator++) {
            hour = Math.floor(iterator / 2);
            hour = iterator < 20 ? '0' + hour : hour.toString();
            xAxisValues.push({
                'compareFromDate': moment(RANDOM_DATE + hour + (
                    iterator % 2 == 0 ? ':00:00' : ':30:00'
                ) + ' GMT'),
                'compareToDate': moment(RANDOM_DATE + hour + (
                    iterator % 2 == 0 ? ':29:59' : ':59:59'
                ) + ' GMT'),
                value: 0,
                display: iterator % 2 == 0 ? (hour + ':00') : (hour + ':30')
            })
        }
        // Filter the results to be only between the selected time intervals.
        result.results = result.results.filter(function (value) {
            var foundMatch = false;
            parseTime = moment(RANDOM_DATE + value.service_time + ' GMT');
            xAxisValues.forEach(function (xAixsValue) {
                if (
                    parseTime.isSameOrBefore(xAixsValue.compareToDate) &&
                    parseTime.isSameOrAfter(xAixsValue.compareFromDate)
                ) {
                    xAixsValue.value = xAixsValue.value + parseInt(value.benefit_amount);
                    foundMatch = true;
                }
            });
            return foundMatch
        });
        this.setState({
            showGraph: true
        });
        setTimeout(() => {
            this.initializeGraph(xAxisValues);
        }, 300);
        this.setState({
            tableData: result.results
        });
    };

    /**
     * Initialize and render d3 graph
     * @param {*} data: New data to be rendered
     * @memberof ClaimList
     */
    initializeGraph(data) {
        const NORMAL_BAR_COLOR = '#0099cc',
            HIGHLIGHT_BAR_COLOR = '#33ccff';
        let svg = d3.select('svg'),
            width = svg.attr('width') - 200,
            height = svg.attr('height') - 135,
            xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]),
            xAxis, g;
        g = svg.append('g').attr('transform', 'translate(' + 100 + ',' + 100 + ')');

        xScale.domain(data.map(function (d) {
            return d.display;
        }));

        yScale.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);
        // Define x axis and the Ui for the text that is shown there
        xAxis = g.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(xScale));
        xAxis.selectAll('.tick').each(function (value) {
            d3.select(this).attr('opacity', function () {
                return value.replace(':', '') % 200 == 0 ? 1 : 0;
            })
        });
        // Add the text showing what does x axis represents
        xAxis.append('text').attr('y', 30).attr('x', 445).attr('text-anchor', 'end')
            .attr('stroke', '#999').text('Hour of Service Time');

        // Add y axis and the text explaining what it represents.
        g.append('g').call(d3.axisLeft(yScale).tickFormat(function (d) {
                return '$' + d;
            }).ticks(10))
            .append('text').attr('transform', 'rotate(-90)').attr('y', 0).attr('dy', '-5.1em')
            .attr('text-anchor', 'end').attr('stroke', '#999').text('Benefit Amount');

        // Define properties of the bars and corresponding funtions.
        g.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar')
            .attr('x', function (d) {
                return xScale(d.display);
            })
            .attr('y', function (d) {
                return yScale(d.value);
            })
            .attr('fill', NORMAL_BAR_COLOR)
            .attr('width', xScale.bandwidth())
            .attr('height', function (d) {
                return height - yScale(d.value);
            }).on('mouseover', function () {
                d3.select(this).attr("fill", HIGHLIGHT_BAR_COLOR);
            })
            .on('mouseout', function () {
                d3.select(this).attr("fill", NORMAL_BAR_COLOR);
            });
    };

    /**
     *
     * Apply provider type filters
     * @param {*} selected: selected value
     * @memberof ClaimList
     */
    applyProviderTypeFilters(selected) {
        this.setState({
            selected,
            showGraph: false
        })
        setTimeout(() => {
            this.handleSuccessResponse(JSON.parse(JSON.stringify(this.claimList)));
        }, 300);
    }

    /**
     * Apply filters for slider
     * @param {*} newValue: new value if slider filter
     * @memberof ClaimList
     */
    applySliderFilter(newValue) {
        this.setState({
            showGraph: false
        })
        setTimeout(() => {
            this.handleSuccessResponse(JSON.parse(JSON.stringify(this.claimList)));
        }, 300);
    }
    render() {
        const {
            isFetchingClaimList,
        } = this.props;
        const {
            selected,
            tableData,
            providerTypeOptions,
            showGraph,
            originalComment
        } = this.state;
        const showLoader = isFetchingClaimList;

        return (
            <div className="detail-container">
                <div className="grid-container">
                    <div>
                        <LoaderWrapper showLoader={showLoader} small={true} wrapped>
                            <div className={`${ClaimListStyles['graph-container']}`}>
                                <div className={`${ClaimListStyles['chart-holder']}`}>
                                {showGraph && tableData.length !=0 && <svg width="900" height="400"></svg>}
                                {tableData.length == 0 && <p>No data with applied filters</p>}
                                </div>
                                <div className={`${ClaimListStyles['filter-container']}`}>
                                    <div className={`${ClaimListStyles['filter-item']}`}>
                                        <InputRange
                                            maxValue={this.state.max}
                                            minValue={this.state.min}
                                            formatLabel={value => {return moment().startOf('day').seconds(value).format('hh:mm:ss A');}}
                                            value={this.state.sliderFilter}
                                            onChange={
                                                value => {
                                                    this.setState({ sliderFilter: value })
                                                }
                                            }
                                            onChangeComplete={value => {this.applySliderFilter(value)}} 
                                        />
                                    </div>
                                    <div className={ClaimListStyles['filter-item']}>
                                    <MultiSelect
                                        options={providerTypeOptions}
                                        selected={selected}
                                        onSelectedChanged={(selected)=>{this.applyProviderTypeFilters(selected)}}
                                    />
                                </div>
                                </div>
                                
                                { tableData.length !=0 &&<div>
                                    <SmartDataTable
                                        data={tableData}
                                        perPage={5}
                                        name='test-table'
                                        onRowClick={this.handleClick}
                                        headers={this.SHOW_COLUMNS}
                                        className='ui compact selectable table'
                                        sortable
                                        className={`${ClaimListStyles['table-wrapper']}`}
                                    />
                                    {
                                        this.state.selectedRow.status &&
                                        <div className="actions-wrapper">
                                            <div className={ClaimListStyles['action-buttons']}>
                                                <button className={`btn ${this.state.selectedRow['assigned_to.id'] && 'disabled'}`} 
                                                onClick={!this.state.selectedRow['assigned_to.id'] && this.assignCase}>Assign Case</button>
                                                <button className={`btn ${(!this.state.selectedRow['assigned_to.id'] ||  this.state.selectedRow.status == 'in progress' ) && 'disabled'}`}
                                                        onClick={() => {
                                                            if(!(!this.state.selectedRow['assigned_to.id'] ||  this.state.selectedRow.status == 'in progress' )){
                                                                this.updateStatus('in progress')}
                                                            }
                                                        }>In progress</button>
                                                <button className={`btn ${(!this.state.selectedRow['assigned_to.id'] ||  this.state.selectedRow.status == 'wrong flag' ) && 'disabled'}`}
                                                        onClick={()=>{
                                                            if(!(!this.state.selectedRow['assigned_to.id'] ||  this.state.selectedRow.status == 'wrong flag' )){
                                                                this.updateStatus('wrong flag')    
                                                            }
                                                        }} >Wrong Flag</button>
                                                <button className={`btn ${(!this.state.selectedRow['assigned_to.id'] ||  this.state.selectedRow.status == 'closed' ) && 'disabled'}`}
                                                        onClick={()=>{
                                                            if(!(!this.state.selectedRow['assigned_to.id'] ||  this.state.selectedRow.status == 'closed' )){
                                                                this.updateStatus('closed')
                                                            }
                                                            }}>Closed</button>
                                                <button className={`btn ${(!this.state.selectedRow['assigned_to.id'] ||  originalComment==this.state.selectedRow.latest_comment || !this.state.selectedRow.latest_comment) && 'disabled'}`}
                                                        onClick={()=>{
                                                            if(!(!this.state.selectedRow['assigned_to.id'] ||  originalComment==this.state.selectedRow.latest_comment || !this.state.selectedRow.latest_comment)){
                                                                this.addComment(this.state.selectedRow.latest_comment)
                                                            }
                                                        }}>
                                                            Comment
                                                </button>
                                            
                                            </div>
                                            <div className={`${ClaimListStyles['text-area-wrapper']}`}>
                                                <textarea placeholder="Enter a value" value={this.state.selectedRow.latest_comment} onChange={(value)=>{
                                                    let selectedRow = this.state.selectedRow;
                                                    selectedRow.latest_comment =value.target.value;
                                                    this.setState({selectedRow});
                                                }}></textarea>
                                            </div>
                                        </div>
                                    }
                                </div>
                                }
                            </div>
                        </LoaderWrapper>
                    </div>
                </div>
            </div>
        );
    }
};


ClaimList.defaultProps = {
    isFetchingClaimList: false,
    challengeClaimData: {},
};

ClaimList.propTypes = {
    claimList: PropTypes.object,
    isFetchingClaimList: PropTypes.bool
};

const mapStateToProps = state => ({
    claimList: state.claimListReducer.claimList,
    isFetchingClaimList: state.claimListReducer.isFetchingClaimList,
});

const mapDispatchToProps = dispatch => ({
    getDataList: (searchParam, page, isSearching, type) => {
        dispatch(claimListActions.getClaimList(searchParam, page, isSearching, type));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimList);