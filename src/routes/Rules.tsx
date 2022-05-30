import * as React from 'react';
import pdfUrl from '../assets/MR-31-Complete.pdf';

export default function Home() {
  return (
    <object
      style={{ margin: '0 auto' }}
      data={pdfUrl}
      type="application/pdf"
      title="Magic Realm Rules"
      width="500"
      height="650"
    >
      <a href={pdfUrl}>Magic Realm Rules</a>
    </object>
  );
}
