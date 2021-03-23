import React from 'react';
import { HoverTransitionLink } from './Link';

export class Menu extends React.Component<IBlogBasicMetaData, {}> {
    render() {
        const links = this.props.menu;
        const entries = links.map(link => {
            let target = "_self";
            if (link.newTab) {
                target = "_blank";
            }

            const menuItem = (
                <li className="inline mr-2 text-greenandgray-base02" key={link.link}>
                    <HoverTransitionLink href={link.link} target={target}>
                        {link.name}
                    </HoverTransitionLink>
                </li>
            );

            return menuItem;
        })
        const menu = <nav className="mb-4">
            <ul>{entries}</ul>
        </nav>;

        return menu;
    } 
}
