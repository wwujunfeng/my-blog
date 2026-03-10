<template>
  <div id="app">
    <Header />
    <Hero />
    <About />
    <Portfolio />
    <Blog />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Portfolio from './components/Portfolio.vue'
import Blog from './components/Blog.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    About,
    Portfolio,
    Blog,
    Contact,
    Footer
  },
  mounted() {
    this.initScrollAnimation()
    this.initContactForm()
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



    initContactForm() {
      const form = document.getElementById('contact-form')
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault()
          alert('消息已发送！')
          form.reset()
        })
      }
    }
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'font-awesome/css/font-awesome.min.css';
</style>