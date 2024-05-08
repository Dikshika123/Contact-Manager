import React, { useEffect, useState } from 'react'
import{Link, useNavigate} from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'

const EditContact = () => {
  let navigate=useNavigate
  let{contactId} =useParams()
  let[state;,setstate]=useState({
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
      let response=ContactServices.getcontact(contactId)
      res(response)
    })
    prom.then((resp1)=>{
      console.log(resp1);
      setstate({...state,loading:false,contacy:resp1.data})
      return new Promise((res1,rej1)=>{
        let groupResponse=ContactServices.getGroups()
        res1(groupResponse)
      }).then((resp2)=>{
        console.log(resp2);
        setstate({...state,loading:false,contact:resp1.data,group:resp2.data})
      },)
     
      
    },[contactId])
    let updateInput=(event)=>{
      setState({
        ...state,contact:{
          ...state.contact,
          [event.target.name]:event.target.value
        }
        

  })
 
}
let submitForm =(event,contactId)=>{
  event.preventDeafult();
  let prom=new Promise((res,rej)=>{
    let putcontact=ContactServices.updateContact(state.contact,contactId)
    res(response)
    rej("error")
  })
  prom.then((res)=>{
    if(res){
      setstate({...state,contact:resp1.data})
      navigate('/contacts/list',{replace:true})
    
    }
  }).catch((error)=>{
    setState({...state,loading:false,errorMessage:error})
    navigate(`/contacts/edit/$`,{replace:true})
  })
    
}
  
  
  return (
    <div>
      {/*edit page  */}
      <pre>{JSON.stringify(groups)}</pre>
      <pre>{JSON.stringify(contacts)}</pre>
      <section className='edit-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h4 fe-bold  text-primary'>Edit contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus itaque impedit, nostrum quae in reprehenderit cupiditate eligendi quia dolore beatae repudiandae doloribus! Quia odit quas voluptatem aspernatur? At, officiis ab!</p>
            </div>
          </div>
          {/* row -2 */}
          <div className="row">
            <div className="col-md-4">
              <form action="">
                <div className="mb-2">
                  <input type="text" className='form control'placeholder='Name' ></input>
                </div>
                <div className="mb-2">
                  <input type="text" className='form control'placeholder='photo url'></input>
                </div>
                <div className="mb-2">
                  <input type="text" className='form control'placeholder='mobile Number'></input>
                </div>
                <div className="mb-2">
                  <input type="text" className='form control'placeholder='Email'></input>
                </div>
                <div className="mb-2">
                  <input type="text" className='form control'placeholder='Title'></input>
                </div>
                <div className="mb-2">
              <input type="text" className='form control'placeholder='Company'></input>
                </div>
                <div className="mb-2">
                  <select name="" id=""  className='form conrol'>
                    <option value="">Select A group</option>
                    <option value="">family</option>
                    <option value="">friends</option>
                    {
                      groups.length>0 &&
                      groups.map((group)=>{
                        return(
                          <option  key={group.id} value={group.id} >{group.value}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type ="submit" className='btn btn-primary' value={"Update"}/>
                  {/* <Link to={'/'} className="btn btn danger ms-2 " >cancel</Link> */}
                  <button type="button" class="btn btn-danger" Link t0={'/'}>Danger</button>
                  {/* <div className='col-md-6 d-flex align items-center'>
                 <img src="https://avatars.design/wp-content/uploads/2021/02/corporate-avatars-TN-1.jpg"></img>
                </div> */}

                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default EditContact;

