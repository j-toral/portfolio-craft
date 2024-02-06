class StickyHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.header = document.querySelector('.section-header');
        this.headerIsAlwaysSticky = false;
        this.headerBounds = {};

        this.setHeaderHeight();

        window.matchMedia('(min-width: 1024px)').addEventListener('change', this.setHeaderHeight.bind(this));
        window.matchMedia('(min-width: 768px)').addEventListener('change', this.setHeaderHeight.bind(this));

        if (this.headerIsAlwaysSticky) {
            this.header.classList.add('sticky');
            this.header.classList.add('top-0');
        }

        this.currentScrollTop = 0;
        this.preventReveal = false;
        this.predictiveSearch = this.querySelector('predictive-search');

        this.onScrollHandler = this.onScroll.bind(this);
        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
        window.addEventListener('scroll', this.onScrollHandler, false);

        this.createObserver();
    }

    setHeaderHeight() {
        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
    }

    disconnectedCallback() {
        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
        window.removeEventListener('scroll', this.onScrollHandler);
    }

    createObserver() {
        let observer = new IntersectionObserver((entries, observer) => {
            this.headerBounds = entries[0].intersectionRect;
            observer.disconnect();
        });

        observer.observe(this.header);
    }

    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            this.header.classList.add('scrolled-past-header');
            if (this.preventHide && window.innerWidth < 1024) return;
            requestAnimationFrame(this.hide.bind(this));
        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            this.header.classList.add('scrolled-past-header');
            if (!this.preventReveal) {
                requestAnimationFrame(this.reveal.bind(this));
            } else {
                window.clearTimeout(this.isScrolling);

                this.isScrolling = setTimeout(() => {
                    this.preventReveal = false;
                }, 66);

                requestAnimationFrame(this.hide.bind(this));
            }
        } else if (scrollTop <= this.headerBounds.top) {
            this.header.classList.remove('scrolled-past-header');
            requestAnimationFrame(this.reset.bind(this));
        }

        this.currentScrollTop = scrollTop;
    }

    hide() {
        if (this.headerIsAlwaysSticky) return;
        this.header.classList.add('-top-20', 'md:-top-28', 'lg:-top-48', 'sticky');
        this.header.classList.remove('top-0');
        this.closeMenuDisclosure();
        // this.closeSearchModal();
    }

    reveal() {
        if (this.headerIsAlwaysSticky) return;
        this.header.classList.add('sticky', 'top-0', 'transition-all', 'ease-out');
        this.header.classList.remove('-top-20', 'md:-top-28', 'lg:-top-48');
    }

    reset() {
        if (this.headerIsAlwaysSticky) return;
        this.header.classList.remove('-top-20', 'md:-top-28', 'lg:-top-48', 'transition-all', 'ease-out', 'top-0');
    }

    closeMenuDisclosure() {
        this.disclosures = this.disclosures || this.header.querySelectorAll('header-menu');
        this.disclosures.forEach(disclosure => disclosure.close());
    }

    // closeSearchModal() {
    //     this.searchModal = this.searchModal || this.header.querySelector('details-modal');
    //     this.searchModal.close(false);
    // }
}

customElements.define('sticky-header', StickyHeader);