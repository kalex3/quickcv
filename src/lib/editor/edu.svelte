<script lang="ts">
  import { addCard, data } from "$lib/state/index.svelte";
  import Delete from "./delete.svelte";
  const addEducation = () => addCard("education");
</script>

{#snippet educationCard(index: number)}
  <div class="grid-(~ cols-2 gap5) relative">
    <Delete {index} type="education" />

    <label for={"institution-" + index}>Institution</label>
    <label for={"edu-date-" + index}>Date</label>

    <input
      id={"institution-" + index}
      name={"institution-" + index}
      type="text"
      autocomplete="off"
      placeholder="Cornell University…"
      class="input"
      bind:value={data.education[index].institution}
    />

    <input
      id={"edu-date-" + index}
      name={"edu-date-" + index}
      type="text"
      autocomplete="off"
      placeholder="May 2018…"
      class="input"
      bind:value={data.education[index].date}
    />

    <label for={"qualification-" + index} class="col-span-2">Qualification</label>
    <input
      id={"qualification-" + index}
      name={"qualification-" + index}
      type="text"
      autocomplete="off"
      placeholder="Bachelor of Science in Computer Engineering…"
      class="col-span-2 input"
      bind:value={data.education[index].qualification}
    />
  </div>
{/snippet}

<div class="grid gap5">
  <h2 class="frow !text-base !font-bold">
    <i class="i-qlementine-icons:education-16"></i> Education
  </h2>

  {#each data.education as edu, index}
    {#if index > 0}
      <hr class="w-full brd" />
    {/if}
    {@render educationCard(index)}
  {/each}

  <button class="btn ml-auto" onclick={addEducation}>Add Education</button>
</div>
