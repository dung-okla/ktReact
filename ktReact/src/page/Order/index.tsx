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
import {deleteMethor, getMethor, postMethor} from "../../utils/api.tsx";


export default function () {

  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);


  const save = () => {

    console.log(value)
    const data = {...value, id: String(Math.max(...order.map(p => Number(p.id)+1))),amount:value.quantity * value.product_id['price'],
    }
    // @ts-ignore
    setOrder([...order, data])
    // @ts-ignore
    data.product_id=data.product_id.id
    // @ts-ignore
    data.date=new Date().toLocaleDateString("en-US")
    postMethor('order', data)
    setValue({})
    setOpen(false)
  }
  const deleteProduct = (index,id) => {
    console.log(index)
    console.log(order[index])
    order.splice(index, 1)
    setOrder([...order])
    deleteMethor('order', id)
  }
  const addProduct = () => setOpen(true)

  const amouse = async () => {
    try {
      const reponse = await getMethor('order')
      const reponse2 = await getMethor('products')

      const obj = {}
      reponse2.map((row:any) => {
        // @ts-ignore
        obj[row.id] = row
      })
     reponse.map((row:any) => {
        row.product_id = obj[row.product_id]
      })

      setProduct(reponse2)
      setOrder(reponse)
    } catch (e) {
    }

  }
  useEffect(() => {
    amouse()

  }, []);


  // @ts-ignore
  return (

    <>
      <h1>Order</h1>
      <Button variant="contained" onClick={addProduct}>add</Button>
      <Dialog
        open={open}

      >

        <DialogContent>

          <Autocomplete
            disablePortal
            options={product.map((row) => row.name)}
            sx={{width: 300}}

            renderInput={(params) => <TextField {...params} label="product" variant="standard"/>}
            onChange={(e) => {
          const index= e.target.getAttribute('data-option-index')
            const product_id=product[index]

              setValue({...value,product_id:product_id})

              console.log(value)

            }}
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
            onChange={(e) => setValue({...value, [e.target.name]: Number(e.target.value)})}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={() => save()}>save</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Productname</TableCell>
              <TableCell>quantity</TableCell>
              <TableCell>amount</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {



              order.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.product_id['name']}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell ><Button onClick={()=>deleteProduct(index,row.id)}><DeleteIcon /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}