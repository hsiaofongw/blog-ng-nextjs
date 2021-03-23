import Head from 'next/head'
import React from "react";
import { Heading1 } from './Heading';
import { HoverTransitionLink } from './Link';
import { Menu } from './Menu';

class Layout extends React.Component<ILayoutProps, {}> {

    render() {

        let headElement = <Head>
            <title>{this.props.blogBasicMetaData.title}</title>
            <meta charSet={this.props.blogBasicMetaData.charSet} />
            <meta name="description" content={this.props.blogBasicMetaData.description} />
            <link rel="alternate" type="application/atom+xml" title={this.props.blogBasicMetaData.title} href="/feed/atom" />
            <script async defer data-website-id="ab79c637-0ead-45c2-9ce3-df9b2b014d43" src="https://umami.exploro.one/umami.js"></script>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-56BN9HGYJ0"></script>
            <script src="/ga.js"></script>
            <link rel="icon" href={this.props.blogBasicMetaData.avatar} />
        </Head>;

        return <div className="mx-auto p-4 max-w-3xl">
            {headElement}
            <header>
                <Heading1>
                    <HoverTransitionLink href="/">
                        {this.props.blogBasicMetaData.title}
                    </HoverTransitionLink>
                </Heading1>
                <Menu {...this.props.blogBasicMetaData} />
            </header>
            <main>
                {this.props.children}
            </main>
        </div>;
    }

}

export default Layout;
