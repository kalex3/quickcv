<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  import "virtual:uno.css";
  import "@unocss/reset/tailwind.css";
  import "$lib/css/style.css";

  import Navbar from "$lib/ui/navbar.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { persistState, restoreState, serializeState, ui } from "$lib/state/index.svelte";

  let { children } = $props();
  let ready = $state(false);
  const splitEditor = $derived(page.route.id == "/" && ui.mode == "split");

  onMount(() => {
    restoreState();
    const mode = page.url.searchParams.get("mode");
    const panel = page.url.searchParams.get("panel");
    if (mode === "split" || mode === "tab") ui.mode = mode;
    if (panel === "editor" || panel === "viewer") ui.panel = panel;
    ready = true;

    const flush = () => persistState();
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  });

  $effect(() => {
    if (!ready) return;
    // Read during the effect so a keystroke reschedules the write.
    serializeState();
    const id = setTimeout(persistState, 200);
    return () => clearTimeout(id);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col h-[100dvh]">
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-bg focus:text-fg focus:p-3 focus:rounded"
  >Skip to Content</a>
  <Navbar />
  <main
    id="main"
    class="min-h-0 flex-1 flex flex-col {splitEditor ? 'overflow-hidden' : 'overflow-auto'}"
  >
    {@render children()}
  </main>
</div>
