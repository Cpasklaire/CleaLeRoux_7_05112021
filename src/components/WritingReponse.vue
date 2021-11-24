<template>
  <section class="whiting">
    <div class="interraction">
      <textarea placeholder="Exprimez vous"></textarea>
      <label for="file">Une image ?</label>
      <input type="file" id="file" name="file" multiple accept=".png, .jpg, .jpeg, .gif">
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
  margin-top: 30%;
  flex-direction: column;
  .interraction
  {
    border: 3px solid #091F43;
    border-radius: 30px;
    background-color: white;
    padding: 2%;
    textarea
    {
      width: 100%;
      height: 200px;
      border: none;
    }
    .mt-3
    {
      margin-left: 10%;
    }
  }
  button
  {
    margin-top: 10%;
    margin-left: 32%;
    border: 3px solid #091F43;
    border-radius: 30px;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    font-size: 1.5em;
  }
}
</style>