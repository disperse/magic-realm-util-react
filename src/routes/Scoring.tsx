import * as React from 'react';
import ScoreTable from '../features/score-table/ScoreTable';

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <ScoreTable />
      </div>
    </div>
  );
}
