<template>
  <section class="m-layout">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "m-layout",
  data () {
    return {
      MazeyVersion: 2018.101,
    };
  },
  created () {
    let MazeyVersion = localStorage.getItem("MazeyVersion");
    if (!(Boolean(MazeyVersion) || parseFloat(MazeyVersion) === this.MazeyVersion)) {
      localStorage.clear();
      localStorage.setItem("MazeyVersion", this.MazeyVersion.toString());
    }
  },
};
</script>
