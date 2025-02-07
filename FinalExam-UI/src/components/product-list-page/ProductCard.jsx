import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router';

export const ProductCard = (props) => {
  const { name, platforms, description, image_url, price, genres, addToBasket } = props;

  return (
    <Card sx={{ width: '250px' }}>
      <CardActionArea>
        <CardMedia image={image_url} sx={{ height: '200px' }} />
        <CardContent sx={{ padding: '0px' }}>
          <CardHeader title={name} subheader={description} sx={{ padding: '5px 0px 5px 8px' }} />
          <Typography component={Box} variant="caption" sx={{ marginLeft: '8px' }}>
            Kategorija: {genres}
          </Typography>          
          <Typography component={Box} variant="caption" sx={{ marginLeft: '8px' }}>
            Miestas: {platforms}
          </Typography>
          <Typography component={Box} sx={{ textAlign: 'end', marginRight: '8px' }}>
            {price !== 0 ? `${price} €` : 'Free'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={addToBasket}>Add to basket</Button>
        <Button component={Link}>Buy now</Button>
      </CardActions>
    </Card>
  );
};
