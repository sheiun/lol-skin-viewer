<template>
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <router-link class="flex justify-center text-4xl" to="/">
              <span class="sr-only">Workflow</span>
              <img
                class="h-8 w-auto sm:h-10"
                :src="require('@/assets/logo.svg')"
                alt=""
              />
              <span class="ml-5 text-gray-500 hover:text-black">
                LOL Skin Viewer
              </span>
            </router-link>
          </a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <button
            @click="isMenuOpen = true"
            type="button"
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <!-- Heroicon name: menu -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav class="hidden md:flex space-x-10">
          <a
            href="#"
            v-for="tab in tabs"
            :key="tab"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            {{ tab }}
          </a>
        </nav>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <!-- TODO: i18n of `Language` -->
          <Select
            class="w-1/4 ml-5"
            :items="languages"
            @select="(item) => (language = item)"
          />
          <Select
            class="w-1/4 ml-5"
            :items="versions"
            @select="(item) => (language = version)"
          />
        </div>
      </div>
      <!-- NOTE: content here -->
      <router-view :language="language" :version="version" />
    </div>

    <!-- Mobile menu, show/hide based on mobile menu state. -->
    <transition
      enter-active-class="duration-200 ease-out"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div class="-mr-2">
                <button
                  @click="isMenuOpen = false"
                  type="button"
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <!-- Heroicon name: x -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <a
                v-for="tab in tabs"
                :key="tab"
                href="#"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                {{ tab }}
              </a>
            </div>
            <div>
              <Select
                :items="languages"
                @select="(item) => (language = item)"
              />
              <Select
                :items="versions"
                @select="(item) => (language = version)"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import languages from "@/data/languages";
import versions from "@/data/versions";

import Select from "@/components/Select";

import { reactive, toRefs } from "vue";

export default {
  components: { Select },
  setup() {
    const state = reactive({
      languages,
      versions,
      language: languages[0],
      version: versions[0],
      tabs: ["About"],
      isMenuOpen: false,
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
