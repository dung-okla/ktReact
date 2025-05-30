import Table from "@mui/material/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog, DialogActions, DialogContent,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {deleteMethor, getMethor, postMethor} from "../../utils/api.tsx";

const rows =async ()=>{
  const reponse= await getMethor('products')

  return reponse;
}
export default function () {

  const [product,setProduct]=useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const saveProduct=()=>{
    console.log(value)
    const data = {...value,id:product.length+1}
    setProduct([...product,data])
    setValue({})
    setOpen(false)
    postMethor('products',data)
  }
  const deleteProduct=(index)=>{

    product.splice(index,1)
    setProduct([...product])
    deleteMethor('products',index)
  }
  const addProduct=()=> setOpen(true)

  const amouse = async ()=>{
  try {
    const reponse= await rows()
    setProduct(reponse)
  }  catch (e) {}
console.log(product)
  }
  useEffect(() => {
   amouse()
  }, []);
  console.log(product)
  console.log(rows())

  return (

<>
    <Button variant="contained" onClick={addProduct}>add</Button>
  <Dialog
    open={open}

  >

    <DialogContent>

      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label="name"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="price"
        name="price"
        label="price"
        type="number"
        fullWidth
        variant="standard"
        onChange={(e)=>setValue({...value,[e.target.name]:Number(e.target.value)})}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="remaining"
        label="remaining"
        type="number"
        fullWidth
        variant="standard"
        onChange={(e)=>setValue({...value,[e.target.name]:Number(e.target.value)})}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>setOpen(false)}>Cancel</Button>
      <Button type="submit"  onClick={()=>saveProduct()}>save</Button>
    </DialogActions>
  </Dialog>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell >name</TableCell>
            <TableCell >price</TableCell>
            <TableCell >remaining</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((row,index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.id}</TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.price}</TableCell>
              <TableCell >{row.remaining}</TableCell>
              <TableCell ><DeleteIcon onClick={()=>deleteProduct(index)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</>
  )
}