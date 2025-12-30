<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import type { PageData } from "./$types";
  import TrashIcon from "@lucide/svelte/icons/trash-2";
  import DownloadIcon from "@lucide/svelte/icons/download";

  let { data }: { data: PageData } = $props();
  
  let deleteDialogOpen = $state(false);

  function handleExportLinks() {
    // You can implement CSV export later via a server action
    alert('Export feature coming soon!');
  }

  function handleDeleteAccount() {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '?/deleteAccount';
    document.body.appendChild(form);
    form.submit();
  }
</script>

<section class="max-w-4xl mx-auto px-6 py-10 space-y-10">
  <!-- Header -->
  <header class="flex flex-col gap-2">
    <h1 class="text-3xl font-semibold tracking-tight">Settings</h1>
    <p class="text-sm text-zinc-500 dark:text-zinc-400">
      Manage your account and preferences.
    </p>
  </header>

  <!-- Profile Section -->
  <section class="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/70 shadow-sm backdrop-blur-sm overflow-hidden">
    <div class="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
      <h2 class="text-lg font-semibold">Profile</h2>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
        Your account information from Hack Club Auth.
      </p>
    </div>

    <div class="px-6 py-8 flex flex-col items-center gap-6">
      <!-- Avatar -->
      <div class="relative">
        <img
          src={data.user.avatarUrl}
          alt="{data.user.name}'s avatar"
          class="w-28 h-28 rounded-full border-4 border-zinc-200 dark:border-zinc-800 shadow-md"
        />
      </div>

      <!-- Name & Email -->
      <div class="text-center space-y-1">
        <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {#if data.user.first_name && data.user.last_name}
            {data.user.first_name} {data.user.last_name}
          {:else}
            {data.user.name}
          {/if}
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {data.user.email}
        </p>
        <p class="text-xs text-zinc-400 dark:text-zinc-500">
          Member since {new Date(data.user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-6 w-full max-w-sm mt-4">
        <div class="text-center rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 py-3">
          <p class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {data.stats.totalLinks}
          </p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Total links
          </p>
        </div>
        <div class="text-center rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 py-3">
          <p class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {data.stats.totalClicks.toLocaleString()}
          </p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Total clicks
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Data Export Section -->
  <section class="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/70 shadow-sm backdrop-blur-sm overflow-hidden">
    <div class="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
      <h2 class="text-lg font-semibold">Export Data</h2>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
        Download all your links and analytics.
      </p>
    </div>

    <div class="px-6 py-6 space-y-4">
      <p class="text-sm text-zinc-600 dark:text-zinc-400">
        Export your links, click counts, and timestamps as a CSV file for backup or analysis.
      </p>
      <Button variant="outline" onclick={handleExportLinks}>
        <DownloadIcon class="mr-2 h-4 w-4" />
        Export all links
      </Button>
    </div>
  </section>

  <!-- Danger Zone -->
  <section class="rounded-2xl border border-destructive/30 bg-destructive/5 dark:bg-destructive/10 shadow-sm overflow-hidden">
    <div class="border-b border-destructive/30 px-6 py-4">
      <h2 class="text-lg font-semibold text-destructive">Danger Zone</h2>
      <p class="text-xs text-destructive/80 mt-0.5">
        Irreversible actions. Proceed with caution.
      </p>
    </div>

    <div class="px-6 py-6 space-y-4">
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Delete Account
        </h3>
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          Permanently delete your account and all associated links. This action cannot be undone.
        </p>
      </div>
      <Button variant="destructive" onclick={() => deleteDialogOpen = true}>
        <TrashIcon class="mr-2 h-4 w-4" />
        Delete my account
      </Button>
    </div>
  </section>

  <!-- Back to Dashboard -->
  <div class="flex justify-center pt-4">
    <Button variant="ghost" href="/dashboard">
      ← Back to Dashboard
    </Button>
  </div>
</section>

<!-- Delete Account Confirmation Dialog -->
<AlertDialog.Root bind:open={deleteDialogOpen}>
  <AlertDialog.Content class="max-w-md">
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account, all your links, and all associated analytics data.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        onclick={handleDeleteAccount}
        class="bg-destructive text-white hover:bg-destructive/90"
      >
        Yes, delete my account
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>