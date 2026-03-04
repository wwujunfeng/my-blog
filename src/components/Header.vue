<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 1000;
  transition: var(--transition-normal);
}

.header.scrolled {
  background: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(10px);
  padding: 15px 0;
  box-shadow: var(--shadow-sm);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -1px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo::first-letter {
  color: var(--accent-color);
}

.nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  width: 100%;
  max-width: 1000px;
}

.nav-item {
  list-style: none;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding: 5px 0;
  text-decoration: none;
  transition: var(--transition-fast);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: var(--transition-fast);
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.header-buttons {
  display: flex;
  gap: 15px;
  flex-shrink: 0;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
}

.menu-toggle span {
  width: 25px;
  height: 2px;
  background: var(--text-primary);
  transition: var(--transition-fast);
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

@media (max-width: 1200px) {
  .nav-list {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .nav-list {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--bg-secondary);
    flex-direction: column;
    padding: 100px 40px;
    gap: 25px;
    transition: var(--transition-normal);
  }

  .nav-list.active {
    right: 0;
  }

  .menu-toggle {
    display: flex;
  }

  .header-buttons {
    display: none;
  }
}
</style>