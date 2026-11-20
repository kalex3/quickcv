<script lang="ts">
  import Delete from "./delete.svelte";
  import { addCard, data } from "$lib/state/index.svelte";

  const addWorkexp = () => addCard("workExp");
</script>

{#snippet card(index: number)}
  <div class="grid-(~ cols-2 gap5) relative">
    <Delete {index} type="workExp" />

    <label for={"company-" + index} class="col-span-2">Company</label>
    <input
      id={"company-" + index}
      name={"company-" + index}
      type="text"
      autocomplete="off"
      placeholder="Khan Academy…"
      class="col-span-2 input"
      bind:value={data.workExp[index].company}
    />

    <label for={"title-" + index}>Job Title</label>
    <label for={"date-" + index}>Date</label>

    <input
      id={"title-" + index}
      name={"title-" + index}
      type="text"
      autocomplete="off"
      class="input"
      placeholder="Software Engineer…"
      bind:value={data.workExp[index].title}
    />

    <input
      id={"date-" + index}
      name={"date-" + index}
      type="text"
      autocomplete="off"
      class="input"
      placeholder="Jun 2022 - Present…"
      bind:value={data.workExp[index].date}
    />

    <label for={"description-" + index} class="col-span-2">Description</label>
    <textarea
      id={"description-" + index}
      name={"description-" + index}
      autocomplete="off"
      placeholder="Shipped the marketing site…"
      class="input col-span-2 min-h-[6rem]"
      bind:value={data.workExp[index].desc}
    ></textarea>
  </div>
{/snippet}

<div class="grid gap5">
  <h2 class="frow !text-base !font-bold">
    <i class="i-tabler:briefcase"></i> Work Experience
  </h2>

  {#each data.workExp as work, index}
    {#if index > 0}
      <hr class="w-full brd" />
    {/if}

    {@render card(index)}
  {/each}

  <button class="btn ml-auto" onclick={addWorkexp}>Add Work Experience</button>
</div>
