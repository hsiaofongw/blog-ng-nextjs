import React from "react";
import publicstyles from '../../styles/Public.module.scss'
import styles from '../../styles/Comments.module.scss';
import Layout from '../../components/Layout';
import { getDataForCommentsPage } from '../../helpers/blogDataDto';
import { avatarSimplify, getGravatar } from '../../helpers/avatar';

export async function getServerSideProps(): Promise< { props: ICommentsPageProps } > {
    const [commentsData, blogBasicMetaData] = await getDataForCommentsPage();

    return  {
        props: { commentsData, blogBasicMetaData }
    };
}

class ArticleExcerptList extends React.Component<{}, {}> {
    
    render() {
        return <ul className={publicstyles.articlelist}>{this.props.children}</ul>;
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
                <div className={publicstyles.description}>{description}</div>
                <time dateTime={date} >{date}</time>
            </a>
        </li>;
    } 
}

class Comment extends React.Component<ICommentProps, {}> {
    
    constructor(props: ICommentProps) {
        super(props);
    }

    render() {

        let t = new Date(this.props.data.date).toLocaleDateString();

        return <div 
            key={this.props.data.serialNumber}
            className={styles.comment} 
        >
            <img
                className={styles.avatar}
                src={avatarSimplify(getGravatar(this.props.data.email))}
                width={50}
                height={50}
                alt="头像"
            />
            <span>{this.props.data.nickName}</span>
            <p>{this.props.data.content}</p>
            <time dateTime={t}>{t}</time>
            <div><span>内容编号</span><span>{this.props.data.serialNumber}</span></div>
        </div>;
    }

}

class Comments extends React.Component<ICommentsPageProps, {}> {

    constructor(props: ICommentsPageProps) {
        super(props);
    }

    render() {
        const comments = this.props.commentsData;

        const commentElements = comments.map(c => <Comment key={c.serialNumber} data={c} />);

        return <Layout 
                    title="探索子" 
                    pageName={this.props.blogBasicMetaData.title} 
                    blogBasicMetaData={this.props.blogBasicMetaData}
                >
            <main className={publicstyles.main}>
                <div className={styles.list}>
                    {commentElements}
                </div>
            </main>
        </Layout>;
    }

}

export default Comments;
