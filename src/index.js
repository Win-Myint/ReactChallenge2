// Import react modules so that i can render the component using React.render
// Otherwise React is going to return undefined
// React module is used to create and manage components ONLY!
// ReactDOM is used to put the created components to the DOM!
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

// Declare variable to store youtube API key
const API_KEY = 'AIzaSyDcYnQtlPaUcMTEjrS-iosfKep06sGqX7s';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			videos : [],
			selectedVideo : null
		 };

		this.videoSearch('manutd');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos : videos,
				seletedVideo : videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.seletedVideo} />
				<VideoList 
				onVideoSelect={seletedVideo => this.setState({seletedVideo})} 
				videos={this.state.videos} />
			</div>
		);
	}
}

// Take the component and put it on the page (DOM), remember to use ReactDOM instead of React
ReactDOM.render(<App />, document.querySelector('.container'));


