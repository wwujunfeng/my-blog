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
        <button class="filter-btn" data-filter="character">角色设计</button>
        <button class="filter-btn" data-filter="environment">环境设计</button>
        <button class="filter-btn" data-filter="animation">动画制作</button>
        <button class="filter-btn" data-filter="vfx">VFX</button>
      </div>
      <div class="portfolio-grid">
        <div class="portfolio-item animate-on-scroll" data-category="3d" @click="openPreview('project1', '产品渲染', '3D渲染')">
          <img src="../assets/portfolio/project1.jpg" alt="产品渲染">
          <div class="portfolio-overlay">
            <h4>产品渲染</h4>
            <span>3D渲染</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="character" @click="openPreview('project2', '角色建模', '角色设计')">
          <img src="../assets/portfolio/project2.jpg" alt="角色建模">
          <div class="portfolio-overlay">
            <h4>角色建模</h4>
            <span>角色设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="environment" @click="openPreview('project3', '场景设计', '环境设计')">
          <img src="../assets/portfolio/project3.jpg" alt="场景设计">
          <div class="portfolio-overlay">
            <h4>场景设计</h4>
            <span>环境设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="animation" @click="openPreview('project4', '动画短片', '动画制作')">
          <img src="../assets/portfolio/project4.jpg" alt="动画短片">
          <div class="portfolio-overlay">
            <h4>动画短片</h4>
            <span>动画制作</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="vfx" @click="openPreview('project5', '视觉特效', 'VFX')">
          <img src="../assets/portfolio/project5.jpg" alt="视觉特效">
          <div class="portfolio-overlay">
            <h4>视觉特效</h4>
            <span>VFX</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="3d" @click="openPreview('project6', '产品展示', '3D渲染')">
          <img src="../assets/portfolio/project6.jpg" alt="产品展示">
          <div class="portfolio-overlay">
            <h4>产品展示</h4>
            <span>3D渲染</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPreview" class="preview-modal" @click="closePreview">
      <div class="preview-content" @click.stop>
        <button class="preview-close" @click="closePreview">&times;</button>
        <img :src="previewImage" :alt="previewTitle">
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
      previewTitle: '',
      previewCategory: ''
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
    openPreview(imageName, title, category) {
      this.previewImage = new URL(`../assets/portfolio/${imageName}.jpg`, import.meta.url).href
      this.previewTitle = title
      this.previewCategory = category
      this.showPreview = true
    },
    closePreview() {
      this.showPreview = false
      this.previewImage = ''
      this.previewTitle = ''
      this.previewCategory = ''
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
  max-width: 90vw;
  max-height: 90vh;
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
  max-height: 75vh;
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
    max-height: 85vh;
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
