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
      @click="openVideoModal(skin)"
      v-for="skin in champion.skins"
      :key="skin.num"
      class="cursor-pointer w-48 lg:w-52 m-5 bg-blue-100"
    >
      <div class="flex justify-end">
        <div class="absolute">
          <span
            v-show="skin.loaded"
            v-for="[year, vote] in Object.entries(skinVotes[skin.num])"
            :key="year"
            :class="badgeColors[year]"
            class="relative -top-3 -right-3 ml-1 px-2 py-1 text-xs font-bold leading-none text-white rounded-full select-none"
          >
            {{ vote }}
          </span>
        </div>
      </div>

      <div
        v-show="!skin.loaded"
        class="w-48 lg:w-52 max-w-full h-80 lg:h-96 bg-gray-500 animate-pulse"
      ></div>
      <img
        v-show="skin.loaded"
        class="w-48 lg:w-52 max-w-full h-80 lg:h-96"
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
  <Modal ref="modal">
    <Video :id="videoId" />
  </Modal>
</template>

<script>
import { getAvatar, getImage } from "@/lib/lol";
import { getSkinPoll } from "@/lib/polls";

import videos from "@/data/videos";

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
      videoId: "",
      videoIds: computed(() =>
        state.defaultChampion !== undefined
          ? videos[state.defaultChampion.name]
          : {}
      ),
      openVideoModal,
    });

    function openVideoModal(skin) {
      state.videoId = state.videoIds[skin.name];
      this.$refs.modal.isOpen = true;
    }

    watch(
      () => [props.language, props.version],
      ([language, version]) => {
        updateChampion(language, version);
      }
    );

    function updateChampion(language, version, target = "champion") {
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${route.params.champion}.json`
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
