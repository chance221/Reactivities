import React, {useState,} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { ISnip } from '../../app/models/snip'
// import css from '../../resources/Images/css.png'
// import js from '../../resources/Images/js.png'
// import html from '../../resources/Images/html.png'
// import c from '../../resources/Images/c.png'
import {v4 as uuid} from 'uuid';

interface IProps{
  setEditMode: (editMode:boolean) => void;
  snip: ISnip;
  createSnip: (snip:ISnip) => void;
  editSnip:  (snip: ISnip) =>void;
  submitting: boolean;
}

// const dropOptions = [
//   {
//     key:'C#',
//     text: 'C#',
//     value: 'C#',
//     image: {avatar: true, src:c}
//   },
//   {
//     key:'CSS',
//     text: 'CSS',
//     value: 'CSS',
//     image: {avatar: true, src:css}
//   },
//   {
//     key:'HTML',
//     text: 'HTML',
//     value: 'HTML',
//     image: {avatar: true, src:html}
//   },
//   {
//     key:'JavaScript',
//     text: 'JavaScript',
//     value: 'JavaScript',
//     image: {avatar: true, src:js}
//   },
// ]


// TODO add logic to pretify code later
export const SnipForm: React.FC<IProps> = ({setEditMode, snip: initialFormState, createSnip, editSnip, submitting}) => {
  
  const initializeForm = () =>{
    if (initialFormState){
      return initialFormState;
    } else {
      return {
        id:'',
        title: '',
        description: '',
        category: '',
        language: '',
        code:''
      }
    }
  }

  const [snip, setSnip] = useState<ISnip>(initializeForm)
  
  const handleInputChange = (event: any) => {
    const {name, value} = event.currentTarget
    setSnip({...snip, [name]: value})
  }

 const handleSubmit = () => {
   //console.log(snip)
   if(snip.id.length === 0){
     let newSnip = {
       ...snip,
       id: uuid()
     }
     createSnip(newSnip)
   } else {
     editSnip(snip);
   }
 }

  
  return (
    <div>
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Input 
            onChange={handleInputChange} 
            name='title' 
            placeholder="Title" 
            value={snip.title}
          />

          <Form.Input 
          onChange={handleInputChange} 
          name='language' 
          placeholder="Language" 
          value={snip.language}/>

          {/* <Dropdown
            onSelect = {handleInputChange}
            placeholder = "Language"
            fluid
            selection
            options={dropOptions}
            name='language'
            value = {snip.language}
            
          /><br/> */}

          <Form.TextArea 
            rows={2} 
            onChange={handleInputChange} 
            name='description'
            placeholder="Description"
            value={snip.description}
          />

          <Form.Input
            onChange={handleInputChange} 
            name='category'  
            placeholder="Category" 
            value={snip.category}
          />

          <Form.TextArea 
            onChange={handleInputChange} 
            name='code'
            placeholder="Code" 
            value={snip.code}
          />
          
          <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
          <Button onClick={( () => setEditMode(false))} floated='right' type='button' content='Cancel' color='grey'/>

        </Form>
      </Segment>
    </div>
  );
};

