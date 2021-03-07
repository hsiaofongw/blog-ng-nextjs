import Head from 'next/head'
import React from "react";
import styles from '../styles/Public.module.scss'

class Layout extends React.Component<ILayoutProps, {}> {

    render() {
        let pageName = this.props.blogBasicMetaData.title;
        if (this.props.pageName) {
            pageName = this.props.pageName;
        }

        let avatar = "/favicon.ico";
        if (this.props.blogBasicMetaData.avatar) {
            avatar = this.props.blogBasicMetaData.avatar;
        }

        let headElement = <Head>
            <title>{pageName}</title>
            <meta charSet={this.props.blogBasicMetaData.charSet} />
            <meta name="description" content={this.props.blogBasicMetaData.description} />
            <link rel="icon" href={avatar} />
        </Head>;

        return <div className={styles.container}>
            {headElement}
            {this.props.children}
        </div>;
    }

}

export default Layout;
