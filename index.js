const PDF_HIDDEN_CLASS = 'pdf--hidden';
const PLACEHOLDER_SHOW_CLASS = 'pdf__placeholder--show';

class Resizer {
    /**
     * Элемент, где рендерится pdf
     * @type {HTMLObjectElement | null}
     */
    #pdf;
    /**
     * Контейнер, размер которого будет меняется
     * @type {HTMLDivElement | null}
     */
    #wrapper;
    /**
     * Местозаполнитель для отображения контента в момент изменения размера контейнера
     * @type {HTMLDivElement | null}
     */
    #placeholder;
    /**
     * Подписчик на изменение размера заданного блока
     * @type {ResizeObserver | null}
     */
    #resizeObserver = null;
    /**
     * Таймер для отложенного рендернига pdf
     * @type {number | null}
     */
    #timer = null;

    #placeholderShow() {
        this.#placeholder?.classList?.add(PLACEHOLDER_SHOW_CLASS);
        this.#pdf?.classList?.add(PDF_HIDDEN_CLASS);
    }

    #placeholderHide() {
        this.#placeholder?.classList?.remove(PLACEHOLDER_SHOW_CLASS);
        this.#pdf?.classList?.remove(PDF_HIDDEN_CLASS);
    }

    init() {
        this.#pdf = document.getElementById("pdf");
        this.#wrapper = document.getElementById("pdf__wrapper");
        this.#placeholder = document.getElementById("pdf__placeholder");

        if (!this.#pdf || !this.#wrapper || !this.#placeholder) {
            throw new Error("в разметке не хватает элементов");
        }

        this.#resizeObserver = new ResizeObserver(() => {
            clearTimeout(this.#timer);

            this.#placeholderShow();

            this.#timer = setTimeout(() => {
              this.#placeholderHide();
            }, 1000);
        });

        this.#resizeObserver.observe(this.#wrapper)
    }
}

new Resizer().init();
