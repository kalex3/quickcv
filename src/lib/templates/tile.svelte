<script lang="ts">
  import { textAreaFormat } from "$lib/utils";
  import { contactItems, data } from "$lib/state/index.svelte";
  import icons from "$lib/icons";

  let contacts = $derived(contactItems());
</script>

<div class="text-center border-(y fg) py-6 -mt-3">
  {#if data.details.name?.trim()}
    <h1 class="text-4xl tracking-wide">{data.details.name}</h1>
  {/if}
  {#if data.details.role?.trim()}
    <p class="uppercase tracking-widest  mt2">
      {data.details.role}
    </p>
  {/if}
</div>

<div
  class=" mt--3 [&>section]:(p3 pb5 pl0) grid-(~ cols-[.3fr_1fr]) rid-rows-4"
>
  {#if contacts.length > 0}
  <section class="col-start-1 row-start-1 grid gap1 border-(b r fg)">
    <h2 class="uppercase font-bold !text-lg lg:!text-xl">Contact</h2>

    {#each contacts as item (item.key)}
      {#if item.href}
        <a class="frow break-words" href={item.href} target="_blank">
          <span aria-hidden="true">{@html icons[item.icon]}</span>
          {item.text}
        </a>
      {:else}
        <span class="frow break-words"><span aria-hidden="true">{@html icons[item.icon]}</span> {item.text}</span>
      {/if}
    {/each}
  </section>
  {/if}

  {#if data.details.about?.trim()}
  <section class="col-start-2 row-start-1 border-(b fg) !pl5">
    <h2 class="uppercase font-bold !text-lg lg:!text-xl">Summary</h2>
    <p class="mt-2 text-sm">{data.details.about}</p>
  </section>
  {/if}

  {#if data.education.length > 0}
  <section class="col-start-1 row-start-2 grid gap1 border-(b r fg)">
    <h2 class="uppercase font-bold !text-lg lg:!text-xl">Education</h2>

    <div class="space-y-4">
      {#each data.education as edu}
        <div>
          <p class="font-semibold">{edu.institution}</p>
          <p class="text-sm">{edu.qualification}</p>
          <p class="text-xs text-muted-fg">{edu.date}</p>
          {#if edu.gpa}
            <p class="text-xs">GPA: {edu.gpa}</p>
          {/if}
        </div>
      {/each}
    </div>
  </section>
  {/if}

  {#if data.workExp.length > 0}
  <section class="col-start-2 row-start-2 row-span-2 !pl5 flex flex-col gap3">
    <h2 class="uppercase font-bold !text-lg lg:!text-xl -mb-2">Work Experience</h2>
    {#each data.workExp as work}
      <div>
        <div class="flex justify-between">
          <span class="font-semibold text-lg">{work.title}</span>
          <span class="text-sm text-muted-fg">{work.date}</span>
        </div>
        <p class="mb2">{work.company}</p>
        <ul class="list-disc ml-5 text-sm space-y-1">
          {#each textAreaFormat(work.desc) as line}
            <li>{line}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>
  {/if}

  {#if data.skills.length > 0}
  <section class="col-start-1 row-start-3 flex flex-col gap3 border-( r fg)">
    <h2 class="uppercase font-bold !text-lg lg:!text-xl">Skills</h2>

    <ul class="frow flex-wrap">
      {#each data.skills as x}
        <span class="badge-outline brd-fg">{x.name}</span>
      {/each}
    </ul>
  </section>
  {/if}

  {#if data.projects.length > 0}
    <hr class="border-fg col-span-full row-start-4" />
    <section class="col-span-full row-start-5 pl5">
      <h2 class="uppercase font-bold !text-lg lg:!text-xl mb3">Projects</h2>
      {#each data.projects as x}
        <div class="brd-fg p3 flex-col flex gap1">
          <div class="flex justify-between items-center">
            <p class="font-semibold">{x.name}</p>
            {#if x.link}
              <a href={x.link} target="_blank">View Project</a>
            {/if}
          </div>
          <p class="text-sm">{x.desc}</p>
        </div>
      {/each}
    </section>
  {/if}
</div>
