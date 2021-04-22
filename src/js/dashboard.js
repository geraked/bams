import Node from './node.js';
import Server from './server.js';
import Lang from './language.js';

export default class Dashboard extends Node {

    constructor(dom) {
        super(dom);
        this.servers = [];
        this._updateDelay = parseInt(localStorage.getItem('updateDelay')) || 15000;
        this._updateEnable = localStorage.getItem('updateEnable') || 1;
        this._darkEnable = localStorage.getItem('darkEnable') || 0;
        this._participantEnable = localStorage.getItem('participantEnable') || 1;
        this._meetingEnable = localStorage.getItem('meetingEnable') || 1;
        this._updateInterval;
        this._fetch();
        this._createNode();
        this.update();
    }

    set updateDelay(val) {
        if (val >= 10000 && val <= 300000) {
            this._updateDelay = val;
            localStorage.setItem('updateDelay', val);
            if (this._updateInterval) {
                clearInterval(this._updateInterval);
                this._updateInterval = null;
            }
            if (this._updateEnable == 1)
                this._updateInterval = setInterval(() => { this.updateServers(); }, this._updateDelay);
        }
    }

    set updateEnable(val) {
        if (val == 1 || val == 0) {
            this._updateEnable = val;
            localStorage.setItem('updateEnable', val);
            if (val == 1 && !this._updateInterval)
                this._updateInterval = setInterval(() => { this.updateServers(); }, this._updateDelay);
            else if (val == 0 && this._updateInterval) {
                clearInterval(this._updateInterval);
                this._updateInterval = null;
            }
        }
    }

    set darkEnable(val) {
        if (val == 1 || val == 0) {
            this._darkEnable = val;
            localStorage.setItem('darkEnable', val);
            if (val == 1)
                document.body.classList.add('night');
            else if (val == 0)
                document.body.classList.remove('night');
        }
    }

    set participantEnable(val) {
        if (val == 1 || val == 0) {
            this._participantEnable = val;
            localStorage.setItem('participantEnable', val);
            let meetingCols = document.querySelectorAll('.meeting-col');
            meetingCols.forEach(m => {
                let meetingDetailsCol = m.querySelector('.meeting-details-col');
                let attendeesCol = m.querySelector('.attendees-col');
                if (val == 1) {
                    if (attendeesCol && attendeesCol.classList.contains('d-none')) {
                        meetingDetailsCol.classList.replace('col-12', 'col-sm-6');
                        meetingDetailsCol.classList.add('cuspad');
                        attendeesCol.classList.remove('d-none');
                        m.classList.replace('col-md-2', 'col-md-4');
                    }
                } else {
                    if (attendeesCol && !attendeesCol.classList.contains('d-none')) {
                        meetingDetailsCol.classList.replace('col-sm-6', 'col-12');
                        meetingDetailsCol.classList.remove('cuspad');
                        attendeesCol.classList.add('d-none');
                        m.classList.replace('col-md-4', 'col-md-2');
                    }
                }
            });
        }
    }

    set meetingEnable(val) {
        if (val == 1 || val == 0) {
            this._meetingEnable = val;
            localStorage.setItem('meetingEnable', val);
            let meetingWrappers = document.querySelectorAll('.meeting-wrapper');
            meetingWrappers.forEach(mw => {
                if (val == 1) {
                    mw.classList.remove('d-none');
                } else {
                    mw.classList.add('d-none');
                }
            });
        }
    }

    _fetchServers() {
        let serversDom = this._dom.querySelectorAll('server');
        serversDom.forEach(s => {
            let server = new Server(s);
            this.servers.push(server);
        });
    }

    _createNode() {
        let main = document.querySelector('main');


        let logoutLink = document.getElementById('logout-link');
        logoutLink.title = Lang.val.logOut;
        logoutLink.innerHTML = `<i class="fas fa-sign-out-alt fa-lg"></i><span class="nav-title ms-2 d-md-none">${Lang.val.logOut}</span>`;


        let langList = document.getElementById('lang-list');
        let langListUl = langList.querySelector('ul');
        let langListToggle = langList.querySelector('.dropdown-toggle');
        langListToggle.innerHTML = `<i class="fas fa-language fa-lg"></i><span class="nav-title ms-2 d-md-none">${Lang.val.language}</span>`;
        langListToggle.title = Lang.val.language;
        for (let k in Lang._langs) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.innerText = Lang._langs[k].lang_name;
            if (k == Lang.lang)
                a.classList.add('active');
            a.addEventListener('click', () => {
                if (!a.classList.contains('active')) {
                    let active = langListUl.querySelector('.active');
                    if (active)
                        active.classList.remove('active');
                    a.classList.add('active');
                    Lang.lang = k;
                }
            });
            li.appendChild(a);
            langListUl.appendChild(li);
        }


        let delayInp = document.getElementById('delay-inp');
        delayInp.value = this._updateDelay / 1000;
        delayInp.addEventListener('change', () => {
            let val = parseInt(delayInp.value) * 1000;
            this.updateDelay = val;
        });


        let delayBtn = document.getElementById('delay-btn');
        if (this._updateEnable == 1) {
            delayBtn.innerHTML = `<i class="fas fa-pause"></i>`;
            delayBtn.classList.add('active');
        } else {
            delayBtn.innerHTML = `<i class="fas fa-play"></i>`;
            delayBtn.classList.remove('active');
        }
        let delayBtnE = () => {
            if (this._updateEnable == 1) {
                this.updateEnable = 0;
                delayBtn.innerHTML = `<i class="fas fa-play"></i>`;
                delayBtn.classList.remove('active');
            } else {
                this.updateEnable = 1;
                delayBtn.innerHTML = `<i class="fas fa-pause"></i>`;
                delayBtn.classList.add('active');
            }
        };
        delayBtn.addEventListener('click', delayBtnE);


        let darkBtn = document.getElementById('dark-link');
        let darkBtnTitle = `<span class="nav-title ms-2 d-md-none">${Lang.val.darkLight}</span>`;
        darkBtn.title = Lang.val.darkLight;
        if (this._darkEnable == 1) {
            darkBtn.innerHTML = `<i class="fas fa-moon fa-lg"></i>${darkBtnTitle}`;
        } else {
            darkBtn.innerHTML = `<i class="fas fa-sun fa-lg"></i>${darkBtnTitle}`;
        }
        let darkBtnE = () => {
            if (this._darkEnable == 1) {
                this.darkEnable = 0;
                darkBtn.innerHTML = `<i class="fas fa-sun fa-lg"></i>${darkBtnTitle}`;
            } else {
                this.darkEnable = 1;
                darkBtn.innerHTML = `<i class="fas fa-moon fa-lg"></i>${darkBtnTitle}`;
            }
        };
        darkBtn.addEventListener('click', darkBtnE);


        let participantBtn = document.getElementById('participant-link');
        let participantBtnTitle = `<span class="nav-title ms-2 d-md-none">${Lang.val.participantShowHide}</span>`;
        participantBtn.title = Lang.val.participantShowHide;
        if (this._participantEnable == 1) {
            participantBtn.innerHTML = `<i class="fas fa-users fa-lg"></i>${participantBtnTitle}`;
        } else {
            participantBtn.innerHTML = `<i class="fas fa-users-slash fa-lg"></i>${participantBtnTitle}`;
        }
        let participantBtnE = () => {
            if (this._participantEnable == 1) {
                this.participantEnable = 0;
                participantBtn.innerHTML = `<i class="fas fa-users-slash fa-lg"></i>${participantBtnTitle}`;
            } else {
                this.participantEnable = 1;
                participantBtn.innerHTML = `<i class="fas fa-users fa-lg"></i>${participantBtnTitle}`;
            }
        };
        participantBtn.addEventListener('click', participantBtnE);


        let meetingBtn = document.getElementById('meeting-link');
        let meetingBtnTitle = `<span class="nav-title ms-2 d-md-none">${Lang.val.meetingShowHide}</span>`;
        meetingBtn.title = Lang.val.meetingShowHide;
        if (this._meetingEnable == 1) {
            meetingBtn.innerHTML = `<i class="fas fa-store-alt fa-lg"></i>${meetingBtnTitle}`;
        } else {
            meetingBtn.innerHTML = `<i class="fas fa-store-alt-slash fa-lg"></i>${meetingBtnTitle}`;
        }
        let meetingBtnE = () => {
            if (this._meetingEnable == 1) {
                this.meetingEnable = 0;
                meetingBtn.innerHTML = `<i class="fas fa-store-alt-slash fa-lg"></i>${meetingBtnTitle}`;
            } else {
                this.meetingEnable = 1;
                meetingBtn.innerHTML = `<i class="fas fa-store-alt fa-lg"></i>${meetingBtnTitle}`;
            }
        };
        meetingBtn.addEventListener('click', meetingBtnE);


        let snapBtn = document.getElementById('snap-link');
        let snapBtnTitle = `<span class="nav-title ms-2 d-md-none">${Lang.val.snapshot}</span>`;
        snapBtn.title = Lang.val.snapshot;
        snapBtn.innerHTML = `<i class="fas fa-file-csv fa-lg"></i>${snapBtnTitle}`;
        let snapBtnE = () => {
            let rows = [
                ['id', 'title', 'domain', 'type', 'meetings', 'participants', 'cpu', 'ram', 'freedisk'],
            ];
            this.servers.forEach(s => {
                let row = [s.id, s.title, s.domain, s.type, s.meetings.length, s.participantCount, s.cpu, s.ram, s.disk];
                rows.push(row);
            });
            let date = new Date();
            let d = {
                y: pad(date.getFullYear()),
                m: pad(date.getMonth()),
                d: pad(date.getDay()),
                h: pad(date.getHours()),
                mm: pad(date.getMinutes()),
                s: pad(date.getSeconds()),
            };
            let fname = `bams-${d.y}${d.m}${d.d}-${d.h}${d.mm}${d.s}.csv`;
            let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map(e => e.join(',')).join('\n');
            let encodedUri = encodeURI(csvContent);
            let link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', fname);
            link.classList.add('d-none');
            document.body.appendChild(link);
            link.click();
            link.remove();
        };
        snapBtn.addEventListener('click', snapBtnE);


        let pad = function (n, width = 2, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };


        this._serverWrapper = main;
        this._node = this._dom;
    }

    _addServer(server) {
        this._serverWrapper.appendChild(server.node);
    }

    update() {
        let url = `api/server-list.php`;
        this.request(url, dom => {
            this._dom = dom.querySelector('response');
            this.servers = [];
            this.removeChilds(this._serverWrapper);
            this._fetchServers();
            this.servers.forEach(this._addServer, this);
            this.participantEnable = this._participantEnable;
            this.meetingEnable = this._meetingEnable;
            this.updateDelay = this._updateDelay;
        });
    }

    updateServers() {
        this.servers.forEach(s => s.update());
    }

}