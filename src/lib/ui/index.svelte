<script lang="ts">
  import Editor from "../editor/index.svelte";
  import { replaceState } from "$app/navigation";
  import { page } from "$app/state";
  import { ui } from "$lib/state/index.svelte";
  import { Tab, Tabs, TabsContent, TabsList } from "@haze-ui/svelte";

  let { children } = $props();

  const setPanel = (x: string) => {
    if ((x !== "editor" && x !== "viewer") || x == ui.panel) return;
    ui.panel = x;
    const url = new URL(window.location.href);
    if (x == "editor") url.searchParams.delete("panel");
    else url.searchParams.set("panel", x);
    replaceState(url, page.state);
  };
</script>

{#if ui.mode == "split"}
  <div class="grid-(~ cols-2) min-h-0 flex-1">
    <div class="min-h-0 overflow-y-auto p5 scrollbar">
      <Editor />
    </div>

    <div
      class="min-h-0 overflow-auto pt5 flex justify-center items-start scrollbar"
    >
      <div
        class="doc"
        id="resume"
        style={`transform: scale(${ui.viewScale}%)`}
      >
        {@render children?.()}
      </div>
    </div>
  </div>
{:else}
  <div class={`grid gap3 justify-center py10`}>
    <Tabs value={ui.panel} setValue={setPanel}>
      <TabsList class="mx-auto !bg-bg bg-muted tabon-(!bg-secondary)">
        <Tab value="editor"><i class="i-fa-regular:edit"></i>
          Editor</Tab>
        <Tab value="viewer">
          <i class="i-fluent:eye-28-regular"></i> Viewer</Tab>
      </TabsList>

      <TabsContent value="editor" class="max-w-[1000px]">
        <Editor />
      </TabsContent>

      <TabsContent
        value="viewer"
        class='doc'
        style={`transform: scale(${ui.viewScale}%)`}
        id="resume"
      >
        {@render children?.()}
      </TabsContent>
    </Tabs>
  </div>
{/if}
