window.onload = function() {
    const model = [
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
    ];

    const octopus = {
        init: function() {

            model[0].visible = true;

            viewList.init();
            viewArea.init();
            viewArea.render(model[0]);
        },

        getCats: function() {
            return model;
        },

        getVisibleCat: function() {
            return model.find(function(cat) {
                return cat.visible == true;
            })
        },

        handleCurrentCat: function(currentCat) {
            const previousCat = this.getVisibleCat();
            previousCat.visible = false;
            currentCat.visible = true;
            viewArea.render(currentCat);
        },

        handleClickCount: function() {
            const currentCat = this.getVisibleCat();
            ++currentCat.clickCount;
            viewArea.render(currentCat);
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

            this.render(octopus.getVisibleCat());
        },

        render: function(cat) {
            this.catName.textContent = cat.name;
            this.catCounter.textContent = cat.clickCount;
            this.catImg.src = cat.src;
            this.catImg.alt = cat.name;
        }
    }

    octopus.init();
}