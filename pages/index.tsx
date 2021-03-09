import React from "react";
import styles from '../styles/Public.module.scss'
import Layout from '../components/Layout';
import { getDataForHomePage } from '../helpers/blogDataDto';
import { getArticles } from '../helpers/blogDataDto';

export async function getStaticProps(): Promise<{ props: IHomeProps }> {

    const [postExcerptData, blogBasicMetaData] = await getDataForHomePage();

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
            "postExcerptData": [],
            "timer": undefined
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

        const tickPeriod =  20000;
        const timer = window.setInterval(() => this.tick(), tickPeriod);

        this.setState({
            "postExcerptData": articles,
            "timer": timer
        });
    }

    tick() {
        let newArticles: IPostExcerptData[] = [];

        getArticles().then(d => {
            for (const article of d) {
                const key = article.file;
                if (key in this.state.postExcerptData) {
                    ;
                }
                else {
                    console.log("Found new article:");
                    console.log(article);
                    newArticles.push(article);
                }
            }
        });

        this.setState({
            "postExcerptData": this.state.postExcerptData.concat(newArticles)
        }, () => console.log("All updates applied."));
    }

    componentWillUnmount() {
        if (this.state.timer) {
            window.clearInterval(this.state.timer);
        }
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
