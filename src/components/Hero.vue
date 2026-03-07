<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            你好，我是 <span class="highlight">白日梦想家</span>
          </h1>
          <p class="hero-description">
            一名充满创意的3D设计师，专注于创造震撼的视觉效果和沉浸式体验
          </p>
          <div class="hero-buttons">
            <a href="#portfolio" class="btn btn-primary">查看设计</a>
            <a href="#contact" class="btn btn-secondary">联系我</a>
          </div>
          <div class="hero-social">
            <a href="#" class="social-link"><i class="fa fa-github"></i></a>
            <a href="#" class="social-link"><i class="fa fa-artstation"></i></a>
            <a href="#" class="social-link"><i class="fa fa-behance"></i></a>
            <a href="#" class="social-link"><i class="fa fa-instagram"></i></a>
          </div>
        </div>
        <div class="hero-image">
          <img src="../assets/profile/profile.jpg" alt="Profile">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>