import Image from 'next/image';
import { useForm } from '@formspree/react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function ContactForm() {
    const ImageLoader = ({ src, width, quality }) => {
        return src;
      }
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
        if (state.errors.length > 0) {
          setAlertMsg({
            severity: 'error',
            msg: 'Une erreur est survenue, veuillez réessayer.',
          })
          setOpen(true);
        }
      }, [state.succeeded, state.errors]);


    return (
        <div>
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
                          <a href="https://www.linkedin.com/in/jeremy-soler-1b34b0200/" rel="noreferrer" target="_blank"><Image height='32' width='32' loader={ImageLoader} className={styles.contact_form_img} src="https://i.postimg.cc/m2mg2Hjm/linkedin.png" alt="linkedin" /></a>
                        </div>
                        <div className={styles.link}>
                          <a href="https://github.com/garder500/" rel="noreferrer" target="_blank"><Image height='32' width='32' loader={ImageLoader} className={styles.contact_form_img} src="https://i.postimg.cc/YCV2QBJg/github.png" alt="github" /></a>
                        </div>
                        <div className={styles.link}>
                          <a href="mailto:contact@jeremysoler.com" ><Image loader={ImageLoader} height='32' width='32'  className={styles.contact_form_img} src="https://i.postimg.cc/NjLfyjPB/email.png" alt="email" /></a>
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
                </div>
    )
}