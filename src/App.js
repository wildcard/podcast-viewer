import React, { Component } from 'react';
import './App.css';
import { index, podcastsNames, getResults } from './search';
import JSONTree from 'react-json-tree'
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import RssFeed from 'material-ui/svg-icons/communication/rss-feed';
import IconButton from 'material-ui/IconButton';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      searchResults: []
    };
  }

  handleUpdateInput(value) {
    const indexRes = index.search(value);
    this.setState({
      data: indexRes,
      searchResults: getResults(indexRes)
    })
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <AppBar title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more">
          <AutoComplete
          hintText="Search by podcast name"
          dataSource={podcastsNames}
          onUpdateInput={this.handleUpdateInput.bind(this)}
          floatingLabelText="Podcast Name"
          fullWidth={true}
        />
        </AppBar>
        <div className="App-header">
          <h2>Welcome to iTunes Arts podcasts offline index</h2>
          {/*<JSONTree data={this.state.data} />*/}
        </div>
        <GridList cols={2} cellHeight={200} padding={1}>
      {this.state.searchResults.map((podcast) => (
        <GridTile
          key={podcast.id}
          title={podcast.name}
          actionPosition="left"
          titlePosition="bottom"
          actionIcon={<IconButton tooltip="RSS Feed" href={podcast.feedUrl}>
              <RssFeed color={'#ff6600'}/>
            </IconButton>}
          cols={(podcast.score * 100) > 50 ? 2 : 1}
          rows={(podcast.score * 100) > 50 ? 2 : 1}
        >
          <img src={podcast.artworkUrl600} alt={podcast.name}/>
        </GridTile>
      ))}
    </GridList>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
