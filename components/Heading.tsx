import React from 'react';

export class Heading1 extends React.Component {
    render() {
        return (
            <h1 className="text-3xl mb-4 text-greenandgray-base02">
                {this.props.children}
            </h1>
        );
    }
}

export class Heading2 extends React.Component {
    render() {
        return (
            <h2 className="text-xl mb-1 text-greenandgray-base02">
                {this.props.children}
            </h2>
        );
    }
}
