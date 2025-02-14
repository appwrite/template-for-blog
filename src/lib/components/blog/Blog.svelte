<script lang="ts">
	import { type Author, authors, type BlogPost } from '../../../utils/blog';
	import PostCard from '$lib/components/card/PostCard.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import { currentPage, totalPages } from '../../../routes/store';

	interface Props {
		authors: Author[];
		blogPosts: BlogPost[];
	}

	let { blogPosts }: Props = $props();

	function getAuthorForPost(blogPost: BlogPost): Author {
		return authors.find(({ slug }) => slug === blogPost.author) as Author;
	}
</script>

<div class="flex w-full flex-col">
	<div
		class="mb-16 grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:items-center xl:mx-[120px] xl:px-0 2xl:mx-0"
	>
		{#each blogPosts as blogPost (blogPost.slug)}
			{@const author = getAuthorForPost(blogPost)}
			<PostCard {blogPost} {author} />
		{/each}
	</div>

	<!-- TODO: implement pagination -->
	<Pagination currentPage={$currentPage} totalPages={$totalPages} />
</div>
