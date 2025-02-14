<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme.svelte';
	import { selectedCategory } from '../../../routes/store';

	interface Props {
		currentPage: number;
		totalPages: number;
		selectedFilter?: string;
	}

	let { currentPage, totalPages, selectedFilter = 'popular' }: Props = $props();

	const generatePaginationLink = (pageNumber: number | string): string => {
		const url = new URL(page.url.href);
		const params = url.searchParams;
		params.set('page', pageNumber.toString());

		if (params.has('category')) {
			params.set('category', $selectedCategory);
		}

		return `${url.pathname}?${params.toString()}`;
	};

	const getVisiblePages = (currentPage: number, totalPages: number) => {
		const visiblePages: (number | string)[] = [];
		const firstPage = 1;
		const lastPage = totalPages;

		if (currentPage > 2) visiblePages.push(firstPage, '...');
		for (
			let i = Math.max(firstPage, currentPage - 1);
			i <= Math.min(lastPage, currentPage + 2);
			i++
		) {
			visiblePages.push(i);
		}

		if (currentPage < totalPages - 2) visiblePages.push('...');

		if (visiblePages.length > 5 && currentPage === totalPages) {
			visiblePages.splice(1, 1);
		}

		return visiblePages;
	};
</script>

<div class="pagination-container">
	<!-- Previous Button -->

	<a
		href={generatePaginationLink(currentPage - 1)}
		class:disabled={currentPage === 1}
		data-sveltekit-preload-data="hover"
		class="pagination-button"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12.7074 5.29289C13.0979 5.68342 13.0979 6.31658 12.7074 6.70711L9.41452 10L12.7074 13.2929C13.0979 13.6834 13.0979 14.3166 12.7074 14.7071C12.3169 15.0976 11.6837 15.0976 11.2932 14.7071L7.2932 10.7071C6.90267 10.3166 6.90267 9.68342 7.2932 9.29289L11.2932 5.29289C11.6837 4.90237 12.3169 4.90237 12.7074 5.29289Z"
				fill={theme.isDarkTheme() ? '#A3A3A0' : '#56565C'}
			/>
		</svg>
		Previous
	</a>

	<!-- Page Numbers -->
	{#each getVisiblePages(currentPage, totalPages) as page}
		{#if page === '...'}
			<div class="pagination-ellipsis">...</div>
		{:else}
			<a
				href={generatePaginationLink(page)}
				class="pagination-number"
				data-sveltekit-preload-data="hover"
				class:current-page={currentPage === page}
			>
				{page}
			</a>
		{/if}
	{/each}

	<!-- Next Button -->
	<a
		href={generatePaginationLink(currentPage + 1)}
		class:disabled={currentPage === totalPages}
		data-sveltekit-preload-data="hover"
		class="pagination-button next"
	>
		Next
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M7.2932 14.7071C6.90267 14.3166 6.90267 13.6834 7.2932 13.2929L10.5861 10L7.2932 6.70711C6.90267 6.31658 6.90267 5.68342 7.2932 5.29289C7.68372 4.90237 8.31689 4.90237 8.70741 5.29289L12.7074 9.29289C13.0979 9.68342 13.0979 10.3166 12.7074 10.7071L8.70741 14.7071C8.31689 15.0976 7.68372 15.0976 7.2932 14.7071Z"
				fill={theme.isDarkTheme() ? '#A3A3A0' : '#56565C'}
			/>
		</svg>
	</a>
</div>

<style lang="scss">
	.pagination-container {
		width: 100%;
		margin-top: 15px;
		margin-bottom: 60px;
		align-self: center;
		display: inline-flex;
		align-items: flex-start;
		justify-content: center;
		gap: var(--space-2, 4px);
	}

	.pagination-button {
		gap: 4px;
		display: flex;
		height: 32px;
		border: none;
		cursor: pointer;
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		align-items: center;
		justify-content: center;
		color: #19191c;
		padding: var(--space-3, 6px) var(--space-4, 8px);

		@media (max-width: 768px) {
			&.next {
				margin-right: 2rem;
			}
		}
	}

	:global(html.dark) .pagination-button {
		color: #e6e6e3;
	}

	.pagination-button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.pagination-number {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 32px;
		padding: var(--space-3, 6px);
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		text-align: center;
		cursor: pointer;
		border-radius: var(--border-radius-S, 8px);
	}

	:global(html.dark) .pagination-number {
		color: #a3a3a0;
	}

	.pagination-number.current-page {
		color: #19191c;
		background: var(--color-bgColor-neutral-tertiary, #ededf0);
	}

	:global(html.dark) .pagination-number.current-page {
		background: #333333;
		color: #e6e6e3;
	}

	.pagination-ellipsis {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: var(--neutral-60, #a0a0a0);
		height: 32px;
		width: 32px;
	}

	:global(html.dark) .pagination-ellipsis {
		color: #707070;
	}
</style>
