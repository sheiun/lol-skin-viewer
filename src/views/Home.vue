<template>
  <div class="w-full flex justify-center">
    <!-- TODO: i18n -->
    <input
      type="text"
      placeholder="Search champion name..."
      class="mt-10 p-2 border-blue-500 border-2"
      v-model="text"
    />
  </div>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div
      class="ml-4 mt-4 text-2x text-blue-500 bg-blue-100"
      v-for="(champ, idx) in filteredChampions"
      :key="idx"
    >
      <router-link :to="`/c/${champ.id}`">
        <img :src="getAvatar(champ.id, version)" />
        <div class="flex justify-center">
          {{ champ.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getAvatar } from "@/lib/lol";

import { computed, reactive, toRefs, watch } from "vue";

export default {
  name: "Home",
  components: {},
  props: { language: String, version: String },
  setup(props) {
    const state = reactive({
      text: "",
      champions: {},
      filteredChampions: computed(() => updateFilteredChampions()),
      getAvatar,
    });

    function updateFilteredChampions() {
      const champions = Object.values(state.champions);
      if (!state.text) return champions;
      return champions.filter(
        (champ) =>
          champ.id.toLowerCase().includes(state.text.toLowerCase()) ||
          champ.name.includes(state.text)
      );
    }

    function updateChampions(language, version) {
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`
      )
        .then((res) => res.json())
        .then((data) => {
          state.champions = data.data;
        });
    }

    watch(
      () => [props.language, props.version],
      ([language, version]) => updateChampions(language, version)
    );

    updateChampions(props.language, props.version);
    return { ...toRefs(state) };
  },
};
</script>
