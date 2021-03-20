import React from "react";
import { getDataForAboutPage } from '../../helpers/blogDataDto';
import { ArticleExcerpt } from '../../components/ArticleExcerpt';

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

        return <div className="mx-auto p-4 max-w-3xl">
            <h1 className="text-2xl mb-4">探索子</h1>
            <nav className="mb-4">
                <ul>
                    <li className="inline mr-2"><a href="/">文章</a></li>
                    <li className="inline mr-2"><a href="/friends">友链</a></li>
                    <li className="inline mr-2"><a href="/abouts">关于</a></li>
                </ul>
            </nav>
            <ul className="mb-6">
                {articles}
            </ul>
        </div>
    }

}

export default About;
