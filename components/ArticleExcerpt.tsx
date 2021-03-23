import styles from '../styles/Public.module.scss';
import React from 'react';
import { HoverTransitionListItem } from './List';
import { Heading2 } from './Heading';

export class ArticleExcerpt extends React.Component<IPostExcerptData, {}> {
    render() {
        const title = this.props.name;
        const description = this.props.description;
        const file = this.props.prettyPath || this.props.file;
        // const file = this.props.file;

        let dateObject = new Date(this.props.date);
        const dateString = dateObject.toLocaleDateString(
            'en-us', { month: 'short', day: 'numeric' }
        );

        return (
            <HoverTransitionListItem>
                <a href={file}>
                    <article>
                        <time dateTime={dateObject.toISOString()} className="text-sm mb-1 text-greenandgray-base01">{dateString}</time>
                        <Heading2>
                            {title}
                        </Heading2>
                        <p className="text-base text-greenandgray-base01">{description}</p>
                    </article>
                </a>
            </HoverTransitionListItem>
        );
    } 
}