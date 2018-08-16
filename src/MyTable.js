import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export default (props) =>  {
  return (
    <div>
    <h3 className='center'>{props.title}</h3>
    <TableComponent data={props.data} cols={Object.keys(props.data[0])} key={props.ukey} /> 
    </div>
    )
}

function createMarkup(html) {
   return {__html: html};
}

const hebflip = string => {
  var ret = ''
  var heb = []
  var f = 0;
  for (var chr in string){
    if(string[chr] >= 'א' && string[chr] <= 'ת') {
      if(f===0) {
        ret += "<span dir='ltr'>";
        f = 1;
      }
      heb.push(string[chr]);
    }
    if(heb.length > 0  && (string[chr] < 'א'  ||  string[chr] > 'ת')) {
      ret += heb.reverse().join('');
      ret += '</span>';
      f = 0;
      heb = [];
    }
    if(string[chr] < 'א'  ||  string[chr] > 'ת') ret += string[chr];
  }
  return ret + heb.reverse().join('');
};

const TableComponent = (props) => {
    var ukey = props.ukey;
    var dataColumns = props.cols;
    var dataRows = props.data.map(function(obj){
      obj.id = obj[dataColumns[0]];
      return obj;
    });

    var tableHeaders = (<thead className="Thead">
          <tr >
            {dataColumns.map(function(column,i) {
              return <th key={'th' + ukey + i}>{column}</th>; })}
          </tr>
      </thead>);

    var tableBody = dataRows.map(function(row,i) {
      return (
        <tr key={'tr' + ukey + i}>
          {dataColumns.map(function(column,j) {
            var content = row[column]
            content = (column==='Details' || column==='Link' ||   column==='Act Description'  ? content : hebflip(content))
            var markup = (column !== 'Part Name' ? <td  key={'td' + ukey + i + j}  dangerouslySetInnerHTML={createMarkup(content)}></td> : <td key={'td' + ukey + i + j}>{content}</td>)
            return markup })}
        </tr>); });

    return (<table className="table table-bordered table-hover table-striped table-sm table-responsive" width="100%">
        {tableHeaders}
        <tbody>
        {tableBody}
        </tbody>
      </table>)
 }  


