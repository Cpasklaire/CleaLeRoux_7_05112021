<template>
  <section class="whiting">
    <div class="interraction">
      <textarea placeholder="Exprimez vous"></textarea>
      <b-form-file v-model="file2" class="mt-3" accept=".jpg, .png, .gif" plain></b-form-file>
    </div>
    <button>Envoyer</button>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        file1: null,
        file2: null
      }
    }
  }
</script>

<style lang="scss">
section
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2%;
  flex-direction: column;
  .interraction
  {
    border: 3px solid #091F43;
    background-color: white;
    padding: 2%;
    textarea
    {
      width: 100%;
      height: 200px;
      border: none;
    }
  }
  button
  {
    margin: 2%;
  }
}
</style>