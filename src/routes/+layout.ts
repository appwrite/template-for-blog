import { redirect } from '@sveltejs/kit';
import { type Author, authors, type BlogPost, blurHashDataset } from '../utils/blog';
import { BLOG_POSTS_PER_PAGE } from './store';

async function getPosts() {
	let blogPosts: BlogPost[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const rawMetaData = file.metadata as Record<string, unknown>;
			const metadata = rawMetaData as Omit<BlogPost, 'slug' | 'blurhash'>;
			const blurhash = blurHashDataset[metadata.coverImage.replace('/images/posts/', '')];
			const post = { ...metadata, slug, blurhash } satisfies BlogPost;

			blogPosts.push(post);
		}
	}

	blogPosts = blogPosts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return blogPosts;
}

export const load = async ({ url }) => {
	const pageParam = url.searchParams.get('page');
	const page = pageParam ? Number(pageParam) : 1;

	if (isNaN(page) || page < 1) {
		throw redirect(301, '/');
	}

	const category = url.searchParams.get('category') || 'All stories';

	let blogPosts = await getPosts();
	const featuredPost = blogPosts.find((post) => post.isFeatured) as BlogPost;
	const featuredPostAuthor = authors.find(({ slug }) => slug === featuredPost.author) as Author;

	blogPosts =
		category === 'All stories'
			? blogPosts
			: blogPosts.filter((blogPost) => blogPost.categories.includes(category));

	// remove featured from the list.
	blogPosts = blogPosts.filter((blogPost) => !blogPost.isFeatured);

	const totalPages = Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE);

	if (blogPosts.length && page > totalPages) {
		throw redirect(301, '/');
	}

	const startIndex = (page - 1) * BLOG_POSTS_PER_PAGE;
	const endIndex = startIndex + BLOG_POSTS_PER_PAGE;
	const paginatedBlogPosts: BlogPost[] = blogPosts.slice(startIndex, endIndex);

	return {
		authors,
		totalPages,
		featuredPost,
		featuredPostAuthor,
		origin: url.origin,
		allBlogPosts: blogPosts,
		blogPosts: paginatedBlogPosts
	};
};
