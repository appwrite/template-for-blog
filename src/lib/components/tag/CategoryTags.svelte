<script lang="ts">
	import Tag from '$lib/components/tag/Tag.svelte';
	import type { Category } from '../../../utils/blog';
	import { selectedCategory } from '../../../routes/store';

	let isEnd = $state(false);
	let isStart = $state(true);
	let categoriesElement: HTMLElement;

	function handleScroll() {
		const { scrollLeft, offsetWidth, scrollWidth } = categoriesElement;
		isStart = scrollLeft <= 0;
		isEnd = Math.ceil(scrollLeft + offsetWidth) >= scrollWidth;
	}

	interface Props {
		categories: Category[];
	}

	let { categories }: Props = $props();
</script>

<div
	class="mb-8 mt-[80px] flex w-full max-w-[1200px] flex-col gap-8 px-4 xl:mx-[120px] xl:px-0 2xl:mx-0
"
>
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<h2
			class="text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C] dark:text-[#e6e6e3]"
		>
			{$selectedCategory}
		</h2>
	</div>

	<div class="categories-wrapper" data-state={isStart ? 'start' : isEnd ? 'end' : 'middle'}>
		<ul class="flex gap-4 overflow-x-auto" onscroll={handleScroll} bind:this={categoriesElement}>
			<li>
				<Tag text="All stories" selected={$selectedCategory === 'All stories'} />
			</li>

			{#each categories as category}
				{@const selected = $selectedCategory === category}
				<li>
					<Tag text={category} {selected} />
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	:root {
		--web-color-background-blog: 240 11% 98%;
	}

	:global(html.dark) {
		--web-color-background-blog: 0 0% 7%;
	}

	.overflow-x-auto::-webkit-scrollbar {
		display: none;
	}

	.overflow-x-auto {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.categories-wrapper {
		position: relative;

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 0;
			width: 60px;
			height: 100%;
			transition: ease 250ms;
			z-index: 100;
			pointer-events: none;
		}

		&::before {
			left: 0;
			background: linear-gradient(to right, hsl(var(--web-color-background-blog)), transparent);
		}

		&[data-state='start']::before {
			opacity: 0;
		}

		&::after {
			right: 0;
			background: linear-gradient(to left, hsl(var(--web-color-background-blog)), transparent);
		}

		&[data-state='end']::after {
			opacity: 0;
		}
	}
</style>
