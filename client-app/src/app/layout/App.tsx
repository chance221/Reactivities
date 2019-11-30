import React, {Component} from 'react';
import axios from 'axios';
import './styles.css';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    snips:[]
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/snips')
      .then((response)=>{
        
        this.setState({
          snips:response.data
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
            {this.state.snips.map((snip:any)=>

              <List.Item key={snip.id}>
                <List.Icon name='dna' verticalAlign='middle'/>
                <List.Content>
                  {snip.title}
                </List.Content>
              </List.Item>

            )}
          </List>
      </div>
    );
  }
}
  


export default App;