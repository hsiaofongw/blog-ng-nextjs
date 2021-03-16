import React from "react";
import styles from '../../styles/Public.module.scss';
import Layout from '../../components/Layout';
import { getDataForAboutPage } from '../../helpers/blogDataDto';
import { ArticleExcerpt } from '../../components/ArticleExcerpt';

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
