class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

class Table extends React.Component {

    render() {
        var headerComponents = this.generateHeaders();
        var rowComponents = this.generateRows();
        return (
            <table>
                <thead> {headerComponents} </thead>
                <tbody> {rowComponents} </tbody>
            </table>
        );
    }
    generateHeaders() {
        var cols = ['Name', 'Email'];
        // generate our header (th) cell components
        return cols.map(function(item) {
            return <th> {item} </th>;
        });
    }

    generateRows() {
        var cell = function(item,col) {
          return <td> {item[col]} </td>;
        };
        var data = this.props.data.list;
        return data.map(function (item) {
          return <tr> {cell(item,'name')} {cell(item,'email')}  </tr>;
        });
    }
}

$(document).ready(function () {
    $.getJSON('/data.json').done(function (data) {
        ReactDOM.render(<HelloMessage name="World" />, document.querySelector("#content"));
        ReactDOM.render(<Table data={data}/>, document.querySelector("#nameTable"));
    });
});
