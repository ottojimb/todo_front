<template>
  <tr
    v-bind:class="{
      'is-selected': todoData.id == rowSelected,
      'is-danger': todoData.done
    }"
  >
    <td v-bind:class="{ done: todoData.done }">{{ todoData.id }}</td>
    <td v-bind:class="{ done: todoData.done }">{{ todoData.user }}</td>
    <td v-bind:class="{ done: todoData.done }">{{ todoData.message }}</td>
    <td v-bind:class="{ done: todoData.done }">
      <button
        v-if="!todoData.done"
        class="button is-success is-small"
        @click="clickFromDone(todoData)"
      >
        Done
      </button>
    </td>
  </tr>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>

<script>
export default {
  name: "TodoField",
  props: {
    todoData: {
      id: Number,
      user: Number,
      message: String,
      done: Boolean
    },
    rowSelected: Number
  },
  methods: {
    clickFromDone(todoData) {
      this.$emit("clickFromDone", todoData);
    }
  }
};
</script>
