import axios from "axios"

export class ContactServices{

    static serverURL="http://localhost:7000"

    static getGroups(){
        let dataURL=`${this.serverURL}/groups`
        return axios.get(dataURL)
    }
    static getGroup(contacts){
        let groupID=contacts.group
        let dataURL=`${this.serverURL}/contacts/${groupID}`
        return axios.get(dataURL)


    }

    static getAllContacts(){
        // we are using static here because we don't want to change the url again and again.
        let dataURL=`${this.serverURL}/contacts`

        return axios.get(dataURL)
    }
    static getContact(contactID){
        let dataURL=`${this.serverURL}/contacts/${contactID}`
        return axios.get(dataURL)
    }
    static createContact(contact){
        let dataURL=`${this.servalURL}/contacts`
        return axios.post(dataURL,contact)
    }
    static updateInput(){
        let dataURL=`${this.serverURL}/contacts/${contactID}`
        return axios.put(dataURL)
    }
    static deleteContact(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactID}`
        return axios.delete(dataURL)
    }
}