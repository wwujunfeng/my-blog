<template>
  <section id="portfolio" class="section">
    <div class="container">
      <div v-if="!allImagesLoaded" class="portfolio-loading">
        <div class="loading-spinner"></div>
        <p>正在加载图片...</p>
      </div>
      <div class="section-header">
        <h2 class="section-title">我的作品集</h2>
        <div class="line"></div>
      </div>
      <div class="portfolio-filter">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="3d">3D渲染</button>
        <button class="filter-btn" data-filter="product">产品设计</button>
        <button class="filter-btn" data-filter="animation">动画制作</button>
        <button class="filter-btn" data-filter="graphic">平面设计</button>
      </div>
      <div class="portfolio-grid">
        <div class="portfolio-item animate-on-scroll" data-category="3d"
          @click="openPreview('zdcfj', '吹风机', '3D渲染', 'img')">
          <img src="../assets/portfolio/zdcfj/zdcfj_1.webp" alt="吹风机">
          <div class="portfolio-overlay">
            <h4>吹风机</h4>
            <span>3D渲染</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="3d"
          @click="openPreview('jsqc', '健身用品', '3D渲染', 'img')">
          <img src="../assets/portfolio/jsqc/jsqc_1.webp" alt="健身用品">
          <div class="portfolio-overlay">
            <h4>健身用品</h4>
            <span>3D渲染</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="3d"
          @click="openPreview('hbc', '滑板车', '3D渲染', 'img')">
          <img src="../assets/portfolio/hbc/hbc_1.webp" alt="滑板车">
          <div class="portfolio-overlay">
            <h4>滑板车</h4>
            <span>3D渲染</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="animation"
          @click="openPreview('cfj', '动画短片', '动画制作', 'video')">
          <img src="../assets/portfolio/cfj.webp" alt="动画短片">
          <div class="portfolio-overlay">
            <h4>动画短片</h4>
            <span>动画制作</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="animation"
          @click="openPreview('qp', '动画短片', '动画制作', 'video')">
          <img src="../assets/portfolio/qp.webp" alt="动画短片">
          <div class="portfolio-overlay">
            <h4>动画短片</h4>
            <span>动画制作</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="animation"
          @click="openPreview('kqzg', '动画短片', '动画制作', 'video')">
          <img src="../assets/portfolio/kqzg.webp" alt="动画短片">
          <div class="portfolio-overlay">
            <h4>动画短片</h4>
            <span>动画制作</span>
          </div>
        </div>
                <div class="portfolio-item animate-on-scroll" data-category="product"
          @click="openPreview('prodectDesign_1', '产品设计', '产品设计', 'img')">
          <img src="../assets/portfolio/prodectDesign_1.webp" alt="产品设计">
          <div class="portfolio-overlay">
            <h4>产品设计</h4>
            <span>产品设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="product"
          @click="openPreview('prodectDesign_3', '产品设计', '产品设计', 'img')">
          <img src="../assets/portfolio/prodectDesign_3.webp" alt="产品设计">
          <div class="portfolio-overlay">
            <h4>产品设计</h4>
            <span>产品设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="graphic"
          @click="openPreview('rili', '日历', '平面设计', 'img')">
          <img src="../assets/portfolio/rili/rili_2.webp" alt="日历">
          <div class="portfolio-overlay">
            <h4>日历</h4>
            <span>平面设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="graphic"
          @click="openPreview('bz', '包装', '平面设计', 'img')">
          <img src="../assets/portfolio/bz/bz_1.webp" alt="包装">
          <div class="portfolio-overlay">
            <h4>包装</h4>
            <span>平面设计</span>
          </div>
        </div>

      </div>
    </div>

    <div v-if="showPreview" class="preview-modal" @click="closePreview">
      <div class="preview-content" @click.stop>
        <button class="preview-close mobile-only" @click="closePreview">&times;</button>
        <video v-if="previewType === 'video'" :src="previewVideo" controls autoplay muted loop>
          您的浏览器不支持视频播放。
        </video>
        <div v-else class="image-carousel">
          <button v-if="imageList.length > 1" class="carousel-btn prev-btn" @click="prevImage">&#10094;</button>
          <img :src="previewImage" :alt="previewTitle">
          <button v-if="imageList.length > 1" class="carousel-btn next-btn" @click="nextImage">&#10095;</button>
        </div>
        <div v-if="imageList.length > 1" class="carousel-indicators">
          <span v-for="(img, index) in imageList" :key="index"
            :class="['indicator', { active: index === currentImageIndex }]"
            @click="currentImageIndex = index; previewImage = imageList[index]"></span>
        </div>
        <h3>{{ previewTitle }}</h3>
        <p>{{ previewCategory }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Portfolio',
  data() {
    return {
      showPreview: false,
      previewImage: '',
      previewVideo: '',
      previewTitle: '',
      previewCategory: '',
      previewType: 'image',
      imageList: [],
      currentImageIndex: 0,
      touchStartX: 0,
      touchEndX: 0,
      allImagesLoaded: false
    }
  },
  async mounted() {
    this.initFilterButtons()
    this.initDefaultFilter()
    await this.preloadAllImages()
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('touchstart', this.handleTouchStart)
    document.addEventListener('touchend', this.handleTouchEnd)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchend', this.handleTouchEnd)
  },
  methods: {
    async preloadAllImages() {
      const imageModules = import.meta.glob('../assets/portfolio/**/*.{jpg,jpeg,png,gif,webp}')
      const imageUrls = new Set()
      
      for (const path in imageModules) {
        const module = await imageModules[path]()
        imageUrls.add(module.default)
      }
      
      const loadPromises = Array.from(imageUrls).map(url => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = url
        })
      })
      
      await Promise.all(loadPromises)
      this.allImagesLoaded = true
    },
    handleKeydown(e) {
      if (e.key === 'Escape' && this.showPreview) {
        this.closePreview()
      }
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX
      this.handleSwipe()
    },
    handleSwipe() {
      if (!this.showPreview || this.imageList.length <= 1) return
      const swipeThreshold = 50
      const diff = this.touchStartX - this.touchEndX
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.nextImage()
        } else {
          this.prevImage()
        }
      }
    },
    initDefaultFilter() {
      const filterBtns = document.querySelectorAll('.filter-btn')
      const portfolioItems = document.querySelectorAll('.portfolio-item')

      filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === 'all') {
          btn.classList.add('active')
        } else {
          btn.classList.remove('active')
        }
      })

      portfolioItems.forEach(item => {
        item.style.display = 'block'
      })
    },
    initFilterButtons() {
      const filterBtns = document.querySelectorAll('.filter-btn')
      const portfolioItems = document.querySelectorAll('.portfolio-item')

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'))
          btn.classList.add('active')

          const filter = btn.getAttribute('data-filter')

          portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block'
            } else {
              item.style.display = 'none'
            }
          })
        })
      })
    },
    async openPreview(itemName, title, category, type = 'image') {
      this.previewTitle = title
      this.previewCategory = category
      this.previewType = type

      const cosBaseUrl = 'https://blog-1408692413.cos.ap-shanghai.myqcloud.com/videos'

      if (type === 'video') {
        this.previewVideo = `${cosBaseUrl}/${itemName}.mp4`
      } else {
        try {
          const imageModules = import.meta.glob('../assets/portfolio/**/*.{jpg,jpeg,png,gif,webp}')
          const folderImages = []
          const nameImages = []

          for (const path in imageModules) {
            if (path.includes(`portfolio/${itemName}/`)) {
              const module = await imageModules[path]()
              folderImages.push(module.default)
            } else if (new RegExp(`portfolio/${itemName}\\\.[jpg|jpeg|png|gif|webp]`).test(path)) {
              const module = await imageModules[path]()
              nameImages.push(module.default)
            }
          }

          if (folderImages.length > 0) {
            folderImages.sort()
            this.imageList = folderImages
            this.currentImageIndex = 0
            this.previewImage = this.imageList[0]
          } else if (nameImages.length > 0) {
            this.imageList = nameImages
            this.currentImageIndex = 0
            this.previewImage = this.imageList[0]
          } else {
            this.previewImage = new URL(`../assets/portfolio/${itemName}.webp`, import.meta.url).href
            this.imageList = [this.previewImage]
          }
        } catch (error) {
          this.previewImage = new URL(`../assets/portfolio/${itemName}.webp`, import.meta.url).href
          this.imageList = [this.previewImage]
        }
      }

      this.showPreview = true
      document.body.style.overflow = 'hidden'
    },
    closePreview() {
      this.showPreview = false
      this.previewImage = ''
      this.previewVideo = ''
      this.previewTitle = ''
      this.previewCategory = ''
      this.previewType = 'image'
      this.imageList = []
      this.currentImageIndex = 0
      document.body.style.overflow = ''
    },
    prevImage() {
      if (this.imageList.length > 0) {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.imageList.length) % this.imageList.length
        this.previewImage = this.imageList[this.currentImageIndex]
      }
    },
    nextImage() {
      if (this.imageList.length > 0) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageList.length
        this.previewImage = this.imageList[this.currentImageIndex]
      }
    }
  }
}
</script>

<style scoped>
.portfolio-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.portfolio-loading .loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.preview-content {
  background: var(--bg-secondary);
  padding: 20px;
  border-radius: 10px;
  max-width: 95vw;
  max-height: 95vh;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.preview-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 5px;
}

.image-carousel {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition-fast);
  z-index: 5;
  opacity: 0;
  visibility: hidden;
}

.image-carousel:hover .carousel-btn {
  opacity: 1;
  visibility: visible;
}

.carousel-btn:hover {
  background: var(--accent-color);
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}

.carousel-indicators {
  display: flex;
  gap: 8px;
  justify-content: center;
  z-index: 5;
  margin: 10px 0;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: var(--transition-fast);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

.indicator.active {
  background: var(--accent-color);
  width: 12px;
  height: 12px;
}

.preview-content video {
  width: 100%;
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 5px;
}

.preview-content h3 {
  margin: 10px 0 5px;
  color: var(--text-primary);
  font-size: 24px;
  text-align: center;
}

.preview-content p {
  color: var(--accent-color);
  margin: 0 0 10px;
  font-size: 14px;
  text-align: center;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
    border: none;
    background: var(--bg-tertiary);
    border-radius: 50%;
    cursor: pointer;
    font-size: 22px;
    color: var(--text-primary);
    justify-content: center;
    align-items: center;
    z-index: 10;
    line-height: 32px;
    padding: 0;
  }

  .preview-content {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .preview-content img {
    max-height: 90vh;
  }

  .preview-content video {
    max-height: 90vh;
  }

  .preview-content h3 {
    font-size: 18px;
    margin: 5px 0;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .prev-btn {
    left: 10px;
  }

  .next-btn {
    right: 10px;
  }

  .indicator {
    width: 8px;
    height: 8px;
  }

  .indicator.active {
    width: 10px;
    height: 10px;
  }
}
</style>
