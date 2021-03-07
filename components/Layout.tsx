import Head from 'next/head'
import React from "react";
import styles from '../styles/Public.module.scss'

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

class Layout extends React.Component<ILayoutProps, {}> {

    render() {
        const menuElement = <Menu links={this.props.blogBasicMetaData.menu} />;

        let pageName = this.props.blogBasicMetaData.title;
        if (this.props.pageName) {
            pageName = this.props.pageName;
        }

        let avatar = "/favicon.ico";
        if (this.props.blogBasicMetaData.avatar) {
            avatar = this.props.blogBasicMetaData.avatar;
        }

        let titleElement = undefined;
        if (this.props.title) {
            titleElement = <h1>{this.props.title}</h1>;
        }

        let headElement = <Head>
            <title>{pageName}</title>
            <meta charSet={this.props.blogBasicMetaData.charSet} />
            <meta name="description" content={this.props.blogBasicMetaData.description} />
            <script async defer data-website-id="b8fb05b6-bf40-4246-85ee-faaddebc90fb" src="http://173.82.240.157:3000/umami.js"></script>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-56BN9HGYJ0"></script>
            <script src="/ga.js"></script>
            <link rel="icon" href={avatar} />
        </Head>;

        return <div className={styles.container}>
            {headElement}
            {titleElement}
            {menuElement}
            {this.props.children}
        </div>;
    }

}

export default Layout;
