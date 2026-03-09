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
            如果你有任何问题或合作意向，请随时联系我。我会尽快回复你。
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
            <a href="#" class="social-link"><i class="fa fa-github"></i></a>
            <a href="#" class="social-link"><i class="fa fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fa fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fa fa-instagram"></i></a>
          </div>
        </div>
        <div class="contact-form animate-on-scroll">
          <h3>发送消息</h3>
          <form id="contact-form">
            <div class="form-group">
              <input type="text" id="name" name="name" placeholder="你的姓名" required>
            </div>
            <div class="form-group">
              <input type="email" id="email" name="email" placeholder="你的邮箱" required>
            </div>
            <div class="form-group">
              <input type="text" id="subject" name="subject" placeholder="主题" required>
            </div>
            <div class="form-group">
              <textarea id="message" name="message" placeholder="你的消息" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">发送消息</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact'
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

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>