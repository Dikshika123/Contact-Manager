import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactServices } from '../../Services/ContactServices';
import Spinner2 from '../../Spinner/Spinner2';

const ContactList = () => {
  let[state,setState]=useState({
    loading:false,
    contacts:[],
    errorMassage:""
  })
  useEffect(()=>{
    let prom1=new Promise((res,rej)=>{
      setState({...state,loading:true,contacts:[]}) //(initilize the state before sending to the server)we are updating the state 2 times. here we are not getting the data we are sending empty container to the server.before sending the data to the server we initilize the state
      let response=ContactServices.getAllContacts()// here we are getting the data.
      //API means application programming interface. to display the data on browser end from the server end through API.

      
      res(response)
      rej("error")
    })
    
    prom1.then((resp1)=>{
      setState({...state,loading:false,contacts:resp1.data})//After getting the data from the server we re-initilize the state
      console.log(resp1.data);
    }).catch((error)=>{
      setState({...state,loading:false,errorMassage:error.message})
      alert("data not found")
    })
  },[])
  let clickDelete=(contactID)=>{
    let prom=new promise((res1,rej1)=>{
      let deleteContact =contactServices.deleteContact(contactID)
      res1(deleteContact)
    })
    promise1.then((resp1)=>{
      if(resp1){
        let prom1=new Promise((res,rej)=>{
          setState({...state,loading:true,contacts:[]}) //(initilize the state before sending to the server)we are updating the state 2 times. here we are not getting the data we are sending empty container to the server.before sending the data to the server we initilize the state
          let response=ContactServices.getAllContacts()// here we are getting the data.
          //API means application programming interface. to display the data on browser end from the server end through API.
    
          
          res(response)
          rej("error")
        })
        
        prom1.then((resp1)=>{
          setState({...state,loading:false,contacts:resp1.data})//After getting the data from the server we re-initilize the state
          console.log(resp1.data);
        }).catch((error)=>{
          setState({...state,loading:false,errorMassage:error.message})
          alert("data not found")
        })
        
      }
    })

  }
   let{loading,contacts,errorMassage}=state
  return (
    <div>
      <React.Fragment>
        <pre>{JSON.stringify(contacts)}</pre>
      <section className="contact-search p-3">
       <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">Contact Manager<Link className="btn btn-primary ms-2" to={'/contacts/Add'}><i className='fa fa-plus-circle me-2'></i>Add</Link></p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores repellat sit nihil qui iusto nam, non ipsam earum corrupti ducimus, consequatur fuga cum beatae consectetur possimus necessitatibus quisquam voluptatem suscipit.</p>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-md-6">
              <form action="" className='row'>
                <div className="col-md-8">
                  <div className="mb-2">
                    <input type="text" className='form-control' placeholder='Search Name'/>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2">
                    <input type="submit" className='btn btn-outline-dark' value={"Submit"} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
       </div>
      </section>
        {/* SECTION-2 */}
        {
        loading ? <Spinner2/>:
        <React.Fragment>
      <section className='contact-list'>
        <div className="container">
          <div className="row">
            {
            contacts.length>0 &&
              contacts.map((contact)=>{
                return(
                  <div className="col-md-6" key={contact.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <img src={contact.photo} alt="" className='contact-image' />
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Name: <span className="fw-bold">{contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Contact: <span className="fw-bold">{contact.contact}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Email: <span className="fw-bold">{contact.email}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-1 d-flex flex-column align-items-center">
                          <Link className='btn btn-warning my-1' to={`/contacts/view/${contact.id}`}><i className='fa fa-eye'></i></Link>
                          <Link className='btn btn-primary my-1' to={`/contacts/edit/:contactID`}><i className='fa fa-pen'></i></Link>
                          <button className='btn btn-danger' onClick={()=>{clickDelete(contact.id)}}><i className='fa fa-trash my-1'></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )

              })
            }
          </div>
        </div>
      </section>
      </React.Fragment>
      }

      </React.Fragment>

    </div>
  );
}

export default ContactList