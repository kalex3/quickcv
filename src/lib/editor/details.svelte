<script lang="ts">
  import { Input } from "@haze-ui/svelte";
  import { data } from "$lib/state/index.svelte";
  import type { ContactKey } from "$lib/state/types";
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

<div class="grid-(~ cols-2 gap5)">
  <strong class="frow col-span-2">
    <i class="i-majesticons:user-line"></i> Personal Details
  </strong>

  <p class="col-span-2 text-sm text-muted-fg -mt2">
    Uncheck Show to hide that contact detail on the resume.
  </p>

  <label for="name" class="col-span-2">Name</label>

  <input
    id="name"
    type="text"
    bind:value={data.details.name}
    placeholder="Enter your name"
    class="col-span-2 input"
  />

  <label for="role" class="col-span-2">Role</label>

  <input
    id="role"
    type="text"
    placeholder="Frontend Developer"
    bind:value={data.details.role}
    class="col-span-2 input"
  />

  <label for="about" class="col-span-2">About</label>

  <input
    id="about"
    type="text"
    placeholder="about"
    bind:value={data.details.about}
    class="col-span-2 input"
  />

  <div class="frow justify-between gap2">
    <label for="email">Email</label>
    {@render showToggle("email", "email")}
  </div>
  <div class="frow justify-between gap2">
    <label for="phone">Phone Number</label>
    {@render showToggle("phone", "phone number")}
  </div>

  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    iconL="i-line-md:email"
    bind:value={data.details.email}
  />
  <Input
    id="phone"
    type="text"
    placeholder="Enter phone number"
    iconL="i-line-md:phone"
    bind:value={data.details.phone}
  />

  <div class="frow justify-between gap2">
    <label for="location">Location</label>
    {@render showToggle("location", "location")}
  </div>
  <div class="frow justify-between gap2">
    <label for="website">Website</label>
    {@render showToggle("website", "website")}
  </div>

  <Input
    id="location"
    iconL="i-tdesign:location-filled"
    type="text"
    placeholder="Enter location"
    bind:value={data.details.location}
  />

  <Input
    id="website"
    type="url"
    placeholder="Enter website"
    iconL="i-lucide:globe"
    bind:value={data.details.website}
  />

  <div class="frow justify-between gap2">
    <label for="github">GitHub</label>
    {@render showToggle("github", "GitHub")}
  </div>
  <div class="frow justify-between gap2">
    <label for="linkedin">LinkedIn</label>
    {@render showToggle("linkedin", "LinkedIn")}
  </div>

  <Input
    id="github"
    placeholder="Username or profile URL"
    iconL="i-mdi:github"
    bind:value={data.details.github}
  />
  <Input
    id="linkedin"
    type="text"
    placeholder="Enter linkedin url"
    iconL="i-mdi:linkedin"
    bind:value={data.details.linkedin}
  />
</div>
