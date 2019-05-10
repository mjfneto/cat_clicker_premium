window.onload = function() {
    const model = {
        adminMode: false,
        currentCat: {},
        cats: [
            {
                name: 'cat1',
                src: 'img/cat_picture1.jpeg',
                clickCount: 0
            },
            {
                name: 'cat2',
                src: 'img/cat_picture2.jpeg',
                clickCount: 0
            },
            {
                name: 'cat3',
                src: 'img/cat_picture3.jpeg',
                clickCount: 0
            },
            {
                name: 'cat4',
                src: 'img/cat_picture4.jpeg',
                clickCount: 0
            },
            {
                name: 'cat5',
                src: 'img/cat_picture5.jpeg',
                clickCount: 0
            },
        ]
    };

    const octopus = {
        init: function() {

            model.currentCat = model.cats[0];

            viewList.init();
            viewArea.init();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        getCats: function () {
            return model.cats;
        },

        handleCurrentCat: function(cat) {
            model.currentCat = cat;
        },

        handleClickCount: function() {
            ++model.currentCat.clickCount;
            viewArea.render();
        }

    }

    const viewList = {
        init: function() {
            this.catList = document.querySelector('.cat-list');

            this.render();
        },

        render: function() {
            const cats = octopus.getCats();

            $catList = this.catList;

            cats.forEach(function (cat) {
                let $catItem = document.createElement('li');
                $catItem.classList.add('cat-item');
                $catItem.innerText = cat.name;
                $catItem.addEventListener('click', (function(catCopy) {
                    return function () {
                        octopus.handleCurrentCat(catCopy);
                        viewArea.render();
                    }
                })(cat));
                $catList.insertAdjacentElement('beforeend', $catItem);
            })
        }
    }

    const viewArea = {
        init: function() {
            this.counterContainer = document.querySelector('.counter-container');
            this.catName = document.querySelector('.cat-name');
            this.catImg = document.querySelector('.cat-img');
            this.catCounter = document.querySelector('.cat-counter');

            this.catImg.addEventListener('click', function() {
                octopus.handleClickCount();
            })

            this.render();
        },

        render: function() {
            const currentCat = octopus.getCurrentCat();
            this.catName.textContent = currentCat.name;
            this.catCounter.textContent = currentCat.clickCount;
            this.catImg.src = currentCat.src;
            this.catImg.alt = currentCat.name;
        }
    }

    octopus.init();
}