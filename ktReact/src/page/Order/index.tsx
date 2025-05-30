import Table from "@mui/material/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
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
import {getMethor} from "../../utils/api.tsx";

const rows =async ()=>{
  const reponse= await getMethor('order')

  return reponse;
}
export default function () {

  const [order,setOrder]=useState([]);
  const [product,setProduct]=useState([]);
  const [data,setData]=useState([])



  console.log(product)
  console.log(order)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const saveProduct=()=>{

    const data = {...value,id:order.length+1}
    setOrder([...order,data])
    setValue({})
    setOpen(false)
  }
  const deleteProduct=(index)=>{
    order.splice(index,1)
    setOrder([...order])
  }
  const addProduct=()=> setOpen(true)

  const amouse = async ()=>{
    try {
      const reponse= await rows()
      const reponse2= await getMethor('products')

        const obj ={}
      reponse2.map((row)=>{
          obj[row.id]=row
        })
        const dataValue = reponse.map((row)=>{
          row.product_id=obj[row.product_id]
        })
        setData(dataValue)

      setProduct(reponse2)
      setOrder(reponse)
    }  catch (e) {}

  }
  useEffect(() => {
    amouse()
    console.log(order)
console.log(data)
  }, []);


  return (

    <>
      <Button variant="contained" onClick={addProduct}>add</Button>
      <Dialog
        open={open}

      >

        <DialogContent>

          <Autocomplete
            disablePortal
            options={product.map((row)=>row.name)}
            sx={{ width: 300 }}

            renderInput={(params) => <TextField {...params} label="product" variant="standard" />}

          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="quantity"
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
              <TableCell >Productname</TableCell>
              <TableCell >quantity</TableCell>
              <TableCell >amount</TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((row,index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >{row.id}</TableCell>
                <TableCell >{row.product_id['name']}</TableCell>
                <TableCell >{row.quantity}</TableCell>
                <TableCell >{row.amount}</TableCell>
                <TableCell ><DeleteIcon onClick={()=>deleteProduct(index)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}