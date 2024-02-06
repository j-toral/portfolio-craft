const scrollStockistList = (event, stockistContainer) => {
    const locationContainers = stockistContainer.querySelectorAll('.parentClickContainer');

    const latitudeArray = [...stockistContainer.querySelectorAll('.hiddenLatitude')];
    const longitudeArray = [...stockistContainer.querySelectorAll('.hiddenLongitude')];

    const latitude = latitudeArray.map((latitude) => {
        return latitude.innerText;
    });

    const longitude = longitudeArray.map((longitude) => {
        return longitude.innerText;
    });

    let latitudeSearch = latitude.findIndex((latitude) => parseFloat(latitude) === event.latlng.lat);
    let longitudeSearch = longitude.findIndex((longitude) => parseFloat(longitude) === event.latlng.lng);

    if (latitudeSearch === longitudeSearch) {
        let rectContainer = stockistContainer.getBoundingClientRect();
        let rectItem = locationContainers[latitudeSearch].getBoundingClientRect();

        let rectTop = rectItem.top + stockistContainer.scrollTop - rectContainer.top;

        stockistContainer.scroll({
            top: rectTop,
            left: rectItem.left,
            behavior: "smooth"
        });
    }
}

const debounceStockist = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

const showSpinner = (spinner, container) => {
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');
    container.classList.remove('overflow-y-scroll');
    container.classList.add('overflow-hidden');
}

const hideSpinner = (spinner, container, index, last) => {
    if (index === last) {
        spinner.classList.add('hidden');
        spinner.classList.add('flex');
        container.classList.remove('overflow-hidden');
        container.classList.add('overflow-y-scroll');
    }
}

const searchStockist = (scrollContainer, spinner, value) => {
    const container = document.querySelectorAll('.parentClickContainer');
    const noResults = document.getElementById('no-results');

    let resultsFound = false;

    if (value !== "") {
        container.forEach((item, index, array) => {
            const lowerCaseValue = value.toLowerCase();
            const lowerCaseInnerText = item.innerText.toLowerCase();

            if (!lowerCaseInnerText.includes(lowerCaseValue)) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
                resultsFound = true;
            }

            hideSpinner(spinner, scrollContainer, index, array.length - 1);
        })
    } else {
        container.forEach((item, index, array) => {
            item.classList.remove('hidden');

            hideSpinner(spinner, scrollContainer, index, array.length - 1);
        });

        resultsFound = true;
    }

    if (resultsFound) {
        noResults.classList.remove('flex');
        noResults.classList.add('hidden');
    } else {
        noResults.classList.remove('hidden');
        noResults.classList.add('flex');
    }
}

const handleSearch = debounceStockist((event, container, spinner) => {
    searchStockist(container, spinner, event.target.value);
}, 1000);

document.getElementById('stockist-search').addEventListener('input', (event) => {
    const container = document.getElementById('store-scroll-container');
    const spinner = document.getElementById('store-spinner');

    showSpinner(spinner, container);

    handleSearch(event, container, spinner);
});