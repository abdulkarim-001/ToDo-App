import React,{useState,useEffect}  from 'react';
import List from './components/List';
import Alert from './components/Alert';




const getLocalStorage =()=>{
   let list = localStorage.getItem("list");
   if(list){
      return (list = JSON.parse(localStorage.getItem("list")))
   }else
   {
      return [];
   }
}


function App()  {

   const [name,setName] = useState("");
   const [list,setList] = useState(getLocalStorage());
   const [isEditing,setIsEditing] = useState(false);
   const [editID,setEditID] = useState(null);
   const [alert,setAlert] = useState({show:false,msg:"",type:""});


// handelSubmit

   const handelSubmit = (e)=>{
      e.preventDefault();
      if(!name){
         showAlert(true,"danger","please enter value")
      }else if(name && isEditing){
          setList(
              list.map((item) => {
                 if(item.id === editID){
                    return {...item, title:name}
                 }
                 return item;
              })
          );

          setName("");
          setEditID(null);
          setIsEditing(false);
          showAlert(true,"sucess","valueChanged")
      }else{
         showAlert(true,"sucess","item added to the list");
         const newItem = {id: new Date().getTime().toString(), title:name};
         setList([...list,newItem])
         setName("");

      }
   }


   // show Alert
   const showAlert = (show= false, type="", msg="")=>{
        setAlert({show,type,msg})
   }

// removeItem
const removeItem =(id)=>{
    showAlert(true,"danger","item Removed");
    setList(list.filter((item)=> item.id !==id));
}

// editItem

const editItem = (id)=>{
   const specificItem = list.find((item)=>item.id === id);
   setIsEditing(true);
   setEditID(id);
   setName(specificItem.title)
}
// clearList
const clearList = () => {
   showAlert(true, "danger", "empty list");
   setList([]);
 };
//  effect
   useEffect(()=>{
      localStorage.setItem("list",JSON.stringify(list))
   },[list])

   return(
       <main>
         <section className="section-center">
               <form className="grocery-form" onSubmit={handelSubmit}>
                   {alert.show && <Alert {...alert} removeAlert={showAlert}  list={list} />}
                   <h1>Todo List</h1>
                   <div className="form-control">
                        <input type="text" className="grocery"
                        placeholder="input your todo list"
                        value={name} onChange={(e)=> setName(e.target.value)} />
                        <button className="submit-btn">
                           {isEditing ? "edit" : "submit"}
                        </button>
                   </div>
               </form>
               <br/><br/>
               {
                  list.length > 0 && (
                     <div className="groceryContainer">
                        <List items = {list} removeItem={removeItem} editItem={editItem}/>
                        <button className="clear-btn" onClick={clearList}> Clear items</button>
                     </div>
                  )
               }
         </section>
       </main>
   )
}





export default App