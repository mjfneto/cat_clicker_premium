window.onload = function() {
    const model = [
        {
            name: 'cat1',
            clickCount: 1
        },
        {
            name: 'cat2',
            clickCount: 2
        },
        {
            name: 'cat3',
            clickCount: 3
        },
        {
            name: 'cat4',
            clickCount: 4
        },
        {
            name: 'cat5',
            clickCount: 5
        },
    ];

    const octopus = {
        init: function() {
            viewList.init();
            viewArea.init();
            let counter = this._createCounter();
            model.forEach(function (cat) {
                octopus._defineCatId(cat, counter);
                octopus._defineCatSrc(cat);
                viewList.render(cat);
            })
        },

        _createCounter: function () {
            return (function (count) {
                return function () {
                    return ++count;
                }
            })(0);
        },

        _defineCatId: function (cat, counter) {
            cat.id = counter();
        },

        _defineCatSrc: function (cat) {
            cat.src = 'img/cat_picture' + cat.id + '.jpeg';
        },

        getCurrentCat: function(id) {
            return model.find(function (cat) {
                return cat.id == id;
            });
        },

        handleCatList: function(id) {
            this.handlePreviousCat();
            const currentCat = this.getCurrentCat(id);
            currentCat.visible = true;
            viewArea.render(currentCat);
        },

        handlePreviousCat: function() {
            const previousCat = model.find(function (cat) {
                return cat.visible === true;
            });
            if (previousCat) previousCat.visible = false;
        },

        handleCurrentCat: function() {
            const currentCat = model.find(function (cat) {
                return cat.visible === true;
            });
            ++currentCat.clickCount;
            viewArea.render(currentCat);
        }

    }

    const viewList = {
        init: function() {
            this.catList = document.querySelector('.cat-list');
            this.catItemTemplate = '<li class="cat-item" id="{{id}}">{{name}}</li>';

            this.catList.addEventListener('click', function (e) {
                if (e.target && e.target.classList.contains('cat-item')) {
                    octopus.handleCatList(e.target.id);
                }
            })
        },

        render: function(cat) {
            $catList = this.catList;
            thisTemplate = this.catItemTemplate;

            thisTemplate = thisTemplate.replace(/{{id}}/g, cat.id);
            let $catItem = thisTemplate.replace(/{{name}}/g, cat.name);
            $catList.insertAdjacentHTML('beforeend', $catItem);
        }
    }

    const viewArea = {
        init: function() {
            this.counterContainer = document.querySelector('.counter-container');
            this.catCounterTemplate = '<img class="cat-img" src="{{src}}" alt="{{alt}}"></img><p class="cat-counter">{{clickCount}}</p>';

            this.counterContainer.addEventListener('click', function(e) {
                if (e.target && e.target.classList.contains('cat-img')) {
                    octopus.handleCurrentCat();
                }
            })
        },

        render: function(currentCat) {
            $counterContainer = this.counterContainer;
            thisTemplate = this.catCounterTemplate;

            $counterContainer.innerHTML = '';

            thisTemplate = thisTemplate.replace(/{{src}}/g, currentCat.src);
            thisTemplate = thisTemplate.replace(/{{alt}}/g, currentCat.name);
            let $catCounter = thisTemplate.replace(/{{clickCount}}/g, currentCat.clickCount);
            $counterContainer.insertAdjacentHTML('beforeend', $catCounter);
        }
    }

    octopus.init();
}