(function() {
    'use strict';

    const DOM = {
        loader: document.querySelector('.page-loader'),
        navbar: document.querySelector('.navbar'),
        menuToggle: document.querySelector('.menu-toggle'),
        navMenu: document.querySelector('.nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        portfolioItems: document.querySelectorAll('.portfolio-item'),
        animateElements: document.querySelectorAll('.animate-on-scroll'),
        pageTransition: document.querySelector('.page-transition'),
        contactForm: document.querySelector('.contact-form')
    };

    const PageLoader = {
        init() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (DOM.loader) {
                        DOM.loader.classList.add('loaded');
                    }
                }, 500);
            });
        }
    };

    const Navigation = {
        init() {
            this.handleScroll();
            this.handleMobileMenu();
            this.handleActiveLink();
            this.handleSmoothScroll();
        },

        handleScroll() {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (DOM.navbar) {
                    if (currentScroll > 50) {
                        DOM.navbar.classList.add('scrolled');
                    } else {
                        DOM.navbar.classList.remove('scrolled');
                    }
                }

                lastScroll = currentScroll;
            });
        },

        handleMobileMenu() {
            if (DOM.menuToggle && DOM.navMenu) {
                DOM.menuToggle.addEventListener('click', () => {
                    DOM.menuToggle.classList.toggle('active');
                    DOM.navMenu.classList.toggle('active');
                    document.body.style.overflow = DOM.navMenu.classList.contains('active') ? 'hidden' : '';
                });

                DOM.navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        DOM.menuToggle.classList.remove('active');
                        DOM.navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
            }
        },

        handleActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            
            window.addEventListener('scroll', () => {
                const scrollY = window.pageYOffset;
                
                sections.forEach(section => {
                    const sectionHeight = section.offsetHeight;
                    const sectionTop = section.offsetTop - 100;
                    const sectionId = section.getAttribute('id');
                    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    
                    if (navLink) {
                        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                            DOM.navLinks.forEach(link => link.classList.remove('active'));
                            navLink.classList.add('active');
                        }
                    }
                });
            });
        },

        handleSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    const PortfolioFilter = {
        init() {
            if (DOM.filterBtns.length > 0) {
                DOM.filterBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.filter(btn);
                    });
                });
            }
        },

        filter(clickedBtn) {
            const filter = clickedBtn.getAttribute('data-filter');
            
            DOM.filterBtns.forEach(btn => btn.classList.remove('active'));
            clickedBtn.classList.add('active');
            
            DOM.portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }
    };

    const ScrollAnimations = {
        init() {
            if (DOM.animateElements.length > 0) {
                this.observe();
            }
        },

        observe() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            DOM.animateElements.forEach(el => observer.observe(el));
        }
    };

    const PageTransition = {
        init() {
            const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target="_blank"])');
            
            internalLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    const currentPath = window.location.pathname;
                    
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        e.preventDefault();
                        this.transitionTo(href);
                    }
                });
            });
        },

        transitionTo(url) {
            if (DOM.pageTransition) {
                DOM.pageTransition.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
            } else {
                window.location.href = url;
            }
        }
    };

    const ContactForm = {
        init() {
            if (DOM.contactForm) {
                DOM.contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSubmit();
                });
            }
        },

        handleSubmit() {
            const formData = new FormData(DOM.contactForm);
            const data = Object.fromEntries(formData);
            
            const btn = DOM.contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '发送中...';
            btn.disabled = true;
            
            setTimeout(() => {
                this.showNotification('消息已发送成功！', 'success');
                DOM.contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        },

        showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 15px 25px;
                background: ${type === 'success' ? '#ffc107' : '#ff4444'};
                color: ${type === 'success' ? '#0a0a0a' : '#fff'};
                border-radius: 5px;
                display: flex;
                align-items: center;
                gap: 15px;
                z-index: 9999;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.remove();
            });
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    const TypingEffect = {
        init() {
            const typingElements = document.querySelectorAll('.typing');
            typingElements.forEach(el => this.type(el));
        },

        type(element) {
            const text = element.getAttribute('data-text');
            if (!text) return;
            
            let index = 0;
            element.textContent = '';
            
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    };

    const TiltEffect = {
        init() {
            const tiltElements = document.querySelectorAll('.tilt-effect');
            
            tiltElements.forEach(el => {
                el.addEventListener('mousemove', (e) => this.handleMove(e, el));
                el.addEventListener('mouseleave', (e) => this.handleLeave(e, el));
            });
        },

        handleMove(e, el) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        },

        handleLeave(e, el) {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    };

    const CounterAnimation = {
        init() {
            const counters = document.querySelectorAll('.counter');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        },

        animate(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        }
    };

    const LazyLoad = {
        init() {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    };

    const Theme = {
        init() {
            this.addAnimationStyles();
        },

        addAnimationStyles() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideOut {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    const App = {
        init() {
            PageLoader.init();
            Navigation.init();
            PortfolioFilter.init();
            ScrollAnimations.init();
            PageTransition.init();
            ContactForm.init();
            TypingEffect.init();
            TiltEffect.init();
            CounterAnimation.init();
            LazyLoad.init();
            Theme.init();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }

})();
