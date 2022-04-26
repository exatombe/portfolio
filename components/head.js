import Head from 'next/head'

export default function HeadComponent({ title, description}){
    return (
        <Head>
           <title>{title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="description" content={description} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Jeremy Soler" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Jeremy Soler" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jeremy Soler" />
        <meta name="keywords" content="Jeremy soler, web App, developper, mobile app, mobile developper, react native, react, nextjs, jeremysoler, jeremy soler, soler jeremy, jeremysoler.com, developpeur, mobile dev, react native dev, react dev, web app dev, dev web, developpeur react, developpeur PHP, developpeur Javascript, PHP, js, css, html, developpeur full stack, yaboku, bot-creator, The friend game, amis via app, making friend with yaboku" />
        <meta property="og:url" content="https://jeremysoler.com" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:description" content={description}/>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@garder500" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content= {description} />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=4" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#1a1a1a"/>
        <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}