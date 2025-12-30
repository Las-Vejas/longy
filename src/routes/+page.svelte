<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="relative overflow-hidden">
    <!-- Hero Section -->
    <div class="relative px-6 py-20 lg:py-32">
        <!-- Background gradient -->
        <div class="absolute inset-0 -z-10 bg-linear-to-br from-blue-500 via-transparent to-purple-500/50"></div>
        
        <div class="mx-auto max-w-5xl text-center space-y-8">
        <!-- Hero Text -->
            <h1 class="text-5xl lg:text-7xl font-bold tracking-tight">
                <span class="bg-linear-to-r from-black to-zinc-700 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                    Long links,
                </span>
                <br />
                <span class="bg-linear-to-r from-amber-400 to-sky-400 bg-clip-text text-transparent">
                    finite possibilities <span class="text-2xl font-bold tracking-tight">(jk)</span>
                </span>
            </h1>
            <div class="flex justify-center gap-4">
                <Button href="/dashboard" variant="default" size="lg">Get Started</Button>
                <Button href="/" variant="outline" size="lg">Learn More</Button>
            </div>
        </div>
</div>
    <!--<div id="features" class="px-6 py-20">
        <div class="mx-auto max-w-5xl">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">Everything you need</h2>
                <p class="text-xl text-zinc-400">Powerful features, simple interface</p>
            </div>
        </div>
    </div> -->
</div>