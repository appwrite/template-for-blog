<script lang="ts">
	import { type Author, type BlogPost } from '../../../utils/blog';
	import { formatDate } from '../../../utils/dates.js';

	interface Props {
		author: Author;
		featuredBlogPost: BlogPost;
	}

	let { author, featuredBlogPost }: Props = $props();
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

<div
	class="mb-16 mt-[54px] flex w-full max-w-[1200px] flex-col gap-8 px-5 xl:ms-[120px] xl:px-0 2xl:mx-auto"
>
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<h2
			class="text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C] dark:text-[#e6e6e3]"
		>
			Blog
		</h2>
	</div>

	<div class="flex h-auto flex-col items-start gap-8 rounded-2xl py-3 backdrop-blur-lg lg:flex-row">
		<div class="relative w-full md:w-auto">
			<div
				class="absolute inset-0 h-[225px] rounded-lg bg-cover bg-center transition-opacity duration-500 md:h-auto lg:h-[396px]"
				style="background-image: url({featuredBlogPost.blurhash}); opacity: {loaded ? 0 : 1};"
			></div>

			<img
				bind:this={imgEl}
				class="h-[225px] w-full rounded-lg bg-gray-300 bg-cover object-cover md:h-auto lg:h-[396px]"
				src={featuredBlogPost.coverImage}
				alt={featuredBlogPost.title}
				height="225px"
				style={`view-transition-name: cover-image-${featuredBlogPost.slug}; opacity: ${loaded ? 1 : 0};`}
			/>
		</div>

		<div class="flex flex-1 flex-col gap-4 self-stretch">
			<div class="flex flex-col gap-4 sm:flex-col-reverse">
				<span
					class="font-inter text-[14px] leading-[22px] tracking-[-0.063px] text-[#56565C] dark:text-[#A3A3A0]"
				>
					{formatDate(featuredBlogPost.date)} • {featuredBlogPost.timeToRead} min
				</span>

				<h3
					class="m-0 font-inter text-[32px] font-normal leading-[34px] tracking-[-0.32px] text-[#19191C] dark:text-[#e6e6e3] sm:font-inter sm:text-[40px] sm:leading-[44px] sm:tracking-[-0.4px]"
				>
					{featuredBlogPost.title}
				</h3>
			</div>

			<span
				class="font-inter text-[16px] leading-[22px] tracking-[-0.072px] text-[#56565C] dark:text-[#A3A3A0]"
			>
				{featuredBlogPost.description}
			</span>
			<div class="flex items-center gap-2">
				<img class="m-0" src={author.avatar} height="24px" width="24px" alt={author.name} />

				<span
					class="font-inter text-[14px] leading-[22px] tracking-[-0.063px] text-[#19191C] dark:text-[#e6e6e3]"
				>
					{author.name}
				</span>
			</div>
			<a
				class="mt-4 w-fit items-center justify-center gap-2 rounded-lg bg-black p-[9px_14px] py-2 font-inter text-[16px] font-medium leading-[22px] tracking-[-0.072px] text-white"
				href={featuredBlogPost.slug}
			>
				Read article
			</a>
		</div>
	</div>
</div>
