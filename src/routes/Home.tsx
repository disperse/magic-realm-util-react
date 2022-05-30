import * as React from 'react';
import imgUrl from '../assets/magic-realm-cover.jpeg';

export default function Home() {
  return (
    <img
      style={{ margin: '0 auto', width: 500 }}
      src={imgUrl}
      alt="Magic Realm box cover"
    />
  );
}
