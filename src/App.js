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
import IconOpenNew from 'material-ui/svg-icons/action/open-in-new';

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
          fullWidth={true}
        />
        </AppBar>
        <div className="App-header">
          <h2>Welcome to iTunes Popular Arts podcasts offline index</h2>
          {/*<JSONTree data={this.state.data} />*/}
        </div>
        <GridList cols={4} cellHeight={200} padding={0}>
      {this.state.searchResults.map((podcast) => (
        <GridTile
          key={podcast.id}
          title={podcast.name}
          subtitle={`Rating: ${podcast.contentAdvisoryRating}`}
          actionPosition="left"
          titlePosition="bottom"
          actionIcon={<div>
            <IconButton tooltip="RSS Feed" tooltipPosition="top-center" href={podcast.feedUrl}>
              <RssFeed color="#ff6600"/>
            </IconButton>
            <IconButton tooltip="podcast link" tooltipPosition="top-center" href={podcast.trackViewUrl}>
              <IconOpenNew color="#fff"/>
            </IconButton>
          </div>
          }
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
