import React from 'react';
import { Grid, Input, Icon, Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
];

/** A simple static component to render some text for the landing page. */
class Search extends React.Component {
  render() {
    return (
      <Grid id="search-page" textAlign='center' relaxed container>
        <Grid.Row>
          <h1>Career Match</h1>
        </Grid.Row>
        <Grid.Row>
          <h2>Select your skills to match with companies.</h2>
        </Grid.Row>
        <Grid.Row>
          <Dropdown placeholder='Skills' multiple selection options={options}/>
        </Grid.Row>
        <Grid.Row>
          <h2>Enter your zip-code to match with companies.</h2>
        </Grid.Row>
        <Grid.Row>
          <Input icon placeholder='zipcode...'>
            <input/>
            <Icon name='search'/>
          </Input>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Search;
