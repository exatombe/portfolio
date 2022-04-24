import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import HeadComponent from '../components/head';
import Loader from '../components/loader';
import styles from '../styles/Home.module.css';
import detectBrowserLanguage from 'detect-browser-language';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
          <Typography>{children}</Typography>
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


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);
  if (isLoading) {
    return (
      <Loader />
    )
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={styles.container}>
          <HeadComponent title={"Jeremy Soler"} description={"Jeremy Soler, Mobile and Web App develope. Ask me everyting via email : contact@jeremysoler.com"} />

          <main className={styles.main}>
            <h1 className={styles.title}>
              Jeremy Soler 
            </h1>
            <span className={styles.subtitle}>Mobile and Web App developer</span>
            <p className={styles.description}>
              
            </p>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                  <Tab label={ detectBrowserLanguage().startsWith('fr') ? "A propos" : "About"  }    {...a11yProps(0)} />
                  <Tab label={detectBrowserLanguage().startsWith('fr') ? "Articles" : "Posts"} {...a11yProps(1)} />
                  <Tab label={detectBrowserLanguage().startsWith('fr') ? "Contactez moi" : "Contact me"} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                Item One
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
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
}
