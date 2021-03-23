import React from 'react';
import { Heading2 } from './Heading';
import { HoverTransitionListItem } from './List';

export class FriendExcerpt extends React.Component<ICardData, {}> {
    render() {
        const title = this.props.title;
        const description = this.props.description;
        const link = this.props.link;

        return <HoverTransitionListItem>
            <a href={link}>
                <Heading2>
                    {`\@${title}`}
                </Heading2>
                <p className="text-base text-greenandgray-base01">{description}</p>
            </a>
        </HoverTransitionListItem>;
    } 
}