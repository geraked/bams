export default class Node {

    constructor(dom) {
        this._dom = dom;
        this._node = null;
    }

    _fetch() { }

    _createNode() { }

    _find(name, stringType = true) {
        let tag = this._dom.querySelector(name);
        if (tag) {
            let value = tag.textContent || tag.innerText;
            if (stringType)
                return value.trim();
            else
                return parseInt(value);
        }
        return null;
    }

    _createSimpleItem(value, className) {
        let li = document.createElement('li');
        let valueSpan = document.createElement('span');

        li.className = `list-group-item ${className}`;
        valueSpan.className = 'value';
        valueSpan.innerText = value;
        li.appendChild(valueSpan);
        return li;
    }

    _createBadgeItem(key, value, className) {
        let li = document.createElement('li');
        let keySpan = document.createElement('span');
        let valueSpan = document.createElement('span');

        li.className = `list-group-item d-flex justify-content-between align-items-center ${className}`;
        keySpan.className = 'key';
        valueSpan.className = 'badge bg-primary rounded-pill value';
        keySpan.innerText = key;
        valueSpan.innerHTML = value;
        li.appendChild(keySpan);
        li.appendChild(valueSpan);
        return li;
    }

    _createLinkItem(key, value, className) {
        let a = document.createElement('a');
        a.href = value;
        a.innerText = key;
        a.target = '_blank';
        a.className = `list-group-item list-group-item-action ${className}`;
        return a;
    }

    request(url, callBack, postData = null) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let div = document.createElement('div');
                div.innerHTML = this.responseText;
                callBack(div);
            }
        };
        if (postData) {
            xhttp.open('POST', url, true);
            xhttp.send(postData);
        } else {
            xhttp.open('GET', url, true);
            xhttp.send();
        }
    }

    removeChilds(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    get node() {
        return this._node;
    }
}