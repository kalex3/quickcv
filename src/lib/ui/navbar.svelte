<script lang="ts">
  import { onMount } from "svelte";
  import { replaceState } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import { Btn, Tab, Tabs, TabsList } from "@haze-ui/svelte";
  import { generatePDF } from "$lib/utils";
  import Viewscale from "./viewscale.svelte";
  import { ui } from "$lib/state/index.svelte";

  let theme = $state("dark");

  const themeColor = (value: string) => (value == "dark" ? "#0b1221" : "#ffffff");

  const applyTheme = (value: string) => {
    theme = value;
    localStorage.theme = value;
    document.documentElement.className = value;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.append(meta);
    }
    meta.setAttribute("content", themeColor(value));
  };

  onMount(() => {
    theme = localStorage.theme || "dark";
  });

  const toggleTheme = () => applyTheme(theme == "dark" ? "light" : "dark");

  const setActive = (x: string) => {
    if ((x !== "split" && x !== "tab") || x == ui.mode) return;
    ui.mode = x;
    const url = new URL(window.location.href);
    if (x == "split") url.searchParams.delete("mode");
    else url.searchParams.set("mode", x);
    replaceState(url, page.state);
  };

  const onEditor = $derived.by(() => {
    if (page.route.id == "/") return true;
    const path = page.url.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
    return path == base.replace(/\/$/, "");
  });
</script>

<nav class="p3 brd frow flex-wrap items-center z-10 bg-bg">
  <a class="frow min-w-0" href="{base}/">
    <i class="i-icon-park-solid:flashlamp bg-info text-xl"></i>
    <strong translate="no">CV Builder</strong>
  </a>

  <a href="{base}/templates" class="mr-auto ml2">Templates</a>

  {#if onEditor}
    <Viewscale />

    <Tabs value={ui.mode} setValue={setActive}>
      <TabsList class="p1 tab-(p2 px2 text-sm) tabon-(brd)">
        <Tab value="split"><i class="i-material-symbols:splitscreen-left"></i>
          Split</Tab>
        <Tab value="tab"> <i class="i-gravity-ui:layout-tabs"></i> Tabbed</Tab>
      </TabsList>
    </Tabs>

    <Btn
      iconL="i-tabler:download"
      txt="Download PDF"
      class="btn-primary"
      onclick={generatePDF}
    />
  {/if}

  <button
    class="btn-soft-eqlg rounded-full"
    aria-label={theme == "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    onclick={toggleTheme}
  >
    <div
      class={theme == "dark" ? "i-lucide:sun" : "i-lucide:moon"}
    >
    </div>
  </button>
</nav>
