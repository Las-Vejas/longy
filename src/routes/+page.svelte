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

    <div id="features" class="px-6 py-20">
        <div class="mx-auto max-w-5xl">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">Everything you need</h2>
                <p class="text-xl text-zinc-400">Powerful features, simple interface</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-400">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Instant Elongation</h3>
                    <p class="text-zinc-400">Transform long URLs into longer, more cumbersome links in seconds!</p>
                </div>

                <div class="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-400">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Custom Slugs</h3>
                    <p class="text-zinc-400">Make your links memorable with human-friendly slugs you can share or say out loud.</p>
                </div>

                <div class="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-400">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Analytics</h3>
                    <p class="text-zinc-400">Gain insights into your links and users with detailed analytics and tracking.</p>
                </div>
            </div>

            <div id="pricing" class="px-6 py-20">
                <div class="mx-auto max-w-5xl">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold mb-4">Pricing</h2>
                        <p class="text-xl text-zinc-400">I need za moneys $$$</p>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <h3 class="text-2xl font-semibold mb-4">Free Plan</h3>
                            <p class="text-zinc-400 mb-6">Perfect for personal use and getting started.</p>
                            <ul class="space-y-4 mb-6">
                                <li class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-400 mt-1">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <span>Unlimited long links</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-400 mt-1">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <span>Analytics you will love</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-400 mt-1">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <span>idk what more</span>
                                </li>
                            </ul>
                            <div class="flex justify-center gap-4">
                                <Button href="" variant="default" size="lg">Pay Me</Button>
                                <Button href="/dashboard" variant="outline" size="lg">Get Started</Button>
                            </div>
                         </div>
                        <div class="bg-white-300 dark:bg-zinc-900 rounded-2xl p-8 border border-white-600 hover:border-white-800 transition-colors">
                            <h3 class="text-2xl font-semibold mb-4">Support Plan</h3>
                            <p class="text-zinc-950 dark:text-zinc-400mb-6">If you'd like to support me.</p>
                            <ul class="space-y-4 mb-6">
                                <li class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-400 mt-1">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <span>All Free Plan features</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-400 mt-1">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <span>Priority support</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-400 mt-1">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <span>Early access to new features</span>
                                </li>
                                <div class="flex justify-center gap-4">
                                    <Button href="" variant="default" size="lg">Support Me</Button>
                                    <Button href="/dashboard" variant="outline" size="lg">WhoCares&trade;</Button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>