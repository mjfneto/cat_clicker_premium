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
            viewAdminMode.init();
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
        },

        handleAdminMode: function() {
            if (model.adminMode) {
                this.resetAdminMode();
                return;
            }
            model.adminMode = true;
            viewAdminMode.render();
        },

        resetAdminMode: function() {
            model.adminMode = false;
            viewAdminMode.clear();
        },

        handleAdminInputs: function(inputs) {
            model.currentCat.name = inputs.namedItem('name').value;
            model.currentCat.src = inputs.namedItem('url').value;
            model.currentCat.clickCount = inputs.namedItem('clickCount').value;
            viewList.render();
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

            this.catList.innerHTML = '';

            $catList = this.catList;

            cats.forEach(function (cat) {
                let $catItem = document.createElement('li');
                $catItem.classList.add('cat-item');
                $catItem.innerText = cat.name;
                $catItem.addEventListener('click', (function(catCopy) {
                    return function () {
                        octopus.resetAdminMode();
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

    const viewAdminMode = {
        init: function() {
            this.admBtn = document.querySelector('.adm-btn');
            this.admFormContainer = document.querySelector('.adm-form-container');
            this.form = document.createElement('form');
            this.formBtnContainer = document.createElement('div');
            this.saveBtn = document.createElement('button');
            this.cancelBtn = document.createElement('button');

            this.admBtn.addEventListener('click', function () {
                octopus.handleAdminMode();
            })

            this.cancelBtn.addEventListener('click', function() {
                octopus.handleAdminMode();
            })

            this.form.addEventListener('submit', function(e) {
                e.preventDefault();
                octopus.handleAdminInputs(this.elements);
                octopus.handleAdminMode();
            })
        },

        render: function() {
            const admFormContainer = this.admFormContainer;
            const currentCat = octopus.getCurrentCat();

            const form = this.form;

            form.classList.add('adm-form', 'col-12');

            const formFields = [
                {
                    id: 'name',
                    text: 'Name',
                    value: currentCat.name
                },
                {
                    id: 'url',
                    text: 'URL',
                    value: currentCat.src
                },
                {
                    id: 'clickCount',
                    text: 'Click Count',
                    value: currentCat.clickCount
                }
            ]

            formFields.forEach(function(field) {
                const label = document.createElement('label');
                label.classList.add('adm-label');
                label.htmlFor = field.id;
                label.innerText = field.text;

                const input = document.createElement('input');
                input.classList.add('adm-input');
                input.type = 'text';
                input.id = field.id;
                input.name = field.id;
                input.value = field.value;

                form.append(label, input);
            })

            const formBtnContainer = this.formBtnContainer;
            formBtnContainer.classList.add('form-btn-container');

            const saveBtn = this.saveBtn;
            saveBtn.type = 'submit';
            saveBtn.innerText = 'Save';
            saveBtn.classList.add('adm-btn', '-save');

            const cancelBtn = this.cancelBtn;
            cancelBtn.type = 'button';
            cancelBtn.innerText = 'Cancel';
            cancelBtn.classList.add('adm-btn', '-cancel');

            formBtnContainer.append(saveBtn, cancelBtn);
            form.append(formBtnContainer);
            admFormContainer.append(form);
        },

        clear: function() {
            const admFormContainer = this.admFormContainer;
            const form = this.form;
            form.innerHTML = '';
            admFormContainer.innerHTML = '';
        }
    }

    octopus.init();
}