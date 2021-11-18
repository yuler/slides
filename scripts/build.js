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

// Write `index.html` to dist
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slides</title>
</head>
<body>
    <ul>
        ${slides.map(path => `<li><a href="./${path}">${path}</a></li>`)}
    </ul>
</body>
</html>
`
fs.writeFileSync(path.resolve(dist, 'index.html'), html)
