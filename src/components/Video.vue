<template>
  <iframe
    class="flex justify-center"
    :src="src"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script>
export default {
  name: "Video",
  props: { src: String },
};
</script>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
}
</style>
