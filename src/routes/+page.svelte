<script lang="ts">
  import Default from "$lib/templates/default.svelte";
  import Minimal from "$lib/templates/minimal.svelte";
  import Tile from "$lib/templates/tile.svelte";

  import Ui from "$lib/ui/index.svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { ui } from "$lib/state/index.svelte";

  let themes = {
    default: Default,
    minimal: Minimal,
    tile:Tile,
  };

  // searchParams cannot be read while the page is prerendered.
  let themeName = $derived(
    browser ? page.url.searchParams.get("theme") || "default" : "default",
  );
  let Component = $derived(themes[themeName]);

  onMount(() => {
    document.body.style.overflow = ui.mode == "split"
      ? "hidden"
      : "visible";
  });
</script>

<Ui>
  <Component />
</Ui>
