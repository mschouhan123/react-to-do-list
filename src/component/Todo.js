import React, { useEffect, useState } from 'react'; 
import "./styles.css"; 

const getLocalData = () => {
  const data = localStorage.getItem('myTodoList'); 

   if(data != ""){
     return JSON.parse(data); 
   }else{
     return [];
   }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItem] = useState(getLocalData());
  const [isEdidted, setIsEdited] = useState("");

  function addItem() {
    console.log(items);
     
    if(inputData == ""){
      alert("Please input the data")
    }else{
      const tempItem  = {
        name: inputData, 
        id: new Date().getTime().toString()
      }
      setItem([...items, tempItem]);
      setInputData(""); 
    }
  }
  
  function deleteItem(params) {
    
    const newArr = items.filter((item) => {
      return  item.id != params; 
    })

    setItem(newArr);
    console.log("items without deleted", newArr);
  }

  function editItem(params) {
    
    const editData = items.find((item) => { 
      return item.id === params; 
    });

     setInputData(editData.name);
  }
  useEffect(()=> {
     localStorage.setItem('myTodoList', JSON.stringify(items));
  },[items]);

  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
           <figure>
            <img src='./images/todo.svg' alt="svg"/>
            <figcaption> Add Your List here .</figcaption>
           </figure>
           <div>
            <div>
            <input
            type="text"
            placeholder='Add Item Here'
            onChange={(e)=> setInputData(e.target.value)}
            value={inputData}
            />
             <i onClick={()=> {addItem()}} className='fa fa-edit add-btn'></i> 
            </div>
           </div>

           <div className='showItems'>
              {items.map((item, index) => { 
                return (
                <div className='eachItem' key={index}> <h3>
                  {item.name}  </h3>
                  <div className='todo-btn'>
                   <i onClick={()=> {editItem(item.id)}}  className='far fa-edit add-btn'></i> 
                   <i onClick={()=> {deleteItem(item.id)}}  className='far fa-trash-alt add-btn'></i> 
                    </div>
                  </div>);
              })}
           </div>

         {/* Remove Button */}
          <div className='showItems'>
              <button
              className='btn effect04'
              data-sm-link-text="Remove All"
              onClick={()=>{setItem([])}}
              >
               <span> CHECK LIST</span>
              </button>
          </div>
        </div>
    </div>
    </>
  )
}

export default  Todo;