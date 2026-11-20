<script lang="ts">
  import { Input } from "@haze-ui/svelte";
  import { data } from "$lib/state/index.svelte";
  import type { ContactKey, LinkKey } from "$lib/state/types";
</script>

{#snippet showToggle(key: ContactKey, name: string)}
  <label class="frow gap1 text-sm text-muted-fg font-normal">
    <input
      type="checkbox"
      class="checkbox-sm"
      bind:checked={data.shown[key]}
      aria-label={`Show ${name} on resume`}
    />
    Show
  </label>
{/snippet}

{#snippet clickableToggle(key: LinkKey, name: string)}
  <label
    class="frow gap1 text-sm text-muted-fg font-normal"
    class:opacity-40={!data.shown[key]}
  >
    <input
      type="checkbox"
      class="checkbox-sm"
      bind:checked={data.clickable[key]}
      disabled={!data.shown[key]}
      aria-label={`Make ${name} clickable`}
    />
    Clickable
  </label>
{/snippet}

{#snippet fieldHead(id: string, label: string, key: ContactKey, name: string)}
  <div class="frow flex-wrap justify-between gap-x2 gap-y1">
    <label for={id} translate={label == "GitHub" || label == "LinkedIn" ? "no" : "yes"}>{label}</label>
    <span class="frow gap3">
      {#if key !== "location"}
        {@render clickableToggle(key, name)}
      {/if}
      {@render showToggle(key, name)}
    </span>
  </div>
{/snippet}

<div class="grid-(~ cols-2 gap5)">
  <h2 class="frow col-span-2 !text-base !font-bold">
    <i class="i-majesticons:user-line"></i> Personal Details
  </h2>

  <p class="col-span-2 text-sm text-muted-fg -mt2">
    Uncheck Show to hide a contact detail. Uncheck Clickable to keep it as plain text.
  </p>

  <label for="name" class="col-span-2">Name</label>

  <input
    id="name"
    name="name"
    type="text"
    autocomplete="name"
    bind:value={data.details.name}
    placeholder="Ada Lovelace…"
    class="col-span-2 input"
  />

  <label for="role" class="col-span-2">Role</label>

  <input
    id="role"
    name="role"
    type="text"
    autocomplete="off"
    placeholder="Frontend Developer…"
    bind:value={data.details.role}
    class="col-span-2 input"
  />

  <label for="about" class="col-span-2">About</label>

  <input
    id="about"
    name="about"
    type="text"
    autocomplete="off"
    placeholder="Built web apps for small teams…"
    bind:value={data.details.about}
    class="col-span-2 input"
  />

  {@render fieldHead("email", "Email", "email", "email")}
  {@render fieldHead("phone", "Phone Number", "phone", "phone number")}

  <Input
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    spellcheck="false"
    placeholder="ada@example.com…"
    iconL="i-line-md:email"
    bind:value={data.details.email}
  />
  <Input
    id="phone"
    name="phone"
    type="tel"
    inputmode="tel"
    autocomplete="tel"
    placeholder="+1 555 0100…"
    iconL="i-line-md:phone"
    bind:value={data.details.phone}
  />

  {@render fieldHead("location", "Location", "location", "location")}
  {@render fieldHead("website", "Website", "website", "website")}

  <Input
    id="location"
    name="location"
    iconL="i-tdesign:location-filled"
    type="text"
    autocomplete="off"
    placeholder="London, UK…"
    bind:value={data.details.location}
  />

  <Input
    id="website"
    name="website"
    type="url"
    autocomplete="url"
    spellcheck="false"
    placeholder="https://example.com…"
    iconL="i-lucide:globe"
    bind:value={data.details.website}
  />

  {@render fieldHead("github", "GitHub", "github", "GitHub")}
  {@render fieldHead("linkedin", "LinkedIn", "linkedin", "LinkedIn")}

  <Input
    id="github"
    name="github"
    type="text"
    autocomplete="off"
    spellcheck="false"
    placeholder="ada or github.com/ada…"
    iconL="i-mdi:github"
    bind:value={data.details.github}
  />
  <Input
    id="linkedin"
    name="linkedin"
    type="url"
    autocomplete="url"
    spellcheck="false"
    placeholder="https://linkedin.com/in/ada…"
    iconL="i-mdi:linkedin"
    bind:value={data.details.linkedin}
  />
</div>
