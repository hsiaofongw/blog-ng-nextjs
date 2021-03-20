import React from "react";
import { ArticleExcerpt } from "../components/ArticleExcerpt";
import Layout from "../components/Layout";
import { getDataForHomePage } from '../helpers/blogDataDto';

export async function getStaticProps(): Promise< { props: IHomeProps } > {
    const [postExcerptData, blogBasicMetaData] = await getDataForHomePage();
    return { props: { postExcerptData, blogBasicMetaData }};
}

class Home extends React.Component<IHomeProps, IHomeState> {

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

        return <Layout 
            blogBasicMetaData={this.props.blogBasicMetaData}
        >
            <ul className="mb-6">
                {articles}
            </ul>
        </Layout>;
    }

}

export default Home;
