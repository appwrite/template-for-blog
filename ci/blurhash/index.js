import fs from 'fs';
import sharp from 'sharp';
import { encode } from 'blurhash';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { createPngDataUri } from 'unlazy/blurhash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate hash from image
async function generateBlurHash(imagePath) {
	try {
		const image = await sharp(imagePath).raw().ensureAlpha();

		const { info } = await image.toBuffer({ resolveWithObject: true });

		let width = info.width;
		let height = info.height;

		const maxSize = 320;
		if (width > maxSize || height > maxSize) {
			const ratio = width / maxSize;
			width = Math.floor(width / ratio);
			height = Math.floor(height / ratio);
		}

		image.resize({
			width,
			height
		});

		const { data } = await image.toBuffer({ resolveWithObject: true });

		return encode(data, width, height, 4, 3);
	} catch (error) {
		console.error(`Error generating Blurhash for ${imagePath}:`, error);
		throw error;
	}
}

// Render hash to blurred image
export default function renderBlurHash(hash) {
	return createPngDataUri(hash, { ratio: 4 / 3 });
}

(async () => {
	console.log('Blurhash generation started');

	const basePath = path.join(__dirname, '../../static/images/posts');
	const datasetPath = path.join(__dirname, '../../src/lib/blurhash.json');

	// Check if dataset file exists; create it if it doesn't
	if (!fs.existsSync(datasetPath)) {
		fs.writeFileSync(datasetPath, '{}');
	}
	const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

	const files = fs
		.readdirSync(basePath)
		.filter((file) => !dataset[file])
		.filter((file) => !file.endsWith('.blurhash.txt'))
		.filter((file) => file !== '.DS_Store');

	console.log(`Found ${files.length} unprocessed files`);

	if (files.length === 0) {
		console.log('No new files to process. Exiting.');
		return;
	}

	const tasks = files.map((file) => async () => {
		const imagePath = path.join(basePath, file);
		try {
			const hash = await generateBlurHash(imagePath);
			dataset[file] = renderBlurHash(hash);

			fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 4));
			console.log(`Blurhash generated for: ${file}`);
		} catch (error) {
			console.error(`Failed to process ${file}:`, error);
		}
	});

	await Promise.all(tasks.map((task) => task()));

	console.log('Blurhash dataset updated:', datasetPath);
	console.log('Blurhash generation finished');
})();
