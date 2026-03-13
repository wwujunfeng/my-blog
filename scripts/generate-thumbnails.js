import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, dirname, basename, extname } from 'path'

const THUMBNAIL_WIDTH = 400
const THUMBNAIL_QUALITY = 80
const portfolioDir = './src/assets/portfolio'
const thumbnailDir = './src/assets/portfolio/thumbnails'

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true })
  } catch (e) {}
}

async function createThumbnail(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(THUMBNAIL_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: THUMBNAIL_QUALITY })
      .toFile(outputPath)
    
    const inputSize = (await stat(inputPath)).size
    const outputSize = (await stat(outputPath)).size
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1)
    
    console.log(`✓ ${basename(inputPath)} -> ${basename(outputPath)} (${reduction}% smaller)`)
    return true
  } catch (error) {
    console.error(`✗ Failed: ${inputPath} - ${error.message}`)
    return false
  }
}

async function processDirectory(dir, thumbDir) {
  const entries = await readdir(dir, { withFileTypes: true })
  let count = 0
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const thumbPath = join(thumbDir, entry.name.replace(extname(entry.name), '.webp'))
    
    if (entry.isDirectory()) {
      count += await processDirectory(fullPath, join(thumbDir, entry.name))
      continue
    }
    
    const ext = extname(entry.name).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      continue
    }
    
    const success = await createThumbnail(fullPath, thumbPath)
    if (success) count++
  }
  
  return count
}

async function main() {
  console.log('Generating thumbnails...\n')
  console.log(`Thumbnail width: ${THUMBNAIL_WIDTH}px`)
  console.log(`Quality: ${THUMBNAIL_QUALITY}%\n`)
  
  await ensureDir(thumbnailDir)
  
  const entries = await readdir(portfolioDir, { withFileTypes: true })
  let totalCount = 0
  
  for (const entry of entries) {
    const fullPath = join(portfolioDir, entry.name)
    
    if (entry.isDirectory()) {
      if (entry.name === 'thumbnails') continue
      
      await ensureDir(join(thumbnailDir, entry.name))
      console.log(`\nProcessing folder: ${entry.name}/`)
      const count = await processDirectory(fullPath, join(thumbnailDir, entry.name))
      totalCount += count
    } else {
      const ext = extname(entry.name).toLowerCase()
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue
      
      const thumbPath = join(thumbnailDir, entry.name.replace(ext, '.webp'))
      const success = await createThumbnail(fullPath, thumbPath)
      if (success) totalCount++
    }
  }
  
  console.log(`\n-----------------------------------`)
  console.log(`Total thumbnails: ${totalCount}`)
  console.log(`Output directory: ${thumbnailDir}`)
  console.log('-----------------------------------')
}

main().catch(console.error)
