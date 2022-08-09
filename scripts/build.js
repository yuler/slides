// TODO: move `zx`

import path from 'node:path'
import fs from 'node:fs'
import {fileURLToPath} from 'node:url'
import {execa} from 'execa'

const slides = ['hi-github']

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.resolve(root, 'dist')

// Build slides
for (const slide of slides) {
	const entry = path.resolve(root, slide, 'slides.md')
	execa('slidev', [
		'build',
		entry,
		'--out',
		path.resolve(dist, slide),
		'--base',
		`${slide}`,
	]).stdout.pipe(process.stdout)
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

fs.mkdirSync(dist, {recursive: true})
fs.writeFileSync(path.resolve(dist, 'index.html'), html)
