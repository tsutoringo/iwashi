const React = require('react');
const ReactDOM = require('react-dom');
const {default: Player} = require('react-player');
const {Howl} = require('howler');

require('babel-polyfill');

process.on('unhandledRejection', (error) => {
	throw error;
});

window.addEventListener('unhandledrejection', (error) => {
	throw error;
});

class App extends React.Component {
	constructor() {
		super();
		console.log(Howl);
		this.clap = new Howl({
			src: ['kinmoza-clap.wav'],
		});

		setInterval(this.handleClap, 300);

		this.state = {
			isReverse: false,
		};
	}

	handleClap = () => {
		if (Math.random() < 0.5) {
			this.clap.play();
			this.player.seekTo(5.3);
			this.setState({isReverse: !this.state.isReverse});
		}
	}

	render() {
		return (
			<div>
				<Player
					ref={(element) => {
						this.player = element;
					}}
					url="https://www.youtube.com/watch?v=STcc8H4Vr_g"
					width={320}
					height={180}
					playing
					controls
					muted
				/>
			</div>
		);
	}
}

const reactRoot = document.getElementById('react');

ReactDOM.render(React.createElement(App), reactRoot);
