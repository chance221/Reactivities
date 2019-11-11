import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    values:[]
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
      .then((response)=>{
        
        this.setState({
          values:response.data
        })
        
      })
    
  }

  render(){
    return (
      <div className="center" >
        <Header as ='h2' icon>
          <Icon name ='cut'/>
            Snippix
          <Header.Subheader>
            Save Time. Save Your Code.
          </Header.Subheader>
        </Header>
          <List divided relaxed>
            {this.state.values.map((value:any)=>

              <List.Item key={value.id}>
                <List.Icon name='dna' verticalAlign='middle'/>
                <List.Content>
                  {value.name}
                </List.Content>
              </List.Item>

            )}
          </List>
      </div>
    );
  }
}
  


export default App;
