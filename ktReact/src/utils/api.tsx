


export const getMethor = async (url:String)=>{
    try{
      const response = await fetch(`http://localhost:3000/${url}`);
      const data = await response.json();
      return await data;
    }catch (e){
      console.log(e)
    }
}
export const postMethor = async (url:String,body:any)=>{
  try{

      const response = await fetch(`http://localhost:3000/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),

    });
    const data = await response.json();
    return await data;
  }catch (e){
    console.log(e)
  }
}
export const deleteMethor = async (url:string,id:number)=>{
  try{
    const response = await fetch(`http://localhost:3000/${url}/${id}`,{
      method:'DELETE'
    });
    return await response.json();

  }catch (e){
    console.log(e)
  }
}