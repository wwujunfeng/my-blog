<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">关于我</h2>
        <div class="line"></div>
      </div>
      <div class="about-content">
        <div class="about-image animate-on-scroll">
          <img src="../assets/profile/about.jpg" alt="About Me">
          <div class="experience-badge">
            <span class="number">5+</span>
            <span class="text">年经验</span>
          </div>
        </div>
        <div class="about-text animate-on-scroll">
          <h3>我是一名前端开发者</h3>
          <p>
            我专注于创建美观、响应式的网站和应用程序。拥有5年以上的前端开发经验，熟悉现代前端技术栈，包括HTML5、CSS3、JavaScript、Vue.js等。
          </p>
          <p>
            我热爱解决问题，不断学习新技术，并且注重代码质量和用户体验。我相信好的设计应该既美观又实用。
          </p>
          <div class="about-info">
            <div class="info-item">
              <span class="label">姓名：</span>
              <span class="value">Arter</span>
            </div>
            <div class="info-item">
              <span class="label">邮箱：</span>
              <span class="value">contact@arter.com</span>
            </div>
            <div class="info-item">
              <span class="label">电话：</span>
              <span class="value">+123 456 7890</span>
            </div>
            <div class="info-item">
              <span class="label">地址：</span>
              <span class="value">北京市朝阳区</span>
            </div>
          </div>
          <a href="#contact" class="btn btn-primary">联系我</a>
        </div>
      </div>
      <div class="skills">
        <h3 class="skills-title">我的技能</h3>
        <div class="skills-grid">
          <div class="skill-item animate-on-scroll">
            <div class="skill-icon">
              <i class="fa fa-html5"></i>
            </div>
            <h4>HTML5</h4>
            <p>语义化标签，响应式设计</p>
          </div>
          <div class="skill-item animate-on-scroll">
            <div class="skill-icon">
              <i class="fa fa-css3"></i>
            </div>
            <h4>CSS3</h4>
            <p>Flexbox，Grid，动画效果</p>
          </div>
          <div class="skill-item animate-on-scroll">
            <div class="skill-icon">
              <i class="fa fa-code"></i>
            </div>
            <h4>JavaScript</h4>
            <p>ES6+，异步编程，DOM操作</p>
          </div>
          <div class="skill-item animate-on-scroll">
            <div class="skill-icon">
              <i class="fa fa-vuejs"></i>
            </div>
            <h4>Vue.js</h4>
            <p>Vue 3，Composition API，Vuex</p>
          </div>
          <div class="skill-item animate-on-scroll">
            <div class="skill-icon">
              <i class="fa fa-react"></i>
            </div>
            <h4>React</h4>
            <p>React Hooks，Redux</p>
          </div>
          <div class="skill-item animate-on-scroll">
            <div class="skill-icon">
              <i class="fa fa-mobile"></i>
            </div>
            <h4>响应式设计</h4>
            <p>移动优先，自适应布局</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>