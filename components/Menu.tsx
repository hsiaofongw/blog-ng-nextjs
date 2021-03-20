import React from 'react';

export class Menu extends React.Component<IBlogBasicMetaData, {}> {
    render() {
        const links = this.props.menu;
        const entries = links.map(link => {
            let target = "_self";
            if (link.newTab) {
                target = "_blank";
            }
            return <li key={link.link} className="inline mr-2"><a href={link.link} target={target}>{link.name}</a></li>;
        })
        const menu = <nav className="mb-4">
            <ul>{entries}</ul>
        </nav>;

        return menu;
    } 
}
