<script lang="ts">
	import { page } from '$app/state';
	import { socials } from '../utils/socials';

	function getMessage(): string {
		switch (page.status) {
			case 404:
				return "Sorry, we can't find the page you’re looking for.";
			case 500:
				return 'Internal Server Error. Please try again later.';
			case 503:
				return 'Service Unavailable. Please try again later.';
			default:
				return 'An unknown error occurred. Please try again.';
		}
	}

	function getButtonLabel(): string {
		switch (page.status) {
			default:
			case 404:
				return 'Continue reading';
			case 500:
			case 503:
				return 'Contact support';
		}
	}

	function getButtonLink(): string {
		switch (page.status) {
			case 500:
			case 503: {
				return socials.find((item) => item.label === 'Discord')?.link ?? '';
			}
			default:
				return '/';
		}
	}

	function getButtonTarget(): string {
		switch (page.status) {
			case 500:
			case 503: {
				return '_blank';
			}
			default:
				return '_self';
		}
	}
</script>

<div class="mt-[210px] flex flex-col items-center gap-5 px-8 text-center md:px-0">
	<div class="flex max-w-[500px] flex-col gap-2">
		<p
			class="font-inter text-[16px] font-normal leading-[140%] tracking-[-0.16px] text-[#56565C] dark:text-[#A3A3A0]"
		>
			{page.status}
		</p>

		<h3
			class="m-0 font-inter text-[32px] font-normal leading-[34px] tracking-[-0.32px] text-[#19191C] dark:text-[#e6e6e3] sm:font-inter sm:text-[40px] sm:leading-[44px] sm:tracking-[-0.4px]"
		>
			{getMessage()}
		</h3>
	</div>

	<a
		class="mt-4 w-fit items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 font-inter text-[16px] font-medium leading-[22px] tracking-[-0.072px] text-white"
		href={getButtonLink()}
		target={getButtonTarget()}
	>
		{getButtonLabel()}
	</a>
</div>
