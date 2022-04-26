import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link";
export default function CardComponent({ title, description, image, link }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {description}
            </Typography>
          </CardContent>
          <CardActions>
              <Link href={link} passHref>
            <Button size="small">En savoir plus</Button>
            </Link>
          </CardActions>
        </Card>
      );
    }