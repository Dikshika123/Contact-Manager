import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'

const Addcontact = () => {

let navigate=useNavigate
  let[state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:'',
      email:"",
      title:"",
      company:""
    },
    groups:[],
    errorMessage:''
  })
  useEffect(()=>{
    let prom=new Promise((res,rej)=>{
      setState({...state,loading:true})
      let groupResponse=ContactServices.getGroups()
      res(groupResponse)
    })
    prom.then((resp1)=>{
      setState({...state,loading:false,groups:resp1.data})
      console.log(resp1.data);
    }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error})
      alert("data not found")
    })
  },[])
  let updateInput=(event)=>{
    setState({
      ...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value
      }
    })
    
  }
  let submitForm =(event)=>{
    event.preventDefault();
    let prom=new Promise((res,rej)=>{
      let postcontact=ContactServices.createcontact(state.contact)
      res(postcontact)
    })
    prom.then((resp1)=>{
      if (resp1){
        setState({...state,contact:resp1.data})
        navigate('/contacts/list',{replace:true})
      }
      else{
        navigate('/contacts/add',{replace:false})
      }
  }
    )
} 
  let{loading,contact,groups,errorMessage}=state
  return (
    
    <div>
      <pre>{JSON.stringify(groups)}</pre>
      {/* addpage */}
      <section className='create-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h4 text-sucess fw-bold'>create contact</p>
              <p className='fst-italic'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium unde nam facere libero reiciendis hic porro dolores laudantium tempora modi?</p>
            </div>
          </div>
          {/* row2 */}
          <div className="row">
            <div className="col-md-4">
              <form action="" onSubmit={submitForm} >
                <div className="mb-2">
                <input type="text" className='form-contro' name='name' value={contact.name} onChange={updateInput} placeholder='name'></input>
                </div>
                <div className="mb-2">
                <input type="text" className='form-control' name='name' value={contact.photo} onchange={updateInput}></input>
                </div>
                <div className="mb-2">
                <input type="text" className='form-control' placeholder='Mobile number' name='name' value='contact'></input>
                </div>
                <div className="mb-2">
                <input type="text" className='form-control' placeholder='Email'></input>
                </div>
                <div className="mb-2">
                <input type="text" className='form-control' placeholder='Title'></input>
                </div>
                <div className="mb-2">
                <input type="text" className='form-control' placeholder='Company'></input>
                </div>
                <div className="mb-2">
                  <select name="" id="" className='form control'>
                    <option value="">select A group</option>
                    {
                      groups.length>0 &&
                      groups.map((group)=>{
                        return(
                           <option key={group.id} value={group.name}>{group.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type ="submit" className='btn btn-success' value={"create"}/>
                  <Link to={'/'} className="btn btn danger ms-2">cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>


    </div>
  );
}

export default Addcontact;
