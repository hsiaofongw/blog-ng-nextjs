import styles from '../styles/Public.module.scss';
import React from 'react';

export class ArticleExcerpt extends React.Component<IPostExcerptData, {}> {
    render() {
        const title = this.props.name;
        const description = this.props.description;
        const date = new Date(this.props.date).toLocaleDateString(
            'en-us', { month: 'short', day: 'numeric' }
        );
        const file = this.props.prettyPath || this.props.file;
        // const file = this.props.file;

        return <li className="mb-4">
            <a href={file}>
            <time dateTime={date} className="text-xs text-gray-500 mb-1">{date}</time>
            <h2 className="text-lg mb-1">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
            </a>
        </li>;
    } 
}