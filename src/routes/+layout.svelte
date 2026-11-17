<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  import "virtual:uno.css";
  import "@unocss/reset/tailwind.css";
  import "$lib/css/style.css";

  import Navbar from "$lib/ui/navbar.svelte";
  import { onMount } from "svelte";
  import { persistState, restoreState } from "$lib/state/index.svelte";

  let { children } = $props();
  let ready = $state(false);

  onMount(() => {
    restoreState();
    ready = true;
  });

  $effect(() => {
    if (!ready) return;
    persistState();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
{@render children()}
