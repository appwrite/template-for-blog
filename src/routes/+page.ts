export const load = async ({ parent }) => {
	const { authors, blogPosts, featuredPost, featuredPostAuthor, origin, allBlogPosts, totalPages } =
		await parent();

	return {
		origin,
		authors,
		blogPosts,
		featuredPost,
		featuredPostAuthor
	};
};
