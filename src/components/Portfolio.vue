<template>
  <section id="portfolio" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">我的作品集</h2>
        <div class="line"></div>
      </div>
      <div class="portfolio-filter">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="web">网站开发</button>
        <button class="filter-btn" data-filter="app">应用开发</button>
        <button class="filter-btn" data-filter="design">设计</button>
      </div>
      <div class="portfolio-grid">
        <div class="portfolio-item animate-on-scroll" data-category="web">
          <img src="../assets/portfolio/project1.jpg" alt="Project 1">
          <div class="portfolio-overlay">
            <h4>电商平台</h4>
            <span>网站开发</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="app">
          <img src="../assets/portfolio/project2.jpg" alt="Project 2">
          <div class="portfolio-overlay">
            <h4>移动应用</h4>
            <span>应用开发</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="design">
          <img src="../assets/portfolio/project3.jpg" alt="Project 3">
          <div class="portfolio-overlay">
            <h4>品牌设计</h4>
            <span>UI/UX设计</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="web">
          <img src="../assets/portfolio/project4.jpg" alt="Project 4">
          <div class="portfolio-overlay">
            <h4>企业官网</h4>
            <span>网站开发</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="app">
          <img src="../assets/portfolio/project5.jpg" alt="Project 5">
          <div class="portfolio-overlay">
            <h4>社交应用</h4>
            <span>应用开发</span>
          </div>
        </div>
        <div class="portfolio-item animate-on-scroll" data-category="design">
          <img src="../assets/portfolio/project6.jpg" alt="Project 6">
          <div class="portfolio-overlay">
            <h4>海报设计</h4>
            <span>平面设计</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Portfolio'
}
</script>