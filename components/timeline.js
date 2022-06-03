import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function BasicCard({ title, description, date, link = null }) {
  return (
    <div>
         <Typography sx={{
            fontSize: '.9em'
          }} component="span">
            {title}
          </Typography>
          <Typography sx={{
            fontSize: '0.7em'
          }}>{description}</Typography>
      {link != null ? (
        <Button variant="contained" size="small" color="primary" href={link} rel="noreferrer" target="_blank">Voir plus</Button>
      ) : <></>}
        <Typography sx={{
            fontSize: '0.6em'
          }} color="text.secondary">{date}</Typography>
    </div>
  );
}


export default function CustomeTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
            <BasicCard title="BAC MELEC" description="Obtention du Bac MELEC" date="Juillet 2021" />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
            <BasicCard title="Entrée en BTS" description="Début de mon BTS" date="Octobre 2021"/>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <CorporateFareIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
            <BasicCard title="Entrée en alternance" description="Première expérience professionelle chez Aprentiv'" date="Novembre 2021"/>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
            <BasicCard title="Veille" description="Ecriture de ma veille technologique" date="Décembre 2021"/>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
            <BasicCard title="Début du PPE" description="Création d'un Site E-commerce" link="https://github.com/garder500/bts-site" date="Janvier 2022 - Juin 2022"/>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
