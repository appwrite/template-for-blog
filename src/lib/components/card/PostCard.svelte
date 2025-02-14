<script lang="ts">
	import { type Author, type BlogPost } from '../../../utils/blog';
	import { formatDate } from '../../../utils/dates';

	interface Props {
		author: Author;
		blogPost: BlogPost;
	}

	let { author, blogPost }: Props = $props();

	let loaded = $state(false);
	let imgEl = $state<HTMLImageElement>();
	$effect(() => {
		const img = imgEl;
		if (!img) return;

		if (img.complete) {
			loaded = true;
			return;
		}

		// Otherwise wait for load event
		const handleLoad = () => (loaded = true);

		img.addEventListener('load', handleLoad);

		// Cleanup function
		return () => img.removeEventListener('load', handleLoad);
	});
</script>

<a
	href={blogPost.slug}
	class="flex flex-col items-center gap-6 rounded-2xl border border-[#f4f4f7] bg-white p-3 dark:border-[#2c2c2f] dark:bg-[#1b1b1b]"
>
	<div class="relative w-full">
		<div
			class="md:h-min-[210px] absolute inset-0 h-[190px] min-h-[190px] rounded-lg bg-cover bg-center transition-opacity duration-500 md:h-[210px]"
			style="background-image: url({blogPost.blurhash}); opacity: {loaded ? 0 : 1};"
		></div>

		<!-- Main Image (with fade-in transition) -->
		<img
			bind:this={imgEl}
			class="md:h-min-[210px] h-[190px] min-h-[190px] w-full self-stretch rounded-lg bg-cover object-cover transition-opacity duration-500 md:h-[210px]"
			src={blogPost.coverImage}
			alt={blogPost.title}
			loading="lazy"
			height="210px"
			style={`view-transition-name: cover-image-${blogPost.slug}; opacity: ${loaded ? 1 : 0};`}
		/>
	</div>

	<div class="flex w-full flex-col p-0 px-[6px] pb-[6px]">
		<div class="flex flex-col gap-0.5 md:gap-2">
			<span
				class="font-inter text-[14px] leading-[22px] tracking-[-0.063px] text-[#56565C] dark:text-[#A3A3A0]"
			>
				{formatDate(blogPost.date)} • {blogPost.timeToRead} min
			</span>
			<h2
				class="font-inter text-[24px] font-normal leading-[28px] text-[#19191C] dark:text-[#e6e6e3]"
			>
				{blogPost.title}
			</h2>
		</div>

		<div class="mt-4 flex items-center gap-2">
			<img class="m-0" src={author.avatar} height="24px" width="24px" alt={author.name} />

			<span
				class="font-inter text-[14px] leading-[22px] tracking-[-0.063px] text-[#19191C] dark:text-[#e6e6e3]"
			>
				{author.name}
			</span>
		</div>
	</div>
</a>
