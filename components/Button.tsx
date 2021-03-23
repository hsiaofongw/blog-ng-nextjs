import React from 'react';

export class Button extends React.Component<{ text: string, onClick: () => void }> {
    render() {
        return <button
            className="rounded-none border-greenandgray-base01 border-2 px-1 text-greenandgray-base01 hover:bg-greenandgray-base1 hover:bg-opacity-40 transition duration-200"
            onClick={e => this.props.onClick()}
        >
            {this.props.text}
        </button>;
    }
}

export class HoverTransitionButton extends React.Component<{ text: string, onClick: () => void }> {
    render() {
        return <button
            className="rounded-none border-greenandgray-base01 border-2 px-1 text-greenandgray-base01 hover:bg-greenandgray-base1 hover:bg-opacity-40 transition duration-200"
            onClick={e => this.props.onClick()}
        >
            {this.props.text}
        </button>;
    }
}
