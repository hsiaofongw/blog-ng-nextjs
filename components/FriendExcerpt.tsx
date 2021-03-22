import React from 'react';

export class FriendExcerpt extends React.Component<ICardData, {}> {
    render() {
        const title = this.props.title;
        const description = this.props.description;
        const link = this.props.link;

        return <li className="mb-4 hover:bg-greenandgray-base1 hover:bg-opacity-40 transition duration-200">
            <a href={link}>
            <h2 className="text-lg mb-1 text-greenandgray-base02">{`\@${title}`}</h2>
            <p className="text-sm text-greenandgray-base01">{description}</p>
            </a>
        </li>;
    } 
}