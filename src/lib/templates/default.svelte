<script lang="ts">
  import icons from "$lib/icons";
  import { textAreaFormat } from "$lib/utils";
  import { contactItems, data } from "$lib/state/index.svelte";

  let name = $derived(data.details?.name?.split(" "));
  let name2 = $derived(name?.slice(1));
  let contacts = $derived(contactItems());
</script>

{#snippet hicon(icon: keyof typeof icons)}
  <span class="flex p1.5 bg-secondary text-xl rounded-full" aria-hidden="true">
    {@html icons[icon]}
  </span>
{/snippet}

<!---------------------- name -------------------------------- -->
{#if data.details.name?.trim()}
  <h1 class="frow mx-auto text-4xl">
    <span>{name?.[0]}</span>
    <span class="text-primary">{name2?.join(" ")}</span>
  </h1>
{/if}

{#if data.details.role?.trim()}
  <span class="text-(center xl) mb3 font-light">{data.details.role}</span>
{/if}

{#if contacts.length > 0}
  <div class="frow flex-wrap border-(t b solid fg) py3 text-sm justify-center [&>*]:gap2">
    {#each contacts as item (item.key)}
      {#if item.href}
        <a class="frow" href={item.href} target="_blank">
          <span aria-hidden="true">{@html icons[item.icon]}</span>
          {item.text}
        </a>
      {:else}
        <span class="frow"><span aria-hidden="true">{@html icons[item.icon]}</span> {item.text}</span>
      {/if}
    {/each}
  </div>
{/if}

<!---------------------- About -------------------------------- -->
{#if data.details.about?.trim()}
  <h2 class="frow">{@render hicon("bullseye")}About :</h2>
  <p>{data.details.about}</p>
{/if}

{#if data.workExp.length > 0}
<h2 class="frow">{@render hicon("briefcase")}Experience :</h2>

{#each data.workExp as work}
  <div class="frow flex-wrap gap-y-3 mb4">
    <span>
      <strong>{work.title} </strong>
      - {work.company}
    </span>
    <span class="ml-auto badge-surface-sm">
      {work.date}
    </span>

    <ul class="list-disc space-y-2 text-secondary-fg ml-2">
      {#each textAreaFormat(work?.desc) as x}
        <li class="ml-2">{x}.</li>
      {/each}
    </ul>
  </div>
{/each}
{/if}

<!---------------------- Education -------------------------------- -->
{#if data.education.length > 0}
<h2 class="frow">{@render hicon("edu")}Education :</h2>

<div class="grid grid-cols-2 gap3">
  {#each data.education as edu}
    <div class="frow flex-wrap gap-y-1 mb4">
      <span>
        {edu.institution}
      </span>
      <span class="badge-secondary ml-auto">
        {edu.date}
      </span>
      <br />
      <span class="text-muted-fg w-full">
        {edu.qualification}
      </span>
    </div>
  {/each}
</div>
{/if}

{#if data.skills.length > 0}
<h2 class="frow">{@render hicon("brain")}Skills :</h2>

<div class="frow flex-wrap mb4 mt2">
  {#each data.skills as x}
    <span class="badge-secondary">
      {#if x.icon}
        <span aria-hidden="true">{@html x.icon}</span>
      {/if}
      {x.name}
    </span>
  {/each}
</div>
{/if}

{#if data.projects.length > 0}
<h2 class="frow">{@render hicon("opensource")}Projects :</h2>

{#each data.projects as project}
    <div class="flex flex-wrap">
      <span class="badge-lg bg-fg text-primary-fg rounded-b-0"
        >{project.name}</span
      >
      {#if project.link}
        <a href={project.link} target="_blank" class="ml-auto">View Project</a>
      {/if}
      <p class="brd-2-fg p3 rounded rounded-tl-0 w-full">{project.desc}</p>
    </div>
  {/each}
{/if}
