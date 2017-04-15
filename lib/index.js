import "roboto-fontface";
import QVolume from "./components/QVolume.vue";
import QVolumePanel from "./components/QVolumePanel.vue";

class VolumePlugin{
	constructor(l, r){
		this._volumeL = l;
		this._volumeR = r;
	}

	getName(){
		return 'volume';
	}

	connect(ctx, player){
		this.player = player;
		this.splitter = ctx.createChannelSplitter(2);

		this.lgain = ctx.createGain();
		this.lgain.gain.value = this.volumeL;

		this.rgain = ctx.createGain();
		this.rgain.gain.value = this.volumeR;

		this.merger = ctx.createChannelMerger(2);

		this.splitter.connect(this.lgain, 0, 0);
		this.splitter.connect(this.rgain, 1, 0);

		this.lgain.connect(this.merger, 0, 0);
		this.rgain.connect(this.merger, 0, 1);

		player.addCommand(this, "up", () => {
			this.volumeL += 0.1;
			this.volumeR += 0.1;
		});

		player.addCommand(this, "down", () => {
			this.volumeL -= 0.1;
			this.volumeR -= 0.1;
		});

		player.addCommand(this, "lup", () => {
			this.volumeL += 0.1;
		});

		player.addCommand(this, "ldown", () => {
			this.volumeR -= 0.1;
		});

		player.addCommand(this, "rup", () => {
			this.volumeR += 0.1;
		});

		player.addCommand(this, "rdown", () => {
			this.volumeR -= 0.1;
		});

		player.addCommand(this, 'l', (payload) => {
			if(!isFinite(payload)) return;
			this.volumeL = payload;
		});

		player.addCommand(this, 'r', (payload) => {
			if(!isFinite(payload)) return;
			this.volumeR = payload;
		});

		player.vuexMutationDefinitions['volume-l'] = (state, vol) => {
			state['volume-l'] = vol;
		};
		player.vuexMutationDefinitions['volume-r'] = (state, vol) => {
			state['volume-r'] = vol;
		};

		player.vuexStates['volume-l'] = this.volumeL;
		player.vuexStates['volume-r'] = this.volumeR;
		return [this.splitter, this.merger];
	}

	get volumeL(){
		return this._volumeL;
	}

	set volumeL(v){
		this._volumeL = Math.max(0, Math.min(2, v));
		this.player.emit('volume-l', this._volumeL);
		this.updateVolume();
	}

	get volumeR(){
		return this._volumeR;
	}

	set volumeR(v){
		this._volumeR = Math.max(0, Math.min(2, v));
		this.player.emit('volume-r', this._volumeR);
		this.updateVolume();
	}

	updateVolume(){
		this.lgain.gain.value = this.volumeL;
		this.rgain.gain.value = this.volumeR;
	}

	static install(Vue){
		Vue.component('q-volume', QVolume);
		Vue.component('q-volume-panel', QVolumePanel);
	}
}

export default VolumePlugin;
