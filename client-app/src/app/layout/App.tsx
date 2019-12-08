import React, { useState, useEffect, SyntheticEvent } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { ISnip } from '../models/snip';
import { NavBar } from '../../features/nav/NavBar';
import { SnipsDashboard } from '../../features/snips/dashboard/SnipsDashboard';
import agent from '../api/agent';
import { Loading } from './Loading';



/*
When using typescript you can pass down not only the state but the component properties and its types into class components
and that is what we are doing here. We are passing down not the properties but only the state. The stat is 
an interface that holds the snips. The snips properties have been defined in the snip.ts file. Now we can use
strongly typed language AND javascript. We make the state read only as we are not writing to the API at this point
just getting information out. In the class component we are passing in an empty object for the components(not the snip object)
properties. We are also passing in the type of object held in state which is the snip object defined in the models folder

Now we can use intellisense to access the different properties defined in our ISnips interface.

Now we get rid of class components completely to instead use react hooks. Hooks allow us to use state, and lifecycle
methods without creating a class(or rather using just a functional component). In order to do this we need
to get rid of they typical class component methods and use hooks. we get rid of setState for useState
we need to import useState from react (we no longer need components from the module). We also change the component itself 
into an function by creating it using const instead of extending the class component. We also cn define the
use state with the type ISnip and an empty array as this is what will house the info from the API call.


*/


const App = () => {
  
  const [snips, setSnips] = useState<ISnip[]>([])

  const [selectedSnip, setSelectedSnip] = useState<ISnip|null>(null);

  const [loading, setLoading] = useState(true)

  const [submitting, setSubmitting] = useState(false)

  const [target, setTarget] = useState('');
  
  const handleSelectedSnip = (id: string) => {
    setSelectedSnip(snips.filter(s => s.id === id)[0])
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedSnip(null);
    setEditMode(true);
  }

  const handleCreateSnip = (snip: ISnip) =>{
    setSubmitting(true);
    agent.Snips.create(snip).then(()=>{
      setSnips([...snips, snip])
      setSelectedSnip(snip);
      setEditMode(false);
    }).then( ()=>setSubmitting(false) )
  }

  const handleEditSnip = (snip: ISnip) =>{
    setSubmitting(true);
    agent.Snips.update(snip).then(() =>{
      setSnips([...snips.filter(s => s.id ! !==snip.id), snip])
      setSelectedSnip(snip);
      setEditMode(false)
    }).then(()=>setSubmitting(false))
  }

  const handleDeleteSnip = (event: SyntheticEvent<HTMLButtonElement>, id: string) =>{
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Snips.delete(id).then(()=>{
      setSnips([...snips.filter(s =>s.id !==id)])
    }).then(()=>setSubmitting(false))
    
  }

const [editMode, setEditMode] = useState(false);

  //use effect is three lifecyle components rolled into one. It runs componentDidMount, componentDidUpdate, and componentWillUnmount
  useEffect( () => {
  agent.Snips.list()
      .then(response=>{
        setSnips(response)
      }).then( () =>
          setLoading(false));
    }, [] //this empty array ensures that we don't call the useState every time the screen rerenderes evrytime to component render
  );

  if(loading) return<Loading content='Loading Snips...'/>
  //this is where the jsx begins
 
  return (
    <div>
      <NavBar openCreateForm = {handleOpenCreateForm}/>
      <div className="snipListContainer">
      <Container className="snipListContainer">
        <SnipsDashboard 
          snips = {snips}
          selectSnip = {handleSelectedSnip}
          selectedSnip={selectedSnip}
          editMode = {editMode}  
          setEditMode = {setEditMode}
          setSelectedSnip = {setSelectedSnip}
          createSnip = {handleCreateSnip}
          editSnip = {handleEditSnip}
          deleteSnip = {handleDeleteSnip}
          submitting = {submitting}
          target={target}
        />
      </Container>
      </div>
    </div>
  );
}


export default App;