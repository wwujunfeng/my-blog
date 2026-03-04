<template>
  <section id="blog" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">我的博客</h2>
        <div class="line"></div>
      </div>
      <div class="blog-grid">
        <article class="blog-card animate-on-scroll">
          <div class="image">
            <img src="../assets/blog/blog1.jpg" alt="Blog 1">
            <span class="date">2024-03-15</span>
          </div>
          <div class="content">
            <span class="category">技术</span>
            <h3>如何使用React Hooks优化组件性能</h3>
            <p>
              React Hooks 已经成为 React 开发的标准，本文将介绍如何使用 Hooks 来优化组件性能，包括使用 useMemo、useCallback 等。
            </p>
            <a href="#" class="read-more">阅读更多 <i class="fa fa-arrow-right"></i></a>
          </div>
        </article>
        <article class="blog-card animate-on-scroll">
          <div class="image">
            <img src="../assets/blog/blog2.jpg" alt="Blog 2">
            <span class="date">2024-03-10</span>
          </div>
          <div class="content">
            <span class="category">教程</span>
            <h3>从零开始学习TypeScript</h3>
            <p>
              TypeScript 已经成为前端开发的重要工具，本文将从基础开始，一步步教你如何使用 TypeScript 来提高代码质量。
            </p>
            <a href="#" class="read-more">阅读更多 <i class="fa fa-arrow-right"></i></a>
          </div>
        </article>
        <article class="blog-card animate-on-scroll">
          <div class="image">
            <img src="../assets/blog/blog3.jpg" alt="Blog 3">
            <span class="date">2024-03-05</span>
          </div>
          <div class="content">
            <span class="category">生活</span>
            <h3>程序员的高效工作技巧</h3>
            <p>
              作为一名程序员，如何提高工作效率是一个重要的话题。本文将分享一些实用的工作技巧和工具，帮助你更高效地完成工作。
            </p>
            <a href="#" class="read-more">阅读更多 <i class="fa fa-arrow-right"></i></a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Blog'
}
</script>