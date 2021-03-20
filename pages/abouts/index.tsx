import React from "react";
import { getDataForAboutPage } from '../../helpers/blogDataDto';
import { ArticleExcerpt } from '../../components/ArticleExcerpt';
import Layout from "../../components/Layout";

export async function getStaticProps(): Promise< { props: IAboutProps } > {
    const [postExcerptData, blogBasicMetaData] = await getDataForAboutPage();
    return { props: { postExcerptData, blogBasicMetaData }};
}

class About extends React.Component<IAboutProps, {}> {

    render() {
        const articles = this.props.postExcerptData.map(d => {
            return <ArticleExcerpt 
                key={d.file}
                name={d.name} 
                description={d.description} 
                date={d.date} 
                file={d.file} 
                prettyPath={d.prettyPath} 
            />;
        });

        return <Layout blogBasicMetaData={this.props.blogBasicMetaData}>
            <ul className="mb-6">
                {articles}
            </ul>
        </Layout>;
    }

}

export default About;
