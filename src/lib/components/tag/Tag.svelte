<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		text: string;
		selected: boolean;
	}

	let { text, selected }: Props = $props();

	const generateLink = (category: string) => {
		let url = new URL(page.url.origin);
		const params = url.searchParams;
		params.set('category', category);
		return `${url.pathname}?${params.toString()}`;
	};
</script>

<a
	href={generateLink(text)}
	data-sveltekit-noscroll
	class="flex items-center justify-center gap-1.5 rounded-[6px] border border-[#EDEDF0] px-2.5 py-1.5 font-inter text-sm
           font-medium leading-[140%] tracking-[-0.063px] text-[#56565C] transition-all duration-100 ease-in-out data-[selected=true]:border-[#818186]
           dark:border-neutral-800 dark:text-[#A3A3A0] data-[selected=true]:dark:border-neutral-500"
	data-selected={selected}
>
	<span class="whitespace-nowrap">{text}</span>
</a>
