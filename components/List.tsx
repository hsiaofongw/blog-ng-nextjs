import React from 'react';

export class HoverTransitionListItem extends React.Component {
    render() {
        return <li className="mb-4 hover:bg-greenandgray-base1 hover:bg-opacity-40 transition duration-200">
            {this.props.children}
        </li>;
    }
}
