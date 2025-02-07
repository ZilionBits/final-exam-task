import { ProductCard } from './ProductCard';
import { Container, Grid2, Input, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { GlobalContext } from '../global-context/AppContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export const ProductListPage = () => {
  const { gamesData, isLoading, isError, addToBasket } = useContext(GlobalContext);
  const [filterName, setFilterName] = useState('');

  const handleChange = (event) => {
    setFilterName(event.target.value);
  };

  if (isLoading || isError) {
    if (isLoading) {
      return <h1>Data is loading...</h1>;
    }
    return <h1>Something went wrong...</h1>;
  }


  return (
    <>
      <Typography variant='h4'>Transportas</Typography>
      <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter by name</InputLabel>
        <Input
            id="filterName"
            name="filterName"
            type="text"
            onChange={handleChange}
            autoFocus
          />
      </FormControl>
    </Box>
      <Container fixed>
        <Grid2 container spacing={2}>
          {gamesData.map((data) => (
            <Grid2
              key={data.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard
                name={data.name}
                platforms={data.cities.join(' ')}
                description={data.description}
                image_url={data.imageUrl}
                price={data.price}
                genres={data.genres.map((genre) => genre.name).join(' ')}
                addToBasket={() => addToBasket(data.id)}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
};
