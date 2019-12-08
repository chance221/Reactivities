import React from 'react'
import { Button } from 'semantic-ui-react'
import { ISnip } from '../../app/models/snip'
import css from '../../resources/Images/css.png'
import js from '../../resources/Images/js.png'
import html from '../../resources/Images/html.png'
import c from '../../resources/Images/c.png'

//let lang = js

interface IProps{
  snip : ISnip;
  setEditMode: (editMode: boolean) => void;
  setSelectedSnip: (snip: ISnip | null)=> void;
}

const addImage = (snipLang: string) =>{
  if(snipLang.toLowerCase() === 'javascript'){
    return js
  }
  if(snipLang.toLowerCase() === 'c#'){
    return c
  }
  if(snipLang.toLowerCase() === 'html'){
    return html
  }
  if(snipLang.toLowerCase() === 'css'){
    return css
  }
}

export const SnipsDetails: React.FC<IProps> = ({snip, setEditMode, setSelectedSnip}) => {
  return (
    <div className="ui card fluid">
      <div className="image">
        <img src={addImage(snip.language)} alt='code language'/>
      </div>
      <div className="content">
        <a className="header" href="#top">{snip.title}</a>
        <div className="meta">
          <span className="description">{snip.language}</span>
        </div>
        <div className="meta">
          <span className="description">{snip.description}</span>
        </div>
        <div className="meta">
          <span className="description">{snip.category}</span>
        </div>
        <h6 className= "ui icon header">
          <i className="code icon"></i>
          Code
        </h6>
        <pre className = "prettyprint">{snip.code}</pre>
      </div>
      <div className="extra content">
        <Button.Group widths={2}>
          <Button onClick={() =>setEditMode(true)} basic color="blue" content="Edit"></Button>
          <Button onClick ={()=> setSelectedSnip(null)} basic color="grey" content="Cancel"></Button>
        </Button.Group>
      </div>
    </div>
  )
}
