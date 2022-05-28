import * as React from 'react';
import pdfUrl from '../assets/MR-31-Complete.pdf';

export default class Home extends React.Component {
    render() {
        return (
            <object
                data={pdfUrl}
                type="application/pdf"
                title="Magic Realm Rules"
                width="500"
                height="650"
            >
                <a href={pdfUrl}>Magic Realm Rules</a>
            </object>
        )
    }
}
