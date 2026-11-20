<script lang="ts">
  import { base } from "$app/paths";
  import Default from "$lib/templates/default.svelte";
  import Minimal from "$lib/templates/minimal.svelte";
  import Tile from "$lib/templates/tile.svelte";

  let List = [
    { name: "default", component: Default },
    { name: "minimal", component: Minimal },
    { name: "tile", component: Tile },
  ];
</script>

<div class="flex flex-wrap gap-(x4 y12) p10">
  {#each List as x}
    <div
      style="scale: 0.3"
      class="!origin-top-left grid gap3 w-[63mm] min-h-[89.1mm] h-full"
    >
      <a
        class="badge text-primary-fg w-full text-5xl h-fit p5 justify-center capitalize"
        href="{base}/?theme={x.name}"
      >{x.name}</a>

      <div class="doc">
        <x.component />
      </div>
    </div>
  {/each}
</div>
