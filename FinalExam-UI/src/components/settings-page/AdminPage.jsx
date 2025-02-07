import { Button, CardContent, Stack, Typography, Modal, Box, Input, InputLabel, FormControl  } from '@mui/material';
import { useUserAuth } from '../authorization/UserAuth';
import { useContext, useState } from 'react';
import { GlobalContext } from '../global-context/AppContext';
import { Add } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width:'90vw',
  minWidth: '380px',
  maxWidth: '800px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


export const AdminPage = () => {
  const [newCategory, setNewCategory] = useState({
    name: ''
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [selectedCat, setSelectedCat] = useState({});

  const { adminMessage } = useUserAuth();

  const [anotherBox, setAnotherBox] = useState(false);
  const handleAnotherBox = () => setAnotherBox(!anotherBox);

  const { categories, removeCategory, addCategory } = useContext(GlobalContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    addCategory(newCategory);
    handleClose();
    setAnotherBox(false);
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setNewCategory((form) => ({ ...form, [key]: value }));
    };

  

  return (
    <CardContent sx={{height:'auto'}}>
      <Typography align='center'>{adminMessage}</Typography>
      <Typography variant='h4' color='warning'>Add / Remove categories:</Typography>
      <Stack direction={'row'} sx={{flexWrap:'wrap'}}>
        {categories.map((cat) => 
        (<Button onClick={() => {handleOpen(); setSelectedCat(cat)}} key={cat.id}>{cat.name}</Button>))}
        <Button onClick={() => {handleAnotherBox(true); handleOpen();}}><Add/></Button>
      </Stack>
      <Modal
        open={open}
        onClose={() => {handleClose(); setAnotherBox(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        {anotherBox ? 
        <Box sx={style}>
        <Typography gutterBottom id="modal-modal-title" variant="h6" component="h2">
          Create new category!
        </Typography>
        <form noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '80%' }}>
        <FormControl>
          <InputLabel htmlFor="name">Category Name</InputLabel>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            autoFocus
          />
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit} type="submit">
          Create
        </Button>        
        <Button variant="outlined" onClick={() => {handleClose(); setAnotherBox(false)}}>Exit</Button>
      </form>

</Box>
        :
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete category {selectedCat.name} ?
          </Typography>
          <Button onClick={() => {removeCategory(selectedCat); handleClose()}}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </Box>}
      </Modal>

    <Typography sx={{marginTop:'25px'}} variant='h4' color='warning'>Add / Edit / Remove posts:</Typography>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button>Add</Button>
          <Button>Edit</Button>
          <Button>Remove</Button>
        </Stack>
    </CardContent>
  );
};
