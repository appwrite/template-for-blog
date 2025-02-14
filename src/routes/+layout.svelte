<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { theme } from '$lib/stores/theme.svelte';
	import { isBlogPostTransition } from '../utils/blog';
	import SiteHeader from '$lib/components/header/SiteHeader.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import FeaturedPostCard from '$lib/components/card/FeaturedPostCard.svelte';

	let { children, data } = $props();

	theme.init();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		const currentPath = page.url.pathname;
		const targetPath = navigation.to?.url?.pathname;

		if (!isBlogPostTransition(currentPath, targetPath)) return;

		return new Promise((resolve) =>
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			})
		);
	});

	const featuredPost = data.featuredPost;
	const featuredPostAuthor = data.featuredPostAuthor;
</script>

<SiteHeader>
	<FeaturedPostCard featuredBlogPost={featuredPost} author={featuredPostAuthor} />
</SiteHeader>

<main class="h-full 2xl:mx-auto 2xl:w-[1200px]">
	{@render children()}
</main>

<Footer />
