import { CssBaseline } from '@mui/material';
import { Box, Button, Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import config from '../config.json';
import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import LoadingSpinner from '../components/loader';

const HeadComponent = dynamic(() => import('../components/head'), { ssr: false });
const Markdown = dynamic(() => import('../components/markdown'), { ssr: false, loading: () => <LoadingSpinner /> });
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export function getStaticPaths() {
    const files = fs.readdirSync(config.posts.root);
    return {
        paths: files.map(file => {
            return { params: { post: file.replace('.md', '') } }
        }),
        fallback: false,
    }
}

export function getStaticProps(context) {
    function getFileContent(file) {
        return fs.readFileSync(file, 'utf-8');
    }
    const { content, data } = matter(getFileContent("./global/posts/" + context.params.post + ".md"));
    
    return {
        props: {
            content,
            data
        }, // will be passed to the page component as props
    }
}

export default function Home(props) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
             <div className={styles.container} suppressHydrationWarning={true}>
                <HeadComponent title={props.data.title} description={props.data.description} />

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        {config['root-data'].sitename}
                    </h1>
                    <span className={styles.subtitle}>{config['root-data'].description}</span>
                    <div className={styles.description}>
                        <Link href="/" passHref>
                            <Button variant="contained" color="primary">
                                Retourner au menu principal
                            </Button>
                        </Link>
                    </div>
                    <hr style={{ height: "2px", width: "100%" }} />
                    <Box sx={{ maxWidth:'1000px' }}>
                        <Markdown md={props.content} />
                    </Box>
                </main>

                <footer className={styles.footer}>
                    <p>{config['root-data'].footer} | {config['root-data'].copyright}</p>
                </footer>
            </div>
        </ThemeProvider>
    )
}