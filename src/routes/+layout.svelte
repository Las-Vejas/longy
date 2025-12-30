<script lang="ts">
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
    import { ModeWatcher } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    import { toggleMode } from "mode-watcher";
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import { resetMode, setMode } from "mode-watcher";
      import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
      import { buttonVariants } from "$lib/components/ui/button/index.js";

    let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<nav class="sticky top-0 z-50 backdrop-blur-sm border-b">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" class="text-2xl font-bold tracking-tight hover:shadow-accent transition-colors">
            longy
        </a>
        <div class="flex gap-2">
            {#if data.isLoggedIn}
                <Button href="/dashboard" variant="default">Dashboard</Button>
                <Button href="/auth/logout" variant="destructive">Log out</Button>
            {:else}
                <Button href="/auth/login" variant="default">Login</Button>
            {/if}
        </div>
    </div>
</nav>


<main class="flex-1  min-h-[calc(100vh-16rem)]">
    {@render children()}
</main>

<footer class="border-t border-zinc-300 dark:border-zinc-700">
        <div class="max-w-7xl mx-auto px-6 py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h3 class="text-lg font-bold mb-3">longy</h3>
                    <p class="text-sm ">
                        Long and lovely links.
                    </p>
                </div>

                <div>
                    <h4 class="text-sm font-semibold mb-3">Links</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/" class="hover:text-zinc-700 hover:dark:text-zinc-200 transition-colors">Home</a></li>
                        <li><a href="/dashboard" class="hover:text-zinc-700 hover:dark:text-zinc-200 transition-colors">Dashboard</a></li>

                    </ul>
                </div>

                <div>
                    <h4 class="text-sm font-semibold mb-3">Connect</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="https://hackclub.enterprise.slack.com/team/U0930DMR4BA" class="hover:text-zinc-700 hover:dark:text-zinc-200 transition-colors">@Vejas on Slack</a></li>
                        <li><a href="https://github.com/las-vejas/longy" class="hover:text-zinc-700 hover:dark:text-zinc-200 transition-colors">Repo</a></li>
                    </ul>
                </div>	
        </div>
        <!-- Bottom bar -->
        <div class="mt-8 pt-6 border-t border-zinc-300 dark:border-zinc-700 flex items-center justify-between text-sm text-zinc-400">
            <p>&copy; {new Date().getFullYear()} longy. Built with ❤️ by <a href="https://vejas.zip" class="text-decoration-underline">Vejas</a></p>
            <DropdownMenu.Root>
                      <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
                        <SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"/>
                        <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"/>
                        <span class="sr-only">Toggle theme</span>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content align="end">
                        <DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item>
                        <DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
                        <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
                      </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </div>
    </footer>
