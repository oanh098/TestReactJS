var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*const Modal = ({handleClose, show, children}) => {*/
function Modal(_ref) {
    var handleClose = _ref.handleClose,
        show = _ref.show,
        children = _ref.children,
        info = _ref.info;


    var displayBlockOrNone = show ? "customModal display-block" : "customModal display-none";
    return React.createElement(
        "div",
        { className: displayBlockOrNone },
        React.createElement(
            "section",
            { className: "modal-main" },
            children,
            React.createElement("input", { type: "button", value: "Close sep", onClick: handleClose })
        )
    );
}

function withSubscription(WrappedComponent, endpoint) {

    return function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

            _this.state = {
                source: []
            };
            _this.handleChange = _this.handleChange.bind(_this);
            return _this;
        }

        _createClass(_class, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                var apiUrl = 'https://api.jikan.moe/v3/search/anime?q=Ghibli&page=1';
                fetch(endpoint).then(function (res) {
                    return res.json();
                }).then(function (source) {
                    return _this2.setState(source);
                });
            }
        }, {
            key: "handleChange",
            value: function handleChange() {
                /* this.setState({
                     data: selectData(DataSource, this.props)
                 })*/
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(WrappedComponent, Object.assign({ data: this.state.source }, this.props));
            }
        }]);

        return _class;
    }(React.Component); // end return function withSubscription
}

var Display = function (_React$Component2) {
    _inherits(Display, _React$Component2);

    function Display(props) {
        _classCallCheck(this, Display);

        var _this3 = _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));

        _this3.state = {
            show: false,
            info: '',
            data: [],
            filters: '',
            sort: '^'

        };
        _this3.showModal = _this3.showModal.bind(_this3);
        _this3.hideModal = _this3.hideModal.bind(_this3);
        _this3.onLoad = _this3.onLoad.bind(_this3);
        _this3.handleChange = _this3.handleChange.bind(_this3);
        _this3.handleClick = _this3.handleClick.bind(_this3);

        return _this3;
    }

    _createClass(Display, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log('Mounted');
            var options = [];
            var apiUrl = 'https://api.jikan.moe/v3/search/anime?q=Ghibli&page=1';
            fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(this.onLoad); /*this.setState*/

            /*.then((data) =>{
              this.setState({
                  data:data.results
              })
              console.log('This is your data 2',
              this.state.data)
            })*/
        }
    }, {
        key: "parseData",
        value: function parseData(data) {

            var arr = data;
            /*const {filters} = this.state;
            const {sort} = this.state;
              if(filters.length){
                console.log('line 63: ' )
                arr = data.filter(item => item.title.toLowerCase().includes(filters.toLowerCase));
            }*/

            return arr;
        }
    }, {
        key: "onLoad",
        value: function onLoad(data) {
            this.setState({ data: this.parseData(data.results) });
        }
    }, {
        key: "showModal",
        value: function showModal(e) {

            this.setState({ show: true, info: e.target.outerText });
        }
    }, {
        key: "hideModal",
        value: function hideModal() {
            this.setState({ show: false });
            console.log(this.state.show);
        }
    }, {
        key: "renderLoading",
        value: function renderLoading() {
            return React.createElement(
                "div",
                null,
                "Loading..."
            );
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {

            this.setState({ filters: e.target.value });
            /*this.parseData(this.state.data)
            console.log(this.state.data)
            console.log(e.target.value);*/
        }
    }, {
        key: "handleClick",
        value: function handleClick(e) {
            var sort = this.state.sort;

            var nextSort = void 0;
            nextSort = e.target.value;
            if (sort === '^') nextSort = 'v';else if (sort === 'v') nextSort = '^';
            this.setState({ sort: nextSort });
        }
    }, {
        key: "renderData",
        value: function renderData(data) {
            var _this4 = this;

            if (data && data.length > 0) {
                var filters = this.state.filters;
                var sort = this.state.sort;


                if (filters.length) {
                    data = data.filter(function (item) {
                        return item.title.toLowerCase().includes(filters.toLowerCase());
                    });
                }

                if (sort.length) {
                    /*data = [...data].sort((a,b) => a.mal_id - b.mal_id)*/
                    if (sort === '^') {
                        data = [].concat(_toConsumableArray(data)).sort(function (a, b) {
                            return a.mal_id - b.mal_id;
                        });
                    } else if (sort === 'v') {

                        data = [].concat(_toConsumableArray(data)).sort(function (a, b) {
                            return b.mal_id - a.mal_id;
                        });
                    }
                }
            }

            var contents = [];
            var totalRecords = data.length;
            console.log('line 179: ' + (typeof totalRecords === "undefined" ? "undefined" : _typeof(totalRecords)));
            data.map(function (item, index) {
                contents.push(React.createElement(
                    "div",
                    { className: "col-md py-3", key: index },
                    React.createElement(
                        "div",
                        { className: "card" },
                        React.createElement("img", { className: "card-img-top", src: item.image_url, alt: "Card image cap" }),
                        React.createElement(
                            "div",
                            { className: "card-body" },
                            React.createElement(
                                "a",
                                { href: "#", onClick: function onClick(e) {
                                        return _this4.showModal(e);
                                    } },
                                React.createElement(
                                    "h5",
                                    { className: "card-title" },
                                    item.title
                                )
                            ),
                            React.createElement(
                                "p",
                                { className: "card-text" },
                                item.synopsis
                            ),
                            React.createElement(
                                "p",
                                { className: "card-text" },
                                React.createElement(
                                    "small",
                                    { className: "text-muted" },
                                    "Type: ",
                                    item.type
                                )
                            )
                        ),
                        React.createElement(
                            Modal,
                            { handleClose: _this4.hideModal, show: _this4.state.show },
                            React.createElement(
                                "h1",
                                null,
                                "Title: ",
                                _this4.state.info
                            )
                        )
                    )
                ));

                if ((index + 1) % 4 === 0) {
                    contents.push(React.createElement("div", { className: "w-100" }));
                }
            });

            /*<div><NewComponent totalRecords={90} pageLimit={9} pageNeighbours = {1}/></div>*/
            return React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(Pagination, { totalRecords: 90, pageLimit: 9, pageNeighbours: 1 })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "The Component has Mounted, Check the browser 'console'"
                    ),
                    React.createElement("input", { type: "text", onChange: this.handleChange, placeholder: "Search by title ..." }),
                    React.createElement("input", { type: "button", value: this.state.sort, onClick: this.handleClick })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "row" },
                        contents,
                        " "
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.state.data;


            return data ? this.renderData(data) : this.renderLoading();
        }
    }]);

    return Display;
}(React.Component);

var toLeft = 'left';
var toRight = 'right';

var range = function range(from, to) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;


    var i = from;
    var range = [];

    while (i <= to) {
        range.push(i);
        i = i + step;
    }

    return range;
};

var Pagination = function (_React$Component3) {
    _inherits(Pagination, _React$Component3);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this5 = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this5.fetchNumbers = function () {

            var totalPages = Math.ceil(_this5.totalRecords / _this5.pageLimit); //90/10, 9 con so dua len pagination
            var currentPage = _this5.state.currentPage;
            var totalNumbers = _this5.pageNeighbours * 2 + 3;
            var totalBlocks = totalNumbers + 2;

            if (totalPages > totalBlocks) {
                var first = Math.max(2, currentPage - _this5.pageNeighbours);
                var last = Math.min(totalPages - 1, currentPage + _this5.pageNeighbours);
                var displayPageNumbers = range(first, last);

                var hasLeftSpill = first > 2;
                var hasRightSpill = totalPages - last > 1;
                var spillOffset = totalNumbers - (displayPageNumbers.length + 1); //so number still hiding


                switch (true) {

                    //(1) < {5 6} [7] {8 9} (10)
                    case hasLeftSpill && !hasRightSpill:
                        {

                            var page2 = range(first - spillOffset, first - 1);
                            displayPageNumbers = [toLeft].concat(_toConsumableArray(page2), _toConsumableArray(displayPageNumbers));
                            break;
                        }
                    //(1) {2 3} [4] {5 6} > (10)
                    case !hasLeftSpill && hasRightSpill:
                        {

                            var _page = range(last + 1, last + spillOffset);
                            displayPageNumbers = [].concat(_toConsumableArray(displayPageNumbers), _toConsumableArray(_page), [toRight]);
                            break;
                        }

                    //(1) < {4 5} [6] {7 8} > (10)
                    case hasLeftSpill && hasRightSpill:
                    default:
                        {
                            displayPageNumbers = [toLeft].concat(_toConsumableArray(displayPageNumbers), [toRight]);
                            break;
                        }
                }

                return [1].concat(_toConsumableArray(displayPageNumbers), [totalPages]);
            }

            return range(1, totalPages);
        };

        var _props$totalRecords = props.totalRecords,
            totalRecords = _props$totalRecords === undefined ? 0 : _props$totalRecords,
            _props$pageLimit = props.pageLimit,
            pageLimit = _props$pageLimit === undefined ? 0 : _props$pageLimit,
            _props$pageNeighbours = props.pageNeighbours,
            pageNeighbours = _props$pageNeighbours === undefined ? 0 : _props$pageNeighbours;


        _this5.state = { currentPage: 9 };

        _this5.pageLimit = typeof pageLimit === 'number' ? pageLimit : 0;
        _this5.pageNeighbours = typeof pageNeighbours === 'number' ? pageNeighbours : 0;
        _this5.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

        return _this5;
    }

    _createClass(Pagination, [{
        key: "render",
        value: function render() {
            var pages = this.fetchNumbers();
            console.log('line 230: ' + pages);

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "ul",
                    { className: "pagination" },
                    pages.map(function (page, i) {

                        if (page === toRight) return React.createElement(
                            "li",
                            { key: i, className: "page-item" },
                            React.createElement(
                                "a",
                                { className: "page-link", href: "#", "aria-label": "Next" },
                                React.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xBB"
                                ),
                                React.createElement(
                                    "span",
                                    { className: "sr-only" },
                                    "Next"
                                )
                            )
                        );
                        if (page === toLeft) return React.createElement(
                            "li",
                            { key: i, className: "page-item" },
                            React.createElement(
                                "a",
                                { className: "page-link", href: "#", "aria-label": "Previous" },
                                React.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xAB"
                                ),
                                React.createElement(
                                    "span",
                                    { className: "sr-only" },
                                    "Previous"
                                )
                            )
                        );
                        return React.createElement(
                            "li",
                            { key: i, className: "page-item" },
                            React.createElement(
                                "a",
                                { className: "page-link", href: "#" },
                                page
                            )
                        );
                    })
                ),
                React.createElement(
                    "h1",
                    null,
                    "Pagination: ",
                    this.totalRecords,
                    ", ",
                    this.pageLimit,
                    ", ",
                    this.pageNeighbours
                )
            );
        }
    }]);

    return Pagination;
}(React.Component);

/*--------------------------------------------------------------*/
/* Main Component App */


var App = function (_React$Component4) {
    _inherits(App, _React$Component4);

    function App(props) {
        _classCallCheck(this, App);

        var _this6 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this6.state = {
            descendant: false
        };

        _this6.handleClick = _this6.handleClick.bind(_this6);
        return _this6;
    }

    _createClass(App, [{
        key: "handleClick",
        value: function handleClick(e) {
            console.log('Clicked: ' + e.target.target);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Display, null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));