import React from 'react';

export class HoverTransitionLink extends React.Component<{href: string, target?: string}, {}> {
    render() {
        return <a 
            className="min-w-max hover:bg-greenandgray-base1 hover:bg-opacity-40 transition duration-200" 
            href={this.props.href}
            target={this.props.target || "_self"}
        >
            {this.props.children}
        </a>;
    }
}
