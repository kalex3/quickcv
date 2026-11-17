<script lang="ts">
  import { textAreaFormat } from "$lib/utils";
  import { contactItems, data } from "$lib/state/index.svelte";

  let contacts = $derived(contactItems());
</script>

<h1 class="text-4xl">{data.details.name}</h1>

{#if contacts.length > 0}
  <div class="frow flex-wrap mt--1">
    {#each contacts as item, i (item.key)}
      {#if i > 0}
        <span aria-hidden="true">|</span>
      {/if}
      {#if item.href}
        <a href={item.href} target="_blank">
          {item.key === "github" ? `Github: ${item.text}` : item.text}
        </a>
      {:else}
        <span>{item.text}</span>
      {/if}
    {/each}
  </div>
{/if}

<h2>Summary</h2>
<hr class="brd-fg mt--2" />

<p>{data.details.about}</p>

<h2>Work Experience</h2>
<hr class="brd-fg mt--2" />
{#each data.workExp as work}
  <div>
    <div class="frow justify-between">
      <h3 class="text-xl font-semibold">{work.title}</h3>
      <span>{work.date}</span>
    </div>
    <p class="text-lg">{work.company}</p>

    <ul class="list-disc ml5">
      {#each textAreaFormat(work.desc) as line}
        <li>{line}</li>
      {/each}
    </ul>
  </div>
{/each}

<h2>Education</h2>
<hr class="brd-fg mt--2" />

{#each data.education as edu}
  <div>
    <div class="frow justify-between">
      <h3 class="text-xl font-semibold">{edu.institution}</h3>
      <span>{edu.date}</span>
    </div>
    <p class="text-lg">{edu.qualification}</p>
  </div>
{/each}

<h2>Skills</h2>
<hr class="brd-fg mt--2" />
<p>{data.skills.map((s) => s.name).join(", ")}</p>

<h2>Projects</h2>
<hr class="brd-fg mt--2" />

{#if data.projects.length > 0}
  {#each data.projects as x}
    <div>
      <h4 class="frow">
        {x.name} <a class="ml-auto" href={x.link} target="_blank">Link</a>
      </h4>
      <p>{x.desc}</p>
    </div>
  {/each}
{/if}
