<template>
	<q-panel class="q-volume-panel">
		<q-panel class="q-volume-panel-control" column>
			<vue-slider ref="volL" style="flex: 1" :min="0" :max="100" :value="volumeL" @callback="setVolumeL" direction="vertical"></vue-slider>
			<div class="q-volume-caption">VolL</div>
		</q-panel>
		<q-panel class="q-volume-panel-control" column>
			<vue-slider ref="volR" style="flex: 1" :min="0" :max="100" :value="volumeR" @callback="setVolumeR" direction="vertical"></vue-slider>
			<div class="q-volume-caption">VolR</div>
		</q-panel>
	</q-panel>
</template>

<style lang="less">
	.q-volume-panel {
		@seekbar-background: rgba(0, 0, 0, .2);
		@seekbar-process: rgba(29, 233, 182, .9);
		@seekbar-tooltip: #004d40;
		@seekbar-dot: #004d40;
		@seekbar-dot-hover: #4db6ac;
		@seekbar-dot-click: #f1f1f1;
		@font: 'Roboto', sans-serif;

		align-items: center;
		margin: 0 auto;
		max-width: 200px;
		.vue-slider {
			background: @seekbar-background !important;
		}

		.vue-slider-process {
			background: @seekbar-process !important;
		}

		.vue-slider-dot {
			background: @seekbar-dot !important;
			border: 4px solid @seekbar-dot;
			height: 8px !important;
			width: ~"calc(100% - 8px)" !important;
			border-radius: 3px !important;
			box-shadow: initial !important;
			outline: none;

			&:hover {
				background: @seekbar-dot-hover !important;
				border: 4px solid @seekbar-dot-hover;
			}

			&:active {
				background: @seekbar-dot-click !important;
				border: 4px solid @seekbar-dot-click;
			}
		}

		.vue-slider-tooltip {
			background-color: @seekbar-tooltip !important;
			border: 1px solid @seekbar-tooltip !important;
			font-family: @font;
		}

		.q-volume-panel-control {
			justify-content: center;
			max-height: 50%;
			margin: 0 30px;
			font-family: @font;

			.q-volume-caption {
				text-align: center;
			}
		}
	}
</style>

<script>
	import VueSlider from 'vue-slider-component';

	export default {
		computed: {
			volumeL(){
				return Math.round(this.$store.state['volume-l'] * 100);
			},

			volumeR(){
				return Math.round(this.$store.state['volume-r'] * 100);
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

			update(){
				setTimeout(() => {
					this.$refs.volL.refresh();
					this.$refs.volR.refresh();
				}, 500);
			}
		},

		mounted(){
			this.$store.watch((state) => state.volumeL, () => {
				this.$refs.volL.val = this.volume;
				this.$refs.volL.setPosition();
			});
			this.$store.watch((state) => state.volumeR, () => {
				this.$refs.volR.val = this.volume;
				this.$refs.volR.setPosition();
			});
		},

		components: {
			VueSlider
		}
	};
</script>
