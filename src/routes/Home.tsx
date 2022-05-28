import * as React from 'react';
import imgUrl from '../assets/magic-realm-cover.jpeg';

export default class Home extends React.Component {
    render() {
        return (
            <img src={imgUrl} alt="Magic Realm box cover" width="500" />
        )
    }
}
