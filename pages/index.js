import PropTypes from 'prop-types';
import { CssBaseline, Typography, Tabs, Tab, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import config from '../config.json';
import fs from 'fs';

const HeadComponent = dynamic(() => import('../components/head'), { ssr: false });
const Markdown = dynamic(() => import('../components/markdown'), { ssr: false });
const CardComponent = dynamic(() => import('../components/card'), { ssr: false });
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export function getStaticProps(context) {
  function readDirAndDisplay(dir) {
    const files = fs.readdirSync(dir);
    return files.map(file => {
      const filePath = `${dir}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        return readDirAndDisplay(filePath);
      } else {
        return filePath;
      }
    });
  }

  const files = readDirAndDisplay(config.posts.root);
  function getFileContent(file) {
    return fs.readFileSync(file, 'utf-8');
  }
  const home = getFileContent(config.root);
  const posts = files.map(file => {
      return JSON.parse(getFileContent(file));
  });
  return {
    props: {
      home,
      posts
    }, // will be passed to the page component as props
  }
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home(props) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={styles.container} suppressHydrationWarning={true}>
          <HeadComponent title={"Jeremy Soler"} description={"Jeremy Soler, Mobile and Web App develope. Ask me everyting via email : contact@jeremysoler.com"} />

          <main className={styles.main} >
            <h1 className={styles.title}>
              Jeremy Soler 
            </h1>
            <span className={styles.subtitle}>Développeur Web et Mobile</span>
            <p className={styles.description}>
              
            </p>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                  <Tab label={"A propos"}    {...a11yProps(0)} />
                  <Tab label={"Articles"} {...a11yProps(1)} />
                  <Tab label={"Contact"} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Markdown md={props.home} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                { props.posts.map((post, index) => (
                  <div key={index}>
                     <CardComponent title={post.title} description={post.description} image={post.image} link={post.link} />
                  </div>
                ))}
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Typography>Info to contact me</Typography>
              </TabPanel>
            </Box>
          </main>

          <footer className={styles.footer}>
            <p >Site made with Next.js and Material-UI by Jeremy Soler</p>
          </footer>
        </div>
      </ThemeProvider>
    )
}
