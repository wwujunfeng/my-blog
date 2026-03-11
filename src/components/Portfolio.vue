<template>
  <section id="portfolio" class="section">
    <div class="container">
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
        <div class="portfolio-item animate-on-scroll" data-category="3d" @click="openPreview('project1', '产品渲染', '3D渲染', 'video')">
          <img src="../assets/portfolio/project1.jpg" alt="产品渲染">
          <div class="portfolio-overlay">
            <h4>产品渲染</h4>
            <span>3D渲染</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="3d" @click="openPreview('project2', '角色建模', '3D渲染', 'video')">
          <img src="../assets/portfolio/project2.jpg" alt="角色建模">
          <div class="portfolio-overlay">
            <h4>角色建模</h4>
            <span>3D渲染</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="product" @click="openPreview('project3', '产品设计', '产品设计', 'video')">
          <img src="../assets/portfolio/project3.jpg" alt="产品设计">
          <div class="portfolio-overlay">
            <h4>产品设计</h4>
            <span>产品设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="animation" @click="openPreview('cfj', '动画短片', '动画制作', 'video')">
          <img src="../assets/portfolio/project4.jpg" alt="动画短片">
          <div class="portfolio-overlay">
            <h4>动画短片</h4>
            <span>动画制作</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="animation" @click="openPreview('qp', '动画短片', '动画制作', 'video')">
          <img src="../assets/portfolio/project4.jpg" alt="动画短片">
          <div class="portfolio-overlay">
            <h4>动画短片</h4>
            <span>动画制作</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="animation" @click="openPreview('kqzg', '动画短片', '动画制作', 'video')">
          <img src="../assets/portfolio/project4.jpg" alt="动画短片">
          <div class="portfolio-overlay">
            <h4>动画短片</h4>
            <span>动画制作</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="graphic" @click="openPreview('project5', '平面设计', '平面设计', 'video')">
          <img src="../assets/portfolio/project5.jpg" alt="平面设计">
          <div class="portfolio-overlay">
            <h4>平面设计</h4>
            <span>平面设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="product" @click="openPreview('project6', '产品展示', '产品设计', 'video')">
          <img src="../assets/portfolio/project6.jpg" alt="产品展示">
          <div class="portfolio-overlay">
            <h4>产品展示</h4>
            <span>产品设计</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPreview" class="preview-modal" @click="closePreview">
      <div class="preview-content" @click.stop>
        <button class="preview-close" @click="closePreview">&times;</button>
        <video v-if="previewType === 'video'" :src="previewVideo" controls autoplay muted loop>
          您的浏览器不支持视频播放。
        </video>
        <img v-else :src="previewImage" :alt="previewTitle">
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
      previewType: 'image'
    }
  },
  mounted() {
    this.initFilterButtons()
  },
  methods: {
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
    openPreview(itemName, title, category, type = 'image') {
      this.previewTitle = title
      this.previewCategory = category
      this.previewType = type
      
      if (type === 'video') {
        // 使用本地视频文件
        this.previewVideo = new URL(`../assets/portfolio/${itemName}.mp4`, import.meta.url).href
      } else {
        this.previewImage = new URL(`../assets/portfolio/${itemName}.jpg`, import.meta.url).href
      }
      
      this.showPreview = true
    },
    closePreview() {
      this.showPreview = false
      this.previewImage = ''
      this.previewVideo = ''
      this.previewTitle = ''
      this.previewCategory = ''
      this.previewType = 'image'
    }
  }
}
</script>

<style scoped>
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 0;
  margin: 0;
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
  width: 100%;
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 5px;
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

.preview-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--bg-tertiary);
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition-fast);
  z-index: 10;
}

.preview-close:hover {
  background: var(--accent-color);
  color: var(--bg-primary);
}

@media (max-width: 768px) {
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

  .preview-close {
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
  }
}
</style>
