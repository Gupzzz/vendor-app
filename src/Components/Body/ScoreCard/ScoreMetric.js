import React from 'react';
import ScoreTable from './ScoreTable';

const ScoreMetric = ({ metric }) => {

    return (
    <div className="vp-card vp-score-minHeight  margin-top-medium" >
        <div className="vp-card-header vp-score-header-bg">
        { metric.metricName }
        </div>
        <div className="vp-card-container vp-score-con-pad">
            <div className="vp-score-goal">
                { metric.goal }
            </div>
            <ScoreTable table={ metric.table } />
            <div className="vp-score-definition">
                { metric.definition }
            </div>
        </div>
    </div>
    );

};

export default ScoreMetric;