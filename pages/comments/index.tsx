import React from "react";
import styles from '../../styles/Public.module.scss'
import Layout from '../../components/Layout';
import { getDataForCommentsPage } from '../../helpers/blogDataDto';

export async function getServerSideProps(): Promise< { props: ICommentsPageProps } > {
    const [commentsData, blogBasicMetaData] = await getDataForCommentsPage();

    return  {
        props: { commentsData, blogBasicMetaData }
    };
}

class ArticleExcerptList extends React.Component<{}, {}> {
    
    render() {
        return <ul className={styles.articlelist}>{this.props.children}</ul>;
    }
}

class ArticleExcerpt extends React.Component<IPostExcerptData, {}> {
    render() {
        const title = this.props.name;
        const description = this.props.description;
        const date = this.props.date;
        const file = this.props.prettyPath || this.props.file;

        return <li>
            <a href={file} target="_blank">
                <h2>{title}</h2>
                <div className={styles.description}>{description}</div>
                <time dateTime={date} >{date}</time>
            </a>
        </li>;
    } 
}

class Comments extends React.Component<ICommentsPageProps, {}> {

    constructor(props: ICommentsPageProps) {
        super(props);
    }

    render() {
        const comments = this.props.commentsData;

        const commentElements = comments.map(c => <div key={c.serialNumber}>{c.content}</div>);

        return <Layout 
                    title="探索子" 
                    pageName={this.props.blogBasicMetaData.title} 
                    blogBasicMetaData={this.props.blogBasicMetaData}
                >
            <main className={styles.main}>
                <div>
                    {commentElements}
                </div>
            </main>
        </Layout>;
    }

}

export default Comments;
