<template>
  <section class="header-background">
    <canvas ref="header-canvas"></canvas>
  </section>
</template>

<script>
export default {
  name: "HeaderBackground",
  mounted() {
    this.canvasRender();
  },
  methods: {
    canvasRender() {
      /**@type{HTMLCanvasElement} */
      const canvas = this.$refs["header-canvas"];
      const ctx = canvas.getContext("2d");
      canvas.width = 300;
      canvas.height = 220;

      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.bezierCurveTo(0, 60, 60, 160, 150, 100);
      ctx.quadraticCurveTo(185, 80, 200, 110);
      ctx.quadraticCurveTo(230, 170, 300, 160);
      ctx.lineTo(300, 0);
      ctx.closePath();

      ctx.fillStyle = "#FE4E36";
      ctx.fill();
    },
  },
};
</script>

<style lang="scss">
.header-background {
  position: absolute;
  top: 0;
  right: 0;
  .header-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>