<script lang="ts">
  import { deleteCard } from "$lib/state/index.svelte";
  import type { ListsData } from "$lib/state/types";

  interface Props {
    index: number;
    type: ListsData;
  }

  let { index, type }: Props = $props();

  const names: Record<ListsData, string> = {
    workExp: "Work Experience",
    education: "Education",
    projects: "Project",
    skills: "Skill",
  };

  const label = $derived(`${names[type]} ${index + 1}`);

  const remove = () => {
    if (!confirm(`Delete ${label}?`)) return;
    deleteCard(type, index);
  };
</script>

<button
  class="absolute right-0 btn-soft-eqmd text-danger rounded-full"
  aria-label={"Delete " + label}
  onclick={remove}
>
  <i class="i-mi:delete"></i>
</button>
