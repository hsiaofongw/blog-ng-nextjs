import React from "react";
import styles from '../styles/Public.module.scss'
import Layout from '../components/Layout';
import { getDataForHomePage } from '../helpers/blogDataDto';
import { getArticles } from '../helpers/blogDataDto';
import { ArticleExcerpt } from '../components/ArticleExcerpt';

export async function getServerSideProps(): Promise< { props: IHomeProps } > {
    const [postExcerptData, blogBasicMetaData] = await getDataForHomePage();
    return { props: { postExcerptData, blogBasicMetaData }};
}

class ArticleExcerptList extends React.Component<{}, {}> {
    
    render() {
        return <ul className={styles.articlelist}>{this.props.children}</ul>;
    }
}

class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            "postExcerptData": [],
            "timer": undefined,
            "articleIndices": new Set<string>()
        };
    }

    

    addArticles(arrivedArticles: IPostExcerptData[]) {
        let indices = this.state.articleIndices;
        let articles = this.state.postExcerptData;

        let receivedArticles: IPostExcerptData[] = []
        for (const a of arrivedArticles) {
            const key = a.file;
            if (!indices.has(key)) {
                indices.add(key);
                receivedArticles.push(a);
            }
        }


        articles = receivedArticles.concat(articles);

        this.setState({
            "articleIndices": indices,
            "postExcerptData": articles
        });
    }

    componentDidMount() {

        let articles = this.props.postExcerptData;

        const tickPeriod =  30000;
        const timer = window.setInterval(() => this.tick(), tickPeriod);

        this.setState({
            "timer": timer
        }, () => {
            this.addArticles(articles);
            this.fetchNew();
        });
    }

    fetchNew() {
        getArticles().then(d => {
            this.addArticles(d);
        });
    }

    tick() {
        this.fetchNew();
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
