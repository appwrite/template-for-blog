import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const name = 'Blog';
export const title = 'Blog template';
export const description =
	'A modern template designed for a blog with a mobile-friendly interface & customizable theme.';

export const BLOG_POSTS_PER_PAGE = 12;

export const selectedCategory = derived(
	page,
	($page) => $page.url.searchParams.get('category') || 'All stories'
);

export const currentPage = derived(
	page,
	($page) => Number($page.url.searchParams.get('page')) || 1
);

export const totalPages = derived(page, ($page) => Number($page.data.totalPages || 1));
