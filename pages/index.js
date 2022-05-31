import PropTypes from 'prop-types';
import { CssBaseline, Tabs, Tab, Box, Grid, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import config from '../config.json';
import fs from 'fs';
import HeadComponent from '../components/head';
import LoadingSpinner from '../components/loader';
import matter from 'gray-matter';
import { useForm, ValidationError } from '@formspree/react';
const Markdown = dynamic(() => import('../components/markdown'), { ssr: false, loading: () => <LoadingSpinner /> });
const CardComponent = dynamic(() => import('../components/card'), { ssr: false, loading: () => <LoadingSpinner /> });
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
    let { data } = matter(getFileContent(file));
    data.link = file.split("/")[3].replace('.md', '');
    return data;
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
  const [state, handleSubmit] = useForm("moqrylza");
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    severity: 'success',
    msg: 'Votre message m\'as bien été transmis, je vous répondrai dans les plus brefs délais.',
  })
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (state.succeeded) {
      setAlertMsg({
        severity: 'success',
        msg: 'Votre message m\'as bien été transmis, je vous répondrai dans les plus brefs délais.',
      })
      setOpen(true);
    }
    if(state.errors.length > 0) {
      setAlertMsg({
        severity: 'error',
        msg: 'Une erreur est survenue, veuillez réessayer.',
      })
      setOpen(true);
    }
  }, [state.succeeded, state.errors]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={styles.container} suppressHydrationWarning={true}>
        <HeadComponent title={config['root-data'].sitename} description={config["root-data"].sitedescription} />

        <main className={styles.main} >
          <h1 className={styles.title}>
            {config['root-data'].sitename}
          </h1>
          <span className={styles.subtitle}>{config['root-data'].description}</span>
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
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {props.posts.map((post, index) => (
                  <Grid key={index} xs={4} sm={4} md={4} item >
                    <CardComponent title={post.title} description={post.description} image={post.image} link={post.link} />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={alertMsg.severity} sx={{ width: '100%' }}>
                {alertMsg.msg}
              </Alert>
            </Snackbar>
              <section className={styles.contact_form}>
                <div className={styles.contact_box}>
                  <div className={styles.contact_links}>
                    <h2 className={styles.contact_form_title}>CONTACT</h2>
                    <div className={styles.links}>
                      <div className={styles.link}>
                        <a href="https://www.linkedin.com/in/jeremy-soler-1b34b0200/" rel="noreferrer" target="_blank"><img className={styles.contact_form_img} src="https://i.postimg.cc/m2mg2Hjm/linkedin.png" alt="linkedin" /></a>
                      </div>
                      <div className={styles.link}>
                        <a href="https://www.linkedin.com/in/jeremy-soler-1b34b0200/" rel="noreferrer" target="_blank"><img className={styles.contact_form_img} src="https://i.postimg.cc/YCV2QBJg/github.png" alt="github" /></a>
                      </div>
                      <div className={styles.link}>
                        <a href="mailto:contact@jeremysoler.com" ><img className={styles.contact_form_img} src="https://i.postimg.cc/NjLfyjPB/email.png" alt="email" /></a>
                      </div>
                    </div>
                  </div>
                  <div className={styles.contact_form_wrapper}>
                    <form method="POST" onSubmit={handleSubmit}>
                      <div className={styles.form_item}>
                        <input className={styles.contact_form_input} type="text" name="sender" required />
                        <label className={styles.contact_form_label}>Name:</label>
                      </div>
                      <div className={styles.form_item}>
                        <input type="text" className={styles.contact_form_input} name="email" required />
                        <label className={styles.contact_form_label}>Email:</label>
                      </div>
                      <div className={styles.form_item}>
                        <textarea className={styles.contact_form_textarea} name="message" required></textarea>
                        <label className={styles.contact_form_label}>Message:</label>
                      </div>
                      <button className={styles.submit_btn} type="submit">Send</button>
                    </form>
                  </div>
                </div>
              </section>
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
