import * as React from 'react';
import { ScoreTable } from "../features/score-table/ScoreTable";

export default class Home extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                   <ScoreTable />
                </div>
            </div>
        )
    }
}
