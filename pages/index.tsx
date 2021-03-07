import React from "react";
import styles from '../styles/Public.module.scss'
import Layout from '../components/Layout';

export async function getStaticProps(): Promise<{ props: IHomeProps }> {

    const giteeUrl = "https://gitee.com/hsiaofongw/helloworld/raw/master";
    const dataUrl = `${giteeUrl}/articles.json`;
    const blogBasicMetaDataUrl = `${giteeUrl}/blog-basic-metadata.json`;
    
    const postExcerptData = await fetch(dataUrl).then(d => d.json());
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json());

    return { props: { postExcerptData, blogBasicMetaData }};
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
        const file = this.props.file;

        return <li>
            <a href={file} target="_blank">
                <h2>{title}</h2>
                <div className={styles.description}>{description}</div>
                <time dateTime={date} >{date}</time>
            </a>
        </li>;
    }
}

class Home extends React.Component<IHomeProps, {}> {

    constructor(props: IHomeProps) {
        super(props);
    }

    render() {
        const articles = this.props.postExcerptData;
        const articleElements = articles.map(a => <ArticleExcerpt key={a.file} {...a} />);
        const articlesListElement = <ArticleExcerptList>{articleElements}</ArticleExcerptList>

        return <Layout title="探索子" pageName={this.props.blogBasicMetaData.title} blogBasicMetaData={this.props.blogBasicMetaData}>
            <main className={styles.main}>
                {articlesListElement}
            </main>
        </Layout>;
    }

}

export default Home;
