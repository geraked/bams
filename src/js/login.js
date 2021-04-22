import Node from './node.js';
import Lang from './language.js';

export default class Login extends Node {

    constructor(dom) {
        super(dom);
        this._createNode();
    }

    _createNode() {
        let form = document.getElementById('login-form');
        let user = document.getElementById('login-user');
        let pass = document.getElementById('login-pass');
        let loader = document.getElementById('login-loader');
        let invalid = document.getElementById('login-invalid');
        let submit = document.getElementById('login-submit');
        let submitTxt = submit.querySelector('span');
        let isRequesting = false;

        this._iniInput(user, Lang.val.username, Lang.val.userEmpty);
        this._iniInput(pass, Lang.val.password, Lang.val.passEmpty);
        invalid.innerText = Lang.val.loginErr;
        submitTxt.innerText = Lang.val.logIn;
        loader.style.display = 'none';

        form.addEventListener('submit', e => {
            e.preventDefault();
            e.stopPropagation();

            invalid.style.display = 'none';

            if (this._validateInput(user) && this._validateInput(pass)) {
                submit.disabled = true;
                submitTxt.style.display = 'none';
                loader.style.display = 'inline-block';
                isRequesting = true;

                setTimeout(() => {

                    this.request('api/login.php', dom => {
                        let returncode = dom.querySelector('returncode');
                        if (returncode && returncode.innerText == 'SUCCESS') {
                            invalid.style.display = 'none';
                            form.classList.add('was-validated');
                            setTimeout(() => {
                                isRequesting = false;
                                location.replace('index.php');
                            }, 1000)
                        } else {
                            invalid.style.display = 'block';
                            loader.style.display = 'none';
                            submitTxt.style.display = 'block';
                            submit.disabled = false;
                            isRequesting = false;
                        }
                    }, new FormData(form));

                }, 1000);

            }

        }, false);


        let langList = document.getElementById('lang-list');
        let langListSelect = langList.querySelector('select');
        let langListLabel = langList.querySelector('label');
        langListLabel.innerText = `${Lang.val.language}`;
        for (let k in Lang._langs) {
            let option = document.createElement('option');
            option.innerText = `${Lang._langs[k].lang_name} - ${k.toUpperCase()}`;
            option.value = k;
            if (k == Lang.lang)
                option.selected = true;
            langListSelect.appendChild(option);
        }
        langListSelect.addEventListener('change', () => {
            Lang.lang = langListSelect.value;
        });


        this._node = this._dom;
    }

    _iniInput(wrapper, name, invalid) {
        let input = wrapper.querySelector('input');
        let label = wrapper.querySelector('label');
        let inval = wrapper.querySelector('.invalid-feedback');

        if (input) {
            input.setAttribute('placeholder', name);
            input.addEventListener('change', () => {
                this._validateInput(wrapper);
            });
        }
        if (label)
            label.innerText = name;
        if (inval)
            inval.innerText = invalid;
    }

    _validateInput(wrapper) {
        let input = wrapper.querySelector('input');
        let val;
        if (!input)
            return;
        val = input.value.replace(/\s/g, '');
        input.value = val;
        if (val == '') {
            input.classList.add('is-invalid');
            return false;
        }
        input.classList.remove('is-invalid');
        return true;
    }

}