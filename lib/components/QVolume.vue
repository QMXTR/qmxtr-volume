<template>
	<q-panel class="q-volume">
		<vue-slider ref="slider" :height="3" style="flex: 1" :min="0" :max="100" :value="volume" @callback="setVolume"></vue-slider>
	</q-panel>
</template>

<style lang="less">
	@seekbar-background: rgba(0, 0, 0, .3);
	@seekbar-process: rgba(255, 255, 255, .9);
	@seekbar-dot: rgba(255, 255, 255, .8);
	@seekbar-dot-hover: rgba(255, 255, 255, .6);
	@seekbar-dot-click: #f1f1f1;
	@seekbar-tooltip: #004d40;
	@font: 'Roboto', sans-serif;

	.q-volume {
		align-items: center;
		margin-left: 10px;
		padding-right: 20px;
		max-width: 150px;

		.vue-slider-tooltip {
			background: @seekbar-tooltip !important;
			border: 1px solid @seekbar-tooltip !important;
			font-family: @font;
		}

		.vue-slider-dot {
			background: transparent !important;
			border: 4px solid @seekbar-dot;
			height: 8px !important;
			width: 8px !important;
			box-shadow: initial !important;
			outline: none;

			&:hover {
				border: 4px solid @seekbar-dot-hover;
			}

			&:active {
				background: @seekbar-dot-click !important;
				border: 4px solid @seekbar-dot-click;
			}
		}

		.vue-slider-process {
			background: @seekbar-process !important;
		}

		.vue-slider {
			background: @seekbar-background !important;
		}
	}
</style>

<script>
	import VueSlider from 'vue-slider-component';

	export default {
		computed: {
			volumeL(){
				return this.$store.state['volume-l'] * 100;
			},

			volumeR(){
				return this.$store.state['volume-r'] * 100;
			},

			volume(){
				return Math.round(this.volumeL / 2 + this.volumeR / 2);
			}
		},

		methods: {
			setVolumeL(volume){
				if(!isFinite(volume)) volume = 0;
				volume = Math.round(volume);
				this.$store.dispatch('volume:l', volume / 100);
			},

			setVolumeR(volume){
				if(!isFinite(volume)) volume = 0;
				volume = Math.round(volume);
				this.$store.dispatch('volume:r', volume / 100);
			},

			setVolume(volume){
				const vol = this.volume;
				const deltaVolume = volume - vol;

				if(deltaVolume > 0){
					if(vol === 100) return;

					this.setVolumeL(this.volumeL + (100 - this.volumeL) / (100 - vol) * deltaVolume);
					this.setVolumeR(this.volumeR + (100 - this.volumeR) / (100 - vol) * deltaVolume);
				}else if(deltaVolume < 0){
					if(vol === 0) return;
					this.setVolumeL(this.volumeL + (this.volumeL) / (vol) * deltaVolume);
					this.setVolumeR(this.volumeR + (this.volumeR) / (vol) * deltaVolume);
				}
			}
		},

		mounted(){
			const update = () => {
				this.$refs.slider.val = this.volume;
				this.$refs.slider.setPosition();
			};

			this.$store.watch((state) => state.volumeL, update);
			this.$store.watch((state) => state.volumeR, update);
		},

		components: {
			VueSlider
		}
	};
</script>
