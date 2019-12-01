import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import './css/NavBar.css'

interface IProps {
  openCreateForm: () => void
}

export const NavBar: React.FC<IProps> = ({openCreateForm}) => {
  return (
    <div className="center fixed">
        <div className="center">
        
        </div>
      <div className="ui teal three item inverted menu left">
        <a className="item" href="#top">
          <Header as='h4' icon className="center">
            <Icon name ='cut'/>
              Snippix
            <Header.Subheader>
              Save Time. Save Your Code.
            </Header.Subheader>
          </Header>
        </a>
        <a className="item " href="#top">
          Snippets
        </a>
        <button onClick={openCreateForm} className="item dif">Create Snip</button>
          
      </div>
    </div>
  )
}
