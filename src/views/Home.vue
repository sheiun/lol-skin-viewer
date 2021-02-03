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
      class="w-12 lg:w-28 ml-4 mt-4 bg-blue-100"
      v-for="(champ, idx) in filteredChampions"
      :key="idx"
    >
      <router-link :to="`/c/${champ.id}`" class="">
        <div
          v-show="!champ.loaded"
          class="w-12 h-12 lg:w-28 lg:h-28 bg-gray-500 animate-pulse"
        ></div>
        <img
          class="w-12 h-12 lg:w-28 lg:h-28"
          v-show="champ.loaded"
          :onload="() => (champ.loaded = true)"
          :src="getAvatar(champ.id, version)"
        />
        <div
          class="flex justify-center text-xs lg:text-base text-blue-500 whitespace-nowrap overflow-hidden"
        >
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
