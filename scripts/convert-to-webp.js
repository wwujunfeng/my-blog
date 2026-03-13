import sharp from 'sharp'
import { readdir, stat, unlink } from 'fs/promises'
import { join, extname, parse } from 'path'

const portfolioDir = './src/assets/portfolio'

async function convertToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
    
    const inputSize = (await stat(inputPath)).size
    const outputSize = (await stat(outputPath)).size
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1)
    
    console.log(`✓ ${parse(inputPath).base} -> ${parse(outputPath).base} (${reduction}% smaller)`)
    return true
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}: ${error.message}`)
    return false
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = { converted: 0, failed: 0, skipped: 0, totalSaved: 0 }
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    
    if (entry.isDirectory()) {
      const subResults = await processDirectory(fullPath)
      results.converted += subResults.converted
      results.failed += subResults.failed
      results.skipped += subResults.skipped
      results.totalSaved += subResults.totalSaved
      continue
    }
    
    const ext = extname(entry.name).toLowerCase()
    
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      results.skipped++
      continue
    }
    
    const parsed = parse(fullPath)
    const outputPath = join(parsed.dir, `${parsed.name}.webp`)
    
    const inputSize = (await stat(fullPath)).size
    const success = await convertToWebp(fullPath, outputPath)
    
    if (success) {
      results.converted++
      const outputSize = (await stat(outputPath)).size
      results.totalSaved += inputSize - outputSize
      
      await unlink(fullPath)
      console.log(`  Deleted original: ${entry.name}`)
    } else {
      results.failed++
    }
  }
  
  return results
}

async function main() {
  console.log('Starting image conversion to WebP...\n')
  console.log('Portfolio directory:', portfolioDir)
  console.log('-----------------------------------\n')
  
  const results = await processDirectory(portfolioDir)
  
  console.log('\n-----------------------------------')
  console.log('Conversion Summary:')
  console.log(`  Converted: ${results.converted} images`)
  console.log(`  Failed: ${results.failed} images`)
  console.log(`  Skipped: ${results.skipped} files`)
  console.log(`  Total saved: ${(results.totalSaved / 1024 / 1024).toFixed(2)} MB`)
  console.log('-----------------------------------')
}

main().catch(console.error)
