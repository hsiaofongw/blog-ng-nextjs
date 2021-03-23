import styles from '../styles/Public.module.scss';
import React from 'react';
import { HoverTransitionListItem } from './List';

export class ArticleExcerpt extends React.Component<IPostExcerptData, {}> {
    render() {
        const title = this.props.name;
        const description = this.props.description;
        const date = new Date(this.props.date).toLocaleDateString(
            'en-us', { month: 'short', day: 'numeric' }
        );
        const file = this.props.prettyPath || this.props.file;
        // const file = this.props.file;

        return (
            <HoverTransitionListItem>
                <a href={file}>
                    <time dateTime={date} className="text-sm mb-1 text-greenandgray-base01">{date}</time>
                    <h2 className="mb-1 text-xl text-greenandgray-base02">{title}</h2>
                    <p className="text-base text-greenandgray-base01">{description}</p>
                </a>
            </HoverTransitionListItem>
        );
    } 
}