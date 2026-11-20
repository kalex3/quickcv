<script lang="ts">
  import { addCard, data } from "$lib/state/index.svelte";
  import Delete from "./delete.svelte";
  const addProject = () => addCard("projects");
</script>

{#snippet projectCard(index: number)}
  <div class="relative grid-(~ cols-2 gap5)">
    <Delete {index} type="projects" />

    <label for={"project-" + index}>Project Name</label>
    <label for={"project-link-" + index}>Link</label>

    <input
      id={"project-" + index}
      name={"project-" + index}
      type="text"
      autocomplete="off"
      placeholder="CV Builder…"
      class="input"
      bind:value={data.projects[index].name}
    />

    <input
      id={"project-link-" + index}
      name={"project-link-" + index}
      placeholder="https://example.com…"
      class="input"
      bind:value={data.projects[index].link}
      type="url"
      autocomplete="url"
      spellcheck="false"
    />

    <label for={"project-desc-" + index} class="col-span-2">Description</label>
    <input
      id={"project-desc-" + index}
      name={"project-desc-" + index}
      type="text"
      autocomplete="off"
      placeholder="A short description of the project…"
      class="col-span-2 input"
      bind:value={data.projects[index].desc}
    />
  </div>
{/snippet}

<div class="grid gap5">
  <h2 class="frow !text-base !font-bold">
    <i class="i-pajamas:project"></i> Project
  </h2>

  {#each data.projects as project, index}
    {#if index > 0}
      <hr class="w-full brd" />
    {/if}
    {@render projectCard(index)}
  {/each}

  <button class="btn ml-auto" onclick={addProject}>Add Project</button>
</div>
