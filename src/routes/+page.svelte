<script lang="ts">
	import { description as storeDescription, name, title as storeTitle } from './store';
	import CategoryTags from '$lib/components/tag/CategoryTags.svelte';
	import Blog from '$lib/components/blog/Blog.svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	const title = name + ' | ' + storeTitle;
	const description = storeDescription;
	const ogImage = `${data.origin}/thumbnail.png`;

	const authors = data.authors ? data.authors : [];
	const blogPosts = $derived(data.blogPosts ? data.blogPosts : []);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />

	<!-- Description -->
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<!-- Image -->
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<CategoryTags
	categories={['Travel', 'Tech', 'Hacks', 'Wellness', 'Business', 'Design', 'Trends']}
/>

{#if blogPosts.length > 0}
	<Blog {blogPosts} {authors} />
{:else}
	<p class="mt-12 min-h-[125px] text-center text-gray-500">
		No blog posts found for this category.
	</p>
{/if}
