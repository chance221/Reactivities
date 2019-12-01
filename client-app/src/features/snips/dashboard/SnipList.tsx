import React, { SyntheticEvent } from 'react'
import { Button, Segment } from 'semantic-ui-react'
import { ISnip } from '../../../app/models/snip'

interface IProps{
  snips:ISnip[];
  selectSnip: (id:string) => void;
  deleteSnip: (e:SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}



export const SnipList: React.FC<IProps> = ({snips, selectSnip, deleteSnip, submitting, target}) => {
  return (
    
    <Segment className="clearing">
    <div className="ui items">
    {snips.map(snip =>
      <div key={snip.id} className="item">
        <div className="content">
          <a className="header" href="#top">{snip.title}</a>
          <div className="meta">
            <span>Language:{snip.language}</span>
          </div>
          <div className="meta">
            <span>Description</span>
          </div>
          <div className="description">
            <p>{snip.description}</p>
          </div>
          <div className="meta">
            <span>Code</span>
          </div>
          <div className="description">
            <p>{snip.code}</p>
          </div>
          <div className="extra">
            <Button 
              onClick={()=> selectSnip(snip.id)} 
              floated="right" 
              content='View' 
              color='blue'/>
            <Button 
              onClick={(e)=> deleteSnip(e, snip.id)} 
              floated="right" 
              content='Delete' 
              color='red'
              loading={target === snip.id && submitting}
              name={snip.id}/>
            <span>Category</span>
          </div>
          </div>
        </div>)}
      </div>
    </Segment>
    
  
)
}
