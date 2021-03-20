import React from 'react';

export class FriendExcerpt extends React.Component<ICardData, {}> {
    render() {
        const title = this.props.title;
        const description = this.props.description;
        const link = this.props.link;

        return <li className="mb-4">
            <a href={link}>
            <h2 className="text-lg mb-1">{`@${title}`}</h2>
            <p className="text-sm text-gray-600">{description}</p>
            </a>
        </li>;
    } 
}