<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import type { PageData } from "./$types";
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import TrashIcon from "@lucide/svelte/icons/trash-2";
  import PencilIcon from "@lucide/svelte/icons/pencil";

  let { data }: { data: PageData } = $props();
  
  let editDialogOpen = $state(false);
  let editingLink = $state<{ id: string; slug: string } | null>(null);
  let newSlugValue = $state("");

  function openEditDialog(linkId: string, currentSlug: string) {
    editingLink = { id: linkId, slug: currentSlug };
    newSlugValue = currentSlug;
    editDialogOpen = true;
  }

  function handleEditSubmit() {
    if (!editingLink || !newSlugValue.trim()) return;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '?/editSlug';

    const linkIdInput = document.createElement('input');
    linkIdInput.type = 'hidden';
    linkIdInput.name = 'linkId';
    linkIdInput.value = editingLink.id;

    const slugInput = document.createElement('input');
    slugInput.type = 'hidden';
    slugInput.name = 'newSlug';
    slugInput.value = newSlugValue.trim();

    form.appendChild(linkIdInput);
    form.appendChild(slugInput);
    document.body.appendChild(form);
    form.submit();
  }
</script>

<section class="max-w-6xl mx-auto px-6 py-10 space-y-10">
  <!-- Header -->
  <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
        Manage your long and lovely links in one place.
      </p>
    </div>

    <div class="flex gap-3">
      <Button variant="outline" href="/dashboard/settings">
        Manage settings
      </Button>
      <Button href="/dashboard/new">
        + New link
      </Button>
    </div>
  </header>

  <!-- Stats row -->
  <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/60 p-4 shadow-sm">
      <p class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Total links
      </p>
      <p class="mt-2 text-2xl font-semibold">
        {data.links.length}
      </p>
      <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        {#if data.links.length === 0}
          You haven&apos;t created any links yet.
        {:else}
          Your latest creations are ready to be shared.
        {/if}
      </p>
    </div>

    <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/60 p-4 shadow-sm">
      <p class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Total clicks
      </p>
      <p class="mt-2 text-2xl font-semibold">
        {data.totalClicks.toLocaleString()}
      </p>
      <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        {#if data.totalClicks === 0}
          Analytics will appear once people start clicking.
        {:else}
          Across all your links.
        {/if}
      </p>
    </div>

    <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/60 p-4 shadow-sm">
      <p class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Most popular link
      </p>
      <p class="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
        {#if data.topLink}
          <a href={"https://longy.vercel.app/" + data.topLink.slug} target="_blank" rel="noreferrer">
            longy.vercel.app/{data.topLink.slug}
          </a>
        {:else}
          —
        {/if}
      </p>
      <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        {#if data.topLink}
          {data.topLink.clicks} {data.topLink.clicks === 1 ? 'click' : 'clicks'}
        {:else}
          Once you have traffic, your top link will show up here.
        {/if}
      </p>
    </div>
  </section>

  <!-- Links table / list -->
  <section class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/60 shadow-sm overflow-hidden">
    <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-5 py-3">
      <div>
        <h2 class="text-sm font-medium">Your links</h2>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          Create, edit, and manage your shortened links.
        </p>
      </div>
      <Button size="sm" href="/dashboard/new">
        + New link
      </Button>
    </div>

    {#if data.links.length === 0}
      <!-- Empty state -->
      <div class="px-5 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p class="mb-3 font-medium text-zinc-800 dark:text-zinc-100">
          You don&apos;t have any links yet.
        </p>
        <p class="mb-6 text-xs">
          Once you start creating links, they&apos;ll show up here with stats and quick actions.
        </p>
        <Button href="/dashboard/new">
          Create your first link
        </Button>
      </div>
    {:else}
      <!-- List of links -->
      <div class="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
        {#each data.links as link}
          <div class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex-1 space-y-1">
              <div class="flex items-center gap-2">
                <a
                  class="font-medium text-zinc-900 dark:text-zinc-50 hover:text-primary dark:hover:text-primary transition-colors"
                  href={"https://longy.vercel.app/" + link.slug}
                  target="_blank"
                  rel="noreferrer"
                >
                  longy.vercel.app/{link.slug}
                </a>
              </div>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 break-all">
                {link.target_url}
              </p>
            </div>

            <div class="flex items-center gap-3 sm:flex-none sm:justify-end">
              <div class="flex flex-col items-end gap-0.5">
                <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {link.clicks ?? 0} {(link.clicks ?? 0) === 1 ? 'click' : 'clicks'}
                </span>
                <span class="text-[11px] text-zinc-400">
                  {new Date(link.created_at).toLocaleDateString()}
                </span>
              </div>

              <Button variant="outline" size="sm" href={"https://longy.vercel.app/" + link.slug} target="_blank">
                Open
              </Button>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="ghost" size="icon-sm" class="h-8 w-8">
                    <EllipsisIcon class="h-4 w-4" />
                    <span class="sr-only">More actions</span>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end" class="w-48">
                  <DropdownMenu.Label class="text-xs font-medium">
                    Actions
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  
                  <button
                    type="button"
                    class="contents"
                    onclick={() => openEditDialog(link.id, link.slug)}
                  >
                    <DropdownMenu.Item class="cursor-pointer">
                      <PencilIcon class="mr-2 h-4 w-4" />
                      Edit slug
                    </DropdownMenu.Item>
                  </button>

                  <form method="POST" action="?/delete" class="contents">
                    <input type="hidden" name="linkId" value={link.id} />
                    <button
                      type="button"
                      class="contents"
                      onclick={(e) => {
                        if (confirm(`Delete "${link.slug}"? This cannot be undone.`)) {
                          const form = e.currentTarget?.parentElement;
                          if (form instanceof HTMLFormElement) {
                            form.requestSubmit();
                          }
                        }
                      }}
                    >
                      <DropdownMenu.Item class="text-destructive focus:text-destructive cursor-pointer">
                        <TrashIcon class="mr-2 h-4 w-4" />
                        Delete link
                      </DropdownMenu.Item>
                    </button>
                  </form>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</section>

<!-- Edit Slug Dialog -->
<AlertDialog.Root bind:open={editDialogOpen}>
  <AlertDialog.Content class="max-w-md">
    <AlertDialog.Header>
      <AlertDialog.Title>Edit slug</AlertDialog.Title>
      <AlertDialog.Description>
        Change the slug for this link. Make sure it's unique and memorable.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <div class="py-4">
      <label for="edit-slug-input" class="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2 block">
        New slug
      </label>
      <div class="flex items-center gap-2">
        <span class="text-xs text-zinc-500 dark:text-zinc-400">
          longy.vercel.app/
        </span>
        <input
          id="edit-slug-input"
          type="text"
          bind:value={newSlugValue}
          placeholder="my-custom-slug"
          class="flex-1 rounded-md border border-zinc-200 bg-background px-3 py-2 text-sm text-zinc-900 shadow-xs outline-none transition focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>
    </div>

    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={handleEditSubmit}>
        Save changes
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>