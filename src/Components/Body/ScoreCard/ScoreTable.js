import React from 'react';

const ScoreTable = ({ table }) => {
    
    const { headerRow, row } = table;
    
    return (
        <table className="vp-score-table">
            <thead>
                <ScoreHeader row = {headerRow} />
            </thead>
            <tbody>
                <ScoreBody rows = {row} />
            </tbody>
        </table>
    );
};

const ScoreHeader = ({ row }) => {
    var headers = [];
    row.forEach((element,i) => {
        headers.push(<th key={i}> { element } </th>);
    });

    return (<tr>{headers}</tr>);
};


const ScoreBody =({rows}) => {
    var rowsLocal = [];
    rows.forEach((element,i) => {
        rowsLocal.push(<ScoreRow key={i} row={ element } />);
    });

    return (rowsLocal);
};

const ScoreRow = ({row}) => {
    var rowLocal = [];
    row.forEach((element,i) => {
        var value = parseFloat(element);
        value = value.toFixed(1);
        rowLocal.push(<td key={i}> { isNaN(element) ? "Nil" : value } </td>);
    });

    return (<tr>{rowLocal}</tr>);
};

export default ScoreTable;