<template>
  <div id="app">
    <Header />
    <Hero />
    <About />
    <Portfolio />
    <Skills />
    <!-- <Blog /> -->
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Portfolio from './components/Portfolio.vue'
import Skills from './components/Skills.vue'
// import Blog from './components/Blog.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    About,
    Portfolio,
    Skills,
    // Blog,
    Contact,
    Footer
  },
  mounted() {
    this.initScrollAnimation()
    this.initPortfolioFilter()
  },
  methods: {
    initScrollAnimation() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, observerOptions)

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el)
      })
    },

    initPortfolioFilter() {
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
    }
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'font-awesome/css/font-awesome.min.css';
</style>