<template>
  <label class="switch" >
    <input type="checkbox" @click="toggleSwitch"/>
    <span :class="['slider', { round: round, light: light, dark: !light }]"></span>
  </label>
</template>

<script>
export default {
  props: {
    round: Boolean
  },
  data() {
    return {
      light: true,
    };
  },
  methods: {
    toggleSwitch() {
      this.light = !this.light;
    }
  }
};
</script>

<style>
label.switch {
  margin-bottom: 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 20px;
}

/* hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider.light:before {
  background-color: white;
}

.slider.dark:before {
  background-color: black;
}

input:checked + .slider {
  background-color: #ccc;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ccc;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* rounded sliders */
.slider.round {
  border-radius: 26px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
