import * as React from 'react';
import ScoreTable from '../features/score-table/ScoreTable';
import CalculatePoints from '../features/calculate-points/CalculatePoints';

export default function Home() {
  return (
    <div style={{ flexGrow: 1 }}>
      <ScoreTable />
      <CalculatePoints />
    </div>
  );
}
