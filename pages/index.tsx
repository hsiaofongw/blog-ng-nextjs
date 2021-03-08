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

class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            "postExcerptData": []
        };
    }

    componentDidMount() {
        const staticEndPoint = "https://static.exploro.one/pdf";
        const legacySiteEndPoint = "https://beyondstars.xyz";
        const pdfSuffix = ".pdf";

        let articles = this.props.postExcerptData;
        for (let a of articles) {
            a["prettyPath"] = a["file"]
                .replace(staticEndPoint, "/posts")
                .replace(legacySiteEndPoint, "")
                .replace(pdfSuffix, "/");
        }

        this.setState({
            "postExcerptData": articles
        });
    }

    render() {
        const articles = this.state.postExcerptData;

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
