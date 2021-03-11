import React from "react";
import styles from '../../styles/Public.module.scss';
import Layout from '../../components/Layout';
import { getDataForAboutPage } from '../../helpers/blogDataDto';

export async function getServerSideProps(): Promise< { props: IAboutProps } > {
    const [postExcerptData, blogBasicMetaData] = await getDataForAboutPage();
    return { props: { postExcerptData, blogBasicMetaData }};
}

// export async function getStaticProps(): Promise< { props: IAboutProps } > {
//     const [postExcerptData, blogBasicMetaData] = await getDataForAboutPage();
//     return { props: { postExcerptData, blogBasicMetaData }};
// }

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

class About extends React.Component<IAboutProps, {}> {

    constructor(props: IAboutProps) {
        super(props);
    }

    

    render() {
        const pageName= `关于 | ${this.props.blogBasicMetaData.title}`;

        let articles = this.props.postExcerptData;

        const articleElements = articles.map(a => <ArticleExcerpt key={a.file} {...a} />);
        const articlesListElement = <ArticleExcerptList>{articleElements}</ArticleExcerptList>

        return <Layout title="关于" pageName={pageName} blogBasicMetaData={this.props.blogBasicMetaData} >
            <main className={styles.main}>
                {articlesListElement}
            </main>
        </Layout>
    }

}

export default About;
