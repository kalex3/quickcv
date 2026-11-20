<script lang="ts">
  import { addCard, data } from "$lib/state/index.svelte";
  import Delete from "./delete.svelte";
  const add = () => addCard("skills");
</script>

{#snippet projectCard(index: number)}
  <div class="relative grid-(~ cols-2 gap5)">
    <Delete {index} type="skills" />

    <label for={"skill-" + index}>Skill Name</label>
    <label for={"skill-icon-" + index}>SVG Icon</label>

    <input
      id={"skill-" + index}
      name={"skill-" + index}
      type="text"
      autocomplete="off"
      placeholder="TypeScript…"
      class="input"
      bind:value={data.skills[index].name}
    />

    <input
      id={"skill-icon-" + index}
      name={"skill-icon-" + index}
      type="text"
      autocomplete="off"
      spellcheck="false"
      placeholder="SVG markup…"
      class="input"
      bind:value={data.skills[index].icon}
    />
  </div>
{/snippet}

<div class="grid gap5">
  <h2 class="frow !text-base !font-bold">
    <i class="i-typcn:code-outline"></i> Skills
  </h2>

  {#each data.skills as _, index}
    {@render projectCard(index)}
  {/each}

  <button class="btn-primary ml-auto" onclick={add}>Add Skill</button>
</div>
