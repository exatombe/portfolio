import { CssBaseline } from '@mui/material';
import { Box, Button, Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import config from '../config.json';
import Link from 'next/link';
import fs from 'fs';
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
            return { params: { post: file.replace('.json', '') } }
        }),
        fallback: false,
    }
}

export function getStaticProps(context) {
    function getFileContent(file) {
        return fs.readFileSync(file, 'utf-8');
    }
    const post = getFileContent("./global/posts/" + context.params.post + ".md");
    const postJSON = JSON.parse(getFileContent("./global/posts/jsons/" + context.params.post + ".json"));
    return {
        props: {
            post,
            postJSON
        }, // will be passed to the page component as props
    }
}

export default function Home(props) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
             <div className={styles.container} suppressHydrationWarning={true}>
                <HeadComponent title={props.postJSON.title} description={props.postJSON.description} />

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Jeremy Soler
                    </h1>
                    <span className={styles.subtitle}>Développeur Web et Mobile</span>
                    <div className={styles.description}>
                        <Link href="/" passHref>
                            <Button variant="contained" color="primary">
                                Retourné au menu principal
                            </Button>
                        </Link>
                    </div>
                    <hr style={{ height: "2px", width: "100%" }} />
                    <Box sx={{ width: '100%' }}>
                        <Markdown md={props.post} />
                    </Box>
                </main>

                <footer className={styles.footer}>
                    <p >Site made with Next.js and Material-UI by Jeremy Soler</p>
                </footer>
            </div>
        </ThemeProvider>
    )
}