'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HelloMessage = function (_React$Component) {
    _inherits(HelloMessage, _React$Component);

    function HelloMessage() {
        _classCallCheck(this, HelloMessage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HelloMessage).apply(this, arguments));
    }

    _createClass(HelloMessage, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'Hello ',
                this.props.name
            );
        }
    }]);

    return HelloMessage;
}(React.Component);

var Table = function (_React$Component2) {
    _inherits(Table, _React$Component2);

    function Table() {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
    }

    _createClass(Table, [{
        key: 'render',
        value: function render() {
            var headerComponents = this.generateHeaders();
            var rowComponents = this.generateRows();
            return React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    ' ',
                    headerComponents,
                    ' '
                ),
                React.createElement(
                    'tbody',
                    null,
                    ' ',
                    rowComponents,
                    ' '
                )
            );
        }
    }, {
        key: 'generateHeaders',
        value: function generateHeaders() {
            var cols = ['Name', 'Email'];
            // generate our header (th) cell components
            return cols.map(function (item) {
                return React.createElement(
                    'th',
                    null,
                    ' ',
                    item,
                    ' '
                );
            });
        }
    }, {
        key: 'generateRows',
        value: function generateRows() {
            var cell = function cell(item, col) {
                return React.createElement(
                    'td',
                    null,
                    ' ',
                    item[col],
                    ' '
                );
            };
            var data = this.props.data.list;
            return data.map(function (item) {
                return React.createElement(
                    'tr',
                    null,
                    ' ',
                    cell(item, 'name'),
                    ' ',
                    cell(item, 'email'),
                    '  '
                );
            });
        }
    }]);

    return Table;
}(React.Component);

$(document).ready(function () {
    $.getJSON('/data.json').done(function (data) {
        ReactDOM.render(React.createElement(HelloMessage, { name: 'World' }), document.querySelector("#content"));
        ReactDOM.render(React.createElement(Table, { data: data }), document.querySelector("#nameTable"));
    });
});