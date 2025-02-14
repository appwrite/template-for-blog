<script>
	import { page } from '$app/state';
</script>

<div class="bg-white dark:bg-[#101010]">
	<div class="border-b-[1px] border-[#EDEDF0] p-[16px_20px] dark:border-neutral-800">
		<!-- Blog Logo -->
		<div class="flex items-center gap-4 xl:ms-[120px]">
			<a href="/">
				<img src="/logo.svg" alt="Logo" height="40px" width="40px" />
			</a>
			<a class="text-xl text-[#19191C] dark:text-[#e6e6e3]" href="/">Blog</a>
		</div>
	</div>

	{#if page.route.id === '/'}
		<slot />
	{/if}
</div>
