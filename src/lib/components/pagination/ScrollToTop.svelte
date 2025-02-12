<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let lastScrollY = 0;
	let isVisible = $state(false);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		isVisible = currentScrollY > lastScrollY && currentScrollY > 50;
		lastScrollY = currentScrollY;
	};
</script>

<svelte:window onscroll={handleScroll} />

<Button
	aria-label="Scroll to top"
	on:click={() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}}
	class={`fixed bottom-4 right-4 flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-[#19191c] text-white shadow-lg transition-all duration-300 dark:bg-[#e6e6e3] dark:text-black ${
		isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
	} md:hidden`}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
		class="h-6 w-6"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7-7-7 7" />
	</svg>
</Button>
