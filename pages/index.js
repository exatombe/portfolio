import { CssBaseline, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import HeadComponent from '../components/head';
import styles from '../styles/Home.module.css';
import Markdown from '../components/markdown';
import config from '../config.json';
import fs from 'fs';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export function getStaticProps(context) {

  const home = fs.readFileSync(config.root, 'utf8');
  return {
    props: {
      home,
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
  console.log(props);
  const [value, setValue] = useState(0);
  const [presentation, setPresentation] = useState({
    subtitle: 'Développeur Web et Mobile',
    menus: {
      about:"A propos",
      contact:"Contact",
      posts:"Articles",
    }
  });


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={styles.container}>
          <HeadComponent title={"Jeremy Soler"} description={"Jeremy Soler, Mobile and Web App develope. Ask me everyting via email : contact@jeremysoler.com"} />

          <main className={styles.main}>
            <h1 className={styles.title}>
              Jeremy Soler 
            </h1>
            <span className={styles.subtitle}>{ presentation.subtitle }</span>
            <p className={styles.description}>
              
            </p>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                  <Tab label={presentation.menus.about}    {...a11yProps(0)} />
                  <Tab label={presentation.menus.posts} {...a11yProps(1)} />
                  <Tab label={presentation.menus.contact} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
              <Markdown md={props.home} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography>Posts Lists</Typography>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Typography>Info to contact me</Typography>
              </TabPanel>
            </Box>
          </main>

          <footer className={styles.footer}>
            <p >Site made with <a href="https://nextjs.org/">Next.js</a> and <a href="https://mui.com">Material-UI</a> by Jeremy Soler</p>
          </footer>
        </div>
      </ThemeProvider>
    )
}
