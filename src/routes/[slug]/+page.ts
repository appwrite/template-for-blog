import { type Author, authors, type BlogPost } from '../../utils/blog';
import { error, type ServerLoadEvent } from '@sveltejs/kit';

export async function load({ params, url }: ServerLoadEvent) {
	try {
		const post = await import(`../../posts/${params.slug}.md`);

		const metadata = post.metadata as Omit<BlogPost, 'slug'>;
		const author = authors.find(({ slug }) => slug === metadata.author) as Author;
		const blogPost = { ...metadata, slug: params.slug } satisfies BlogPost;

		return {
			author,
			blogPost: blogPost,
			origin: url.origin,
			content: post.default,
			url: url.origin + '/' + params.slug
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
