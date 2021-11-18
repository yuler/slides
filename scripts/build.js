import path from 'node:path'
import fs from 'node:fs'
import {fileURLToPath} from 'node:url'
import {execa} from 'execa'

const target = 'slides'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const folder = path.resolve(root, target)
const dist = path.resolve(root, 'dist')
const slides = fs.readdirSync(folder)

// Build slides
for (const slide of slides) {
	const entry = path.resolve(folder, slide, 'slides.md')
	// TODO: Concurrent build
	try {
		await execa('slidev', [
			'build',
			entry,
			'--out',
			path.resolve(dist, slide),
			'--base',
			`/${slide}/`,
		])
	} catch (error) {
		process.stderr.write(error.stderr)
	}
}
