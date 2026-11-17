<script lang="ts">
  import { ui } from "$lib/state/index.svelte";

  const scale = $derived(Number(ui.viewScale));

  const step = (delta: number) => {
    ui.viewScale = Math.min(100, Math.max(1, scale + delta));
  };
</script>

<div class="brd frow p2 rounded">
  <button
    type="button"
    class="btn-soft-eqmd"
    aria-label="Zoom out"
    disabled={scale <= 1}
    onclick={() => step(-10)}
  >−</button>
  <input
    type="range"
    min="1"
    max="100"
    bind:value={ui.viewScale}
    class="progress"
  />
  <button
    type="button"
    class="btn-soft-eqmd"
    aria-label="Zoom in"
    disabled={scale >= 100}
    onclick={() => step(10)}
  >+</button>
  <span style="width: 4ch;">{scale}%</span>
</div>
