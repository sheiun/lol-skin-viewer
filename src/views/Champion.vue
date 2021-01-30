<template>
  <div class="w-full flex justify-center">
    <div class="relative">
      <img :src="avatar" class="p-2" />
      <span class="flex justify-center text-blue-500">{{ champion.name }}</span>
    </div>
    <div class="relative flex flex-col justify-center">
      <span
        v-for="[year, color] in Object.entries(badgeColors)"
        :key="year"
        :class="color"
        class="px-2 py-1 m-2 text-xs font-bold leading-none text-white rounded-full"
      >
        {{ year }}
      </span>
    </div>
  </div>

  <div class="flex flex-wrap justify-center">
    <div
      class="w-1/2 lg:w-1/6 m-5 bg-blue-100"
      v-for="skin in champion.skins"
      :key="skin.num"
    >
      <div class="relative">
        <span
          v-show="skin.loaded"
          v-for="([year, vote], idx) in Object.entries(
            skinVotes[skin.num]
          ).reverse()"
          :key="year"
          :class="'right-' + idx * 8 + ' ' + badgeColors[year]"
          class="absolute -top-2 px-2 py-1 text-xs font-bold leading-none text-white rounded-full"
        >
          {{ vote }}
        </span>
      </div>

      <div
        v-show="!skin.loaded"
        class="w-48 lg:w-52 max-w-full h-72 lg:h-96 bg-gray-500 animate-pulse"
      ></div>
      <img
        v-show="skin.loaded"
        class="w-48 lg:w-52 max-w-full h-72 lg:h-96"
        :onload="() => (skin.loaded = true)"
        :src="getImage($route.params.champion + '_' + skin.num, 'loading')"
      />
      <div
        class="flex justify-center text-blue-500 p-2 whitespace-nowrap overflow-x-hidden"
      >
        {{ skin.name }}
      </div>
    </div>
  </div>
  <Modal>
    <Video src="https://www.youtube.com/embed/rOp0LP6aQxo" />
  </Modal>
</template>

<script>
import { getAvatar, getImage } from "@/lib/lol";
import { getSkinPoll } from "@/lib/polls";

import Modal from "@/components/Modal";
import Video from "@/components/Video";

import { reactive, toRefs, watch, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { Modal, Video },
  props: {
    language: String,
    version: String,
  },
  setup(props) {
    const route = useRoute();

    const state = reactive({
      badgeColors: {
        "2018": "bg-red-600",
        "2019": "bg-blue-600",
        "2020": "bg-green-600",
      },
      champion: {},
      defaultChampion: {},
      avatar: getAvatar(route.params.champion, props.version),
      getImage,
      skinVotes: computed(() => {
        if (!state.defaultChampion.skins) return [];
        return state.defaultChampion.skins.reduce(
          (acc, skin) => ({
            ...acc,
            [skin.num]: getSkinPoll(route.params.champion, skin.name),
          }),
          {}
        );
      }),
    });

    watch(
      () => [props.language, props.version],
      ([language, version]) => {
        updateChampion(language, version);
      }
    );

    function updateChampion(language, version, target = "champion") {
      fetch(
        `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${route.params.champion}.json`
      )
        .then((res) => res.json())
        .then((data) => {
          // update loaded
          const champion = data.data[route.params.champion];
          if (target === "champion") {
            for (const idx in champion.skins) {
              if (state[target].skins) {
                champion.skins[idx].loaded = state[target].skins[idx].loaded;
              } else {
                champion.skins[idx].loaded = false;
              }
            }
          }
          state[target] = champion;
        });
    }

    updateChampion("en_US", props.version, "defaultChampion");
    updateChampion(props.language, props.version);
    return { ...toRefs(state) };
  },
};
</script>
