import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactServices } from '../../Services/ContactServices';
import Spinner2 from '../../Spinner/Spinner2';
const ViewContact = () => {
  let {contactid}=useParams() 
  let[state,setState]=useState({
    loading:false,
    contact:{},
    errorMassage:""
  })

  useEffect(()=>{
    setState({...state,loading:true})
    let prom=new Promise((res1,rej1)=>{
     let response=ContactServices.getContact(contactid)
     res1(response)
    })
    prom.then((resp1)=>{
      setState({...state,loading:false,contact:resp1.data})
      console.log(resp1.data);
    }).catch((error)=>{
      setState({...state,loading:false,errorMassage:error.message})  
      alert("data is not found")  
    })
  },[contactid])

  let{loading,contact,errorMassage}=state
  return (
    <div>
      {/* <b>ViewContact Page</b> */}
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h4 fw-bold text-success'>View Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci facere, culpa voluptatibus ex ea velit vitae eos consequuntur at nulla mollitia ipsum omnis dolorum animi accusantium repellendus, quisquam est nihil!</p>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION-2 */}

      {
        loading? <Spinner2/> :<React.Fragment>
        {
          Object.keys(contact).length>0 && 
          <section className="view-contact-data">
          <div className="container">
            {/* ROW-1 */}
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <img src={contact.photo} alt="" className='contact-image' />
              </div>
            </div>
            {/* ROW-2 */}
            <div className="row d-flex justify-content-center">
              <div className="col-md-6">
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
                          <li className="list-group-item list-group-item-action">
                            Title: <span className="fw-bold">{contact.title}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Company: <span className="fw-bold">{contact.company}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Group: <span className="fw-bold">{contact.group}</span>
                          </li>
                        </ul>
              </div>
            </div>
            {/* ROW-3 */}
            <div className="row my-2">
              <div className="col-md-12 d-flex justify-content-center">
                <Link className='btn btn-dark' to={'/'}>Back</Link>
              </div>
            </div>
          </div>
        </section>
        }
        </React.Fragment>
      }
    </div>
  );
}

export default ViewContact;