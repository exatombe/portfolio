import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import matter from 'frontmatter';
import fs from 'fs';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useState } from 'react';
import config from '../config.json';
import styles from '../styles/Home.module.css';
const ContactForm = dynamic(() => import('../components/contactForm'), { ssr: false });
const HeadComponent = dynamic(() => import('../components/head'), { ssr: false });
const Timeline = dynamic(() => import('../components/timeline'), { ssr: false });
const Markdown = dynamic(() => import('../components/markdown'), { ssr: false });
const CardComponent = dynamic(() => import('../components/card'), { ssr: false});
const Particles = dynamic(() => import("../components/particles"), { ssr: false });
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export async function getStaticProps(context) {
  async function readDirAndDisplay(dir) {
    const GetDir = new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject([])
        }
      resolve(files)
      });
    });
    const files = await GetDir;
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
  let posts = [];  
function getFileContent(file) {
    return fs.readFileSync(file, 'utf-8');
  }
const files = await readDirAndDisplay("./posts");
  posts = files.map(file => {
    let { data } = matter(getFileContent(file));
    data.link = file.split("/")[2].replace('.md', '');
    data.date = String(new Date(data.date).toUTCString()).replace("GMT","+0000")
    return data;
  });  


  const home = getFileContent(config.root);

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
        <HeadComponent title={config['root-data'].sitename} description={config["root-data"].sitedescription} />
         <Particles />
        <main className={styles.main} >
       
            <h1 className={styles.title}>
              {config['root-data'].sitename}
            </h1>
            <span className={styles.subtitle}>{config['root-data'].description}</span>
            <p className={styles.description}>

            </p>

            <Box centered sx={{ width:"100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
              <Tabs 
                value={value} 
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="Tableau de choix">
                  <Tab sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }} label={"A propos"}    {...a11yProps(0)} />
                  <Tab sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }} label={"Articles"} {...a11yProps(1)} />
                  <Tab sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }} label={"Parcours"} {...a11yProps(2)} />
                  <Tab sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }} label={"Contact"} {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Markdown md={props.home} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {props.posts.map((post, index) => (
                    <Grid key={index} xs={4} sm={4} md={4} item >
                      <CardComponent title={post.title} description={post.description} image={post.thumbnail} link={post.link} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Timeline />
              </TabPanel>
              <TabPanel value={value} index={3}>
                    <ContactForm />
              </TabPanel>
            </Box>            
        </main>
        
        <footer className={styles.footer}>
          <p>{config['root-data'].footer} | {config['root-data'].copyright}</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}
