<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData | null } = $props();
</script>

<section class="max-w-5xl mx-auto px-6 py-14 space-y-10">
  <!-- Top bar -->
  <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div class="space-y-2">
      <p class="text-xs font-medium uppercase tracking-[0.18em] text-amber-500 dark:text-amber-300">
        New link
      </p>
      <div class="space-y-1">
        <h1 class="text-3xl font-semibold tracking-tight">
          Craft a long &amp; lovely link
        </h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
          Take any URL and wrap it in something memorable, readable, and totally you.
        </p>
      </div>
    </div>

    <div class="flex gap-3">
      <Button variant="outline" href="/dashboard" type="button" size="sm">
        Back to dashboard
      </Button>
    </div>
  </header>

  <!-- Two-column layout -->
  <div class="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.35fr)] items-start">
    <!-- Form card -->
    <div class="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/70 shadow-sm backdrop-blur-sm">
      <form method="POST" class="space-y-8 px-7 py-8 md:px-8 md:py-9">
        {#if form?.error}
          <div class="rounded-md border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-xs text-destructive">
            {form.error}
          </div>
        {/if}

        <!-- Destination URL -->
        <div class="space-y-3">
          <div class="space-y-1.5">
            <label for="url" class="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Destination URL
            </label>
            <p class="text-xs text-zinc-500 dark:text-zinc-400">
              The long URL your visitors will actually land on.
            </p>
          </div>
          <input
            id="url"
            name="url"
            type="url"
            required
            placeholder="https://example.com/very/long/path?with=params"
            value={form?.values?.url ?? ""}
            class="block w-full rounded-lg border border-zinc-200 bg-background px-3.5 py-2.5 text-sm text-zinc-900 shadow-xs outline-none transition focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        <!-- Slug 
        <div class="space-y-3">
          <div class="space-y-1.5">
            <label for="slug" class="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Custom slug (optional)
            </label>
            <p class="text-xs text-zinc-500 dark:text-zinc-400">
              Make it human: project names, jokes, inside references all welcome.
            </p>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div class="rounded-lg border border-dashed border-zinc-300/80 bg-zinc-50/60 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-400">
              longy.vercel.app/
            </div>
            <input
              id="slug"
              name="slug"
              type="text"
              placeholder="my-project"
              value={form?.values?.slug ?? ""}
              class="block w-full rounded-lg border border-zinc-200 bg-background px-3.5 py-2.5 text-sm text-zinc-900 shadow-xs outline-none transition focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <p class="text-xs text-zinc-500 dark:text-zinc-400">
            Leave this blank to let longy generate a short, unique slug for you.
          </p>
        </div>-->

        <!-- Actions -->
        <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button variant="outline" href="/dashboard" type="button">
            Cancel
          </Button>
          <Button type="submit">
            Create link
          </Button>
        </div>
      </form>
    </div>

    <!-- Preview / copy block -->
    <aside class="space-y-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-linear-to-b from-zinc-50/80 to-white/40 dark:from-zinc-900/80 dark:to-zinc-950/70 shadow-sm px-6 py-7 md:px-7 md:py-8">
      <div class="space-y-2">
        <p class="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Live preview
        </p>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
          As you fill things in, imagine how your link will feel when you drop it into Slack, DMs, or a talk slide.
        </p>
      </div>

      <div class="mt-4 space-y-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/90 px-4 py-4">
        <div class="flex flex-col gap-1">
          <span class="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Short link
          </span>
          <span class="text-sm font-mono text-zinc-900 dark:text-zinc-50 truncate">
            longy.vejas.zip/
            <span class="opacity-80">
              {(form?.values?.slug ?? "your-slug").toString() || "your-slug"}
            </span>
          </span>
        </div>

        <div class="flex flex-col gap-1 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800">
          <span class="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Destination
          </span>
          <span class="text-xs font-mono text-zinc-700 dark:text-zinc-300 break-all">
            {form?.values?.url ?? "https://example.com/very/long/path"}
          </span>
        </div>
      </div>

      <p class="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
        Pro tip: keep slugs pronounceable so you can say them out loud in a talk or to a friend—&nbsp;
        <span class="font-medium text-zinc-700 dark:text-zinc-200">
          good links read like tiny poems.
        </span>
      </p>
    </aside>
  </div>
</section>