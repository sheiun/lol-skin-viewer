<template>
  <div>
    <label id="listbox-label" class="block text-sm font-medium text-gray-700">
      <slot name="Label"></slot>
    </label>

    <div class="mt-1 relative" v-click-outside="() => (isOpen = false)">
      <button
        @click="isOpen = true"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <span class="flex items-center">
          <!-- TODO: flag image -->
          <!-- <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            class="flex-shrink-0 h-6 w-6 rounded-full"
          /> -->
          <span class="ml-3 block truncate">
            {{ items[selected] }}
          </span>
        </span>
        <span
          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <!-- Heroicon name: selector -->
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isOpen"
          class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
        >
          <ul
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <li
              @click="
                () => {
                  selected = idx;
                  isOpen = false;
                }
              "
              @mouseover="hovered = idx"
              @focus="hovered = idx"
              @mouseout="hovered = -1"
              v-for="(item, idx) in items"
              :key="idx"
              id="listbox-item-0"
              role="option"
              :class="[
                hovered === idx ? 'text-white bg-indigo-600' : 'text-gray-600',
              ]"
              class="select-none relative py-2 pl-3 pr-9"
            >
              <div class="flex items-center space-x-5">
                <!-- <img
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt=""
                class="flex-shrink-0 h-6 w-6 rounded-full"
              /> -->
                <span
                  class="ml-3 block"
                  :class="[selected === idx ? 'font-semibold' : 'font-normal']"
                >
                  <!-- truncate -->
                  {{ item }}
                </span>
              </div>

              <span
                v-show="selected === idx"
                :class="[hovered === idx ? 'text-white' : 'text-indigo-600']"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <!-- Heroicon name: check -->
                <svg
                  class="ht-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";

export default {
  name: "Select",
  props: {
    items: Array,
  },

  setup(props, { emit }) {
    const state = reactive({
      selected: 0,
      hovered: -1,
      isOpen: false,
    });

    watch(
      () => state.selected,
      (selected) => {
        emit("select", props.items[selected]);
      }
    );

    return { ...toRefs(state) };
  },
};
</script>
