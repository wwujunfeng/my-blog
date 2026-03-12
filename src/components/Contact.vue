<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">联系我</h2>
        <div class="line"></div>
      </div>
      <div class="contact-content">
        <div class="contact-info animate-on-scroll">
          <h3>联系方式</h3>
          <p>
            如果你有任何问题或合作意向，请随时联系我。
          </p>
          <div class="contact-details">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fa fa-map-marker"></i>
              </div>
              <div class="contact-text">
                <h4>地址</h4>
                <p>江苏省苏州市</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fa fa-envelope"></i>
              </div>
              <div class="contact-text">
                <h4>邮箱</h4>
                <p>1023808661@qq.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fa fa-phone"></i>
              </div>
              <div class="contact-text">
                <h4>电话</h4>
                <p>151 9597 0318</p>
              </div>
            </div>
          </div>
          <div class="contact-social">
            <a href="#" class="social-link"><i class="iconfont icon-blog-sign_wechat"></i></a>
            <a href="#" class="social-link"><i class="iconfont icon-blog-dianhua"></i></a>
            <a href="#" class="social-link"><i class="iconfont icon-blog-youxiang1"></i></a>
          </div>
        </div>
        <div class="contact-form animate-on-scroll">
          <h3>发送消息</h3>
          <div v-if="formStatus" :class="['form-message', formStatus.type]">
            {{ formStatus.message }}
          </div>
          <form 
            id="contact-form" 
            action="https://formspree.io/f/xgonkkwd" 
            method="POST"
            @submit="handleSubmit"
          >
            <div class="form-group">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="你的姓名" 
                required
                v-model="formData.name"
              >
            </div>
            <div class="form-group">
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="你的邮箱" 
                required
                v-model="formData.email"
              >
            </div>
            <div class="form-group">
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="主题" 
                required
                v-model="formData.subject"
              >
            </div>
            <div class="form-group">
              <textarea 
                id="message" 
                name="message" 
                placeholder="你的消息" 
                rows="5" 
                required
                v-model="formData.message"
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '发送中...' : '发送消息' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      formStatus: null
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()
      
      this.isSubmitting = true
      this.formStatus = null
      
      const form = event.target
      const formData = new FormData(form)
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        
        if (response.ok) {
          this.formStatus = {
            type: 'success',
            message: '消息已发送成功！我会尽快回复您。'
          }
          this.formData = {
            name: '',
            email: '',
            subject: '',
            message: ''
          }
          form.reset()
        } else {
          const data = await response.json()
          throw new Error(data.error || '发送失败')
        }
      } catch (error) {
        this.formStatus = {
          type: 'error',
          message: '发送失败，请稍后重试或直接发送邮件到 1023808661@qq.com'
        }
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-info h3 {
  font-size: 28px;
  margin-bottom: 20px;
}

.contact-info > p {
  color: var(--text-secondary);
  margin-bottom: 30px;
}

.contact-details {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  align-items: flex-start;
}

.contact-icon {
  width: 55px;
  height: 55px;
  background: var(--bg-tertiary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  font-size: 22px;
  flex-shrink: 0;
}

.contact-text h4 {
  font-size: 16px;
  margin-bottom: 5px;
  color: var(--text-primary);
}

.contact-text p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.contact-social {
  display: flex;
  gap: 15px;
}

.contact-form {
  background: var(--bg-secondary);
  padding: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.contact-form h3 {
  font-size: 24px;
  margin-bottom: 30px;
}

.form-message {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
}

.form-message.success {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.form-message.error {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid #f44336;
}

.form-group {
  margin-bottom: 25px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 15px;
  transition: var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
