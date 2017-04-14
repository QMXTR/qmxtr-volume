<template>
	<q-panel class="q-volume">
		<vue-slider ref="slider" height="3" style="flex: 1" :tooltip="hover" :min="0" :max="100" :value="volume" @callback="setVolume"></vue-slider>
	</q-panel>
</template>

<style lang="less" scoped>
	@import "~theme";

	.q-volume {
		align-items: center;
		margin: 0 10px;
	}
</style>

<style lang="less">
	@seekbar-background: rgba(0, 0, 0, .3);
	@seekbar-process: rgba(255, 255, 255, .9);
	@seekbar-color: #f1f1f1;
	@seekbar-dot: rgba(255, 255, 255, .8);
	@seekbar-dot-hover: rgba(255, 255, 255, .6);
	@seekbar-dot-click: #f1f1f1;

	.q-volume .vue-slider {
		background: @seekbar-background !important;
	}

	.q-volume .vue-slider-process {
		background: @seekbar-process !important;
	}

	.q-volume .vue-slider-dot {
		background: @controlbar-color !important;
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
				return Math.round(this.$store.state['volume-l'] / 2 + this.$store.state['volume-r'] / 2);
			}
		},

		methods: {
			setVolumeL(volume){
				this.$store.commit('volume-l', volume / 100);
			},

			setVolumeR(volume){
				this.$store.commit('volume-r', volume / 100);
			},

			setVolume(volume){
				const deltaVolume = volume - this.volume;

				if(deltaVolume > 0){
					this.setVolumeL(this.volumeL + (100 - this.volumeL) / (100 - this.volume) * deltaVolume);
					this.setVolumeR(this.volumeL + (100 - this.volumeR) / (100 - this.volume) * deltaVolume);
				}else {
					this.setVolumeL(this.volumeL - (this.volumeL) / (this.volume) * deltaVolume);
					this.setVolumeR(this.volumeL - (this.volumeR) / (this.volume) * deltaVolume);
				}
			}
		},

		components: {
			VueSlider
		}
	};
</script>
