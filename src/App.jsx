const React = require('react');
const {Howl} = require('howler');

const Sound = require('./Sound.jsx');
const {TICK} = require('./const.js');
const {getSoundUrls} = require('./util.js');

module.exports = class App extends React.Component {
	constructor() {
		super();

		this.state = {
			beat: null,
			isNoVideo: false,
			isReady: false,
		};

		this.readySounds = new Set();
		this.vocals = [
			new Howl({
				src: getSoundUrls('vocal/yufu/01'),
			}),
			new Howl({
				src: getSoundUrls('vocal/yufu/02'),
			}),
			new Howl({
				src: getSoundUrls('vocal/yufu/03'),
			}),
		];
	}

	handleBeat = () => {
		this.setState({beat: this.state.beat === null ? 0 : this.state.beat + TICK});
		if (Math.abs(this.state.beat % (TICK * 448) - TICK * 61) < TICK / 2) {
			this.vocals[0].play();
		}
		if (Math.abs(this.state.beat % (TICK * 448) - TICK * 185) < TICK / 2) {
			this.vocals[1].play();
		}
		if (Math.abs(this.state.beat % (TICK * 448) - TICK * 313) < TICK / 2) {
			this.vocals[2].play();
		}
	}

	handleSoundReady = (score) => {
		this.readySounds.add(score);
		if (this.readySounds.size === 11) {
			this.setState({isReady: true});
			setInterval(this.handleBeat, TICK * 1000);
		}
	}

	handleChangeCheckbox = () => {
		this.setState({isNoVideo: !this.state.isNoVideo});
	}

	render() {
		return (
			<div>
				<input type="checkbox" checked={this.state.isNoVideo} onChange={this.handleChangeCheckbox}/> 動画を再生しない
				<div>
					<Sound
						src="kinmoza-clap"
						url="https://www.youtube.com/watch?v=STcc8H4Vr_g"
						score="clap"
						videoStart={5.4}
						videoDuration={3}
						beat={this.state.beat}
						volume={1}
						onReady={this.handleSoundReady}
						isPercussion
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="karateka-kick"
						url="https://www.youtube.com/watch?v=Cg6dlPZt-1g"
						score="snare"
						videoStart={32}
						videoDuration={0.3}
						beat={this.state.beat}
						volume={0.5}
						onReady={this.handleSoundReady}
						isPercussion
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="killme-pyonsuke"
						url="https://www.youtube.com/watch?v=vXBO_W5l6uY"
						score="bass"
						videoStart={247.7}
						videoDuration={0.5}
						beat={this.state.beat}
						volume={1}
						onReady={this.handleSoundReady}
						isPercussion
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="ippon-crisp"
						url="https://www.youtube.com/watch?v=2rc8CmeKinc"
						score="closed-hihat"
						videoStart={23.7}
						videoDuration={1}
						beat={this.state.beat}
						volume={0.5}
						onReady={this.handleSoundReady}
						isPercussion
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="atsumori"
						url="https://www.youtube.com/watch?v=uvg3I_IR9FA"
						score="base"
						videoStart={4.8}
						videoDuration={0.5}
						beat={this.state.beat}
						volume={1}
						sourceNote={22}
						onReady={this.handleSoundReady}
						isPrank
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="aoba-zoi"
						url="https://www.youtube.com/watch?v=DmZo4rL2E7E"
						score="chord"
						videoStart={18.9}
						videoDuration={2}
						beat={this.state.beat}
						volume={0.2}
						sourceNote={62}
						onReady={this.handleSoundReady}
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="zen-glass"
						url="https://www.youtube.com/watch?v=M_1UZlPBYzM"
						score="bongo"
						videoStart={24.5}
						videoDuration={0.5}
						beat={this.state.beat}
						volume={1}
						onReady={this.handleSoundReady}
						isPercussion
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="minecraft-blaze"
						url="https://www.youtube.com/watch?v=tKt0oImbQ_Y"
						score="chime1"
						videoStart={500.5}
						videoDuration={0.5}
						beat={this.state.beat}
						volume={0.5}
						onReady={this.handleSoundReady}
						isPercussion
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="fireball-ring"
						url="https://www.youtube.com/watch?v=6CQymHcBwWQ"
						score="chime2"
						videoStart={477.5}
						videoDuration={3}
						beat={this.state.beat}
						volume={0.5}
						onReady={this.handleSoundReady}
						isPercussion
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="ai-virus"
						url="https://www.youtube.com/watch?v=4v3F3luBMEM"
						score="chorus1"
						videoStart={30.5}
						videoDuration={3}
						beat={this.state.beat}
						volume={0.1}
						sourceNote={53}
						onReady={this.handleSoundReady}
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
					<Sound
						src="inazuma-pan"
						url="https://www.youtube.com/watch?v=l3JuhAwx5aY"
						score="chorus2"
						videoStart={18}
						videoDuration={1}
						beat={this.state.beat}
						volume={0.2}
						sourceNote={64}
						onReady={this.handleSoundReady}
						isNoVideo={this.state.isReady && this.state.isNoVideo}
					/>
				</div>
			</div>
		);
	}
};
