import blurHashDatasetRaw from '$lib/blurhash.json';

export const blurHashDataset: Record<string, string> = blurHashDatasetRaw;

/**
 * Represents a blog post.
 */
export type BlogPost = {
	title: string;
	description: string;
	coverImage: string;
	categories: string[];
	author: string;
	date: string;
	timeToRead: number;
	blurhash: string;
	slug?: string;
	isFeatured?: boolean;
};

/**
 * Represents an author.
 */
export type Author = {
	slug: string;
	name: string;
	role: string;
	avatar: string;
};

/**
 * List of blog authors.
 */
export const authors: Author[] = [
	{
		slug: 'guy-hawkins',
		name: 'Guy Hawkins',
		role: 'DevRel & DX',
		avatar: '/images/authors/guy-hawkins.avif'
	}
];

/**
 * Predefined blog post categories.
 */
export type Category = 'Travel' | 'Tech' | 'Hacks' | 'Wellness' | 'Business' | 'Design' | 'Trends';

/**
 * Checks if a navigation transition is between blog-related pages.
 *
 * Handles:
 * - Grid ("/") ↔ Blog post ("/[slug]")
 * - Blog post ↔ Another blog post
 *
 * @param {string | undefined} currentPath - The current page path.
 * @param {string | undefined} targetPath - The target page path.
 * @returns {boolean} `true` if it's a valid blog transition, otherwise `false`.
 */
export const isBlogPostTransition = (
	currentPath: string | undefined,
	targetPath: string | undefined
): boolean => {
	const blogGridRegex = /^\/$/;
	const blogPostRegex = /^\/[a-z0-9-]+\/?$/;

	return (
		(blogGridRegex.test(currentPath ?? '') && blogPostRegex.test(targetPath ?? '')) ||
		(blogPostRegex.test(currentPath ?? '') && blogGridRegex.test(targetPath ?? '')) ||
		(blogPostRegex.test(currentPath ?? '') && blogPostRegex.test(targetPath ?? ''))
	);
};
