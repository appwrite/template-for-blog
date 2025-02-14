<script lang="ts">
	import { formatDate } from '../../utils/dates.js';
	import { name, title as storeTitle } from '../../routes/store';

	export let data;
	const author = data.author;
	const blogPost = data.blogPost;
	const title = name + ' | ' + storeTitle;
</script>

<!-- SEO -->
<svelte:head>
	<title>{blogPost.title}</title>

	<link rel="canonical" href={data.url} />
	<meta name="description" content={blogPost.description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={data.url} />
	<meta property="og:title" content={blogPost.title} />
	<meta property="og:description" content={blogPost.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={blogPost.coverImage} />

	<meta name="twitter:site" content="@YouTwitterHandle" />
	<meta name="twitter:creator" content="@YouTwitterHandle" />
	<meta name="twitter:title" content={blogPost.title} />
	<meta name="twitter:description" content={blogPost.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={blogPost.coverImage} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<article
	class="prose mx-auto my-16 flex max-w-full flex-col gap-8 px-5 before:prose-p:content-none after:prose-p:content-none xl:px-0"
>
	<img
		class="mx-auto my-0 block h-[210px] w-full rounded-xl bg-cover object-cover md:h-[500px] md:w-[1200px]"
		src={blogPost.coverImage}
		alt={blogPost.title}
		style={`view-transition-name: cover-image-${blogPost.slug}`}
	/>

	<div class="post-meta mx-auto flex w-full max-w-[790px] flex-col gap-6">
		<div class="flex flex-col gap-2">
			<span
				class="font-inter text-[14px] leading-[22px] tracking-[-0.063px] text-[#56565C] dark:text-[#A3A3A0]"
			>
				{formatDate(blogPost.date)} • {blogPost.timeToRead} min read
			</span>

			<h3
				class="m-0 font-inter text-[32px] font-normal leading-[34px] tracking-[-0.32px] text-[#19191C] dark:text-[#e6e6e3] sm:font-inter sm:text-[40px] sm:leading-[44px] sm:tracking-[-0.4px]"
			>
				{blogPost.title}
			</h3>

			<span
				class="mt-2 font-inter text-[16px] leading-[22px] tracking-[-0.072px] text-[#56565C] dark:text-[#A3A3A0]"
			>
				{blogPost.description}
			</span>
		</div>

		<div class="flex items-center gap-2">
			<img class="m-0" src={author.avatar} height="44px" width="44px" alt={author.name} />
			<div class="flex flex-col font-inter font-normal">
				<span
					class="text-[16px] leading-[22px] tracking-[-0.072px;] text-[#19191C] dark:text-[#e6e6e3]"
					>{author.name}</span
				>
				<span class="text-[14px] leading-[22px] tracking-[-0.063px] text-[#ADADB0]"
					>{author.role}</span
				>
			</div>
		</div>

		<span class="border-b border-[#E4E4E7] dark:border-neutral-800"> </span>
	</div>

	<div class="post-content mx-auto w-full max-w-[790px]">
		<svelte:component this={data.content} />
	</div>
</article>

<style lang="scss">
	:root {
		--heading-color: #19191c;
		--paragraph-color: #56565c;
		--image-border-color: #e4e4e7;
		--list-item-content-color: #818185;
		--blockquote-sideline-color: #414146;
	}

	:global(html.dark) {
		--heading-color: #e6e6e3;
		--paragraph-color: #a3a3a0;
		--image-border-color: #bdbdc4;
		--list-item-content-color: #7c7c80;
		--blockquote-sideline-color: #414146;
	}

	.post-content {
		gap: 2rem;

		:global(h2:first-of-type) {
			margin-top: unset;
		}

		:global(h2) {
			color: var(--heading-color);
			font-family: Inter, sans-serif;
			font-size: 20px;
			font-style: normal;
			font-weight: 500;
			line-height: 28px;
			letter-spacing: -0.28px;
		}

		:global(*) {
			color: var(--paragraph-color);
		}

		:global(p) {
			color: var(--paragraph-color);
			margin: unset;
			font-size: 18px;
			font-weight: 400;
			line-height: 28px;
			font-style: normal;
			letter-spacing: -0.081px;
			font-family: Inter, sans-serif;
		}

		:global(p + p) {
			margin-top: 2rem;
		}

		:global(blockquote) {
			font-style: normal;
			border-inline-start-color: var(--blockquote-sideline-color);
		}

		:global(blockquote > p:first-child) {
			color: var(--heading-color);
		}

		:global(blockquote > p:last-child) {
			color: var(--paragraph-color);
			font-size: 14px;
			font-weight: 400;
			line-height: 22px;
			font-style: normal;
			letter-spacing: -0.063px;
			font-family: Inter, sans-serif;
		}

		:global(blockquote > p:last-child:first-line) {
			color: var(--heading-color);
			font-size: 16px;
			letter-spacing: -0.072px;
		}

		:global(ul) {
			list-style: none;
			margin-left: -1rem;
			margin-top: unset;
			margin-bottom: unset;
		}

		:global(ul li::before) {
			content: '-';
			margin-right: 8px;
			color: var(--list-item-content-color);
		}

		:global(ul li),
		:global(ol li) {
			color: var(--list-item-content-color);
		}

		:global(img) {
			width: 100%;
			height: 449px;
			border: var(--image-border-color);
			border-radius: 12px;

			@media (max-width: 768px) {
				height: 210px;
			}
		}
	}
</style>
