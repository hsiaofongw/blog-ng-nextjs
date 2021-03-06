import Head from 'next/head'
import React from "react";
import styles from '../../styles/About.module.scss'

export async function getStaticProps() {

    const giteeUrl = "https://gitee.com/hsiaofongw/helloworld/raw/master";
    let dataUrl = `${giteeUrl}/abouts.json`;
    let linkDataUrl = `${giteeUrl}/blog-global-navigation.json`;
    let blogBasicMetaDataUrl = `${giteeUrl}/blog-basic-metadata.json`;
    
    const postExcerptData = await fetch(dataUrl).then(d => d.json());
    const linkData = await fetch(linkDataUrl).then(d => d.json());
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json());

    return { props: { postExcerptData, linkData, blogBasicMetaData }};
}

class Menu extends React.Component<IMenuProps, {}> {

    constructor(props: IMenuProps) {
        super(props);
    }

    render() {
        const linkElements = this.props.links.filter(l => !l.experimental).map(l => {
            if (l.newTab) {
                return <li key={l.link}><a href={l.link} target="_blank">{l.name}</a></li>;
            }
            else {
                return <li key={l.link}><a href={l.link} >{l.name}</a></li>;
            }
        });

        let menu = <nav className={styles.menu}><ul>{linkElements}</ul></nav>;

        return menu;
    }
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

class About extends React.Component<IAboutProps, {}> {

    constructor(props: IAboutProps) {
        super(props);
        console.log(props);
    }

    render() {
        let headElement = <Head>
            <title>{this.props.blogBasicMetaData.title}</title>
            <meta charSet={this.props.blogBasicMetaData.charSet} />
            <meta name="description" content={this.props.blogBasicMetaData.description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>;

        let titleElement = <h1>{this.props.blogBasicMetaData.title}</h1>;

        let menuElement = <Menu links={this.props.linkData} />;

        const articles = this.props.postExcerptData;
        const articleElements = articles.map(a => <ArticleExcerpt key={a.file} {...a} />);
        const articlesListElement = <ArticleExcerptList>{articleElements}</ArticleExcerptList>

        return (
            <div className={styles.container}>
                {titleElement}
                {headElement}               
                {menuElement}

                <main className={styles.main}>
                    {articlesListElement}
                </main>

                <footer className={styles.footer}></footer>
            </div>
        );
    }

}

export default About;
