import Node from './node.js';
import BMeeting from './bmeeting.js';
import AMeeting from './ameeting.js';
import Lang from './language.js';

export default class Server extends Node {

    constructor(dom) {
        super(dom);
        this.meetings = [];
        this.participantCount = 0;
        this.disk = 0;
        this.cpu = 0;
        this.ram = 0;
        this._fetch();
        this._createNode();
        this.update();
    }

    _fetch() {
        this.id = this._find('id');
        this.type = this._find('type');
        this.title = this._find('servertitle');
        this.domain = this._find('domain');
    }

    _fetchMeetings() {
        let meetingsDom = this._dom.querySelectorAll('meeting');
        meetingsDom.forEach(m => {
            let meeting;
            if (this.type == 'B')
                meeting = new BMeeting(m, this.id);
            else if (this.type == 'A')
                meeting = new AMeeting(m, this.id);
            this.meetings.push(meeting);
        });
    }

    _createNode() {
        let card = document.createElement('div');
        let cardHeader = document.createElement('h5');
        let cardBody = document.createElement('div');
        let row = document.createElement('div');
        let info = document.createElement('div');
        let title, type;

        card.className = 'card server shadow-sm';
        cardHeader.className = 'card-header';
        cardBody.className = 'card-body';
        row.className = 'row mt-3 meeting-wrapper';

        title = (this.title == '') ? `${this.domain}` : `${this.domain} - ${this.title}`;
        type = (this.type == 'A') ? 'AdobeConnect' : 'BigBlueButton';
        cardHeader.innerHTML = `
            <span class="header-icon ger-bg1"><i class="fas fa-server"></i></span>
            <span class="header-title ms-2 me-2">${title}</span>
            <span class="badge rounded-pill bg-success d-none d-md-block">${type}</span>
        `;

        info.className = 'row';
        info.innerHTML = `
            <div class="col-md-6">
                <div class="row">
                    <div class="col-sm mb-2">
                        <div class="info-item info-meeting-count">
                            <span class="info-icon ger-bg5"><i class="fas fa-store-alt"></i></span>
                            <span class="info-title">${Lang.val.meetings}</span>
                            <span class="badge rounded-pill me-2">0</span>
                        </div>
                    </div>
                    <div class="col-sm mb-2">
                        <div class="info-item info-participant-count">
                            <span class="info-icon ger-bg5"><i class="fas fa-users"></i></span>
                            <span class="info-title">${Lang.val.participants}</span>
                            <span class="badge rounded-pill me-2">0</span>
                        </div>
                    </div>
                    <div class="col-sm mb-2">
                        <div class="info-item disk">
                            <span class="info-icon ger-bg5"><i class="fas fa-inbox"></i></span>
                            <span class="info-title">${Lang.val.freeSpace}</span>
                            <span dir="ltr" class="badge rounded-pill me-2">0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div dir="ltr" class="col-md-6">
                <div class="row">
                    <div class="col-md-1 col-2">
                        <span class="resource-label">CPU: </span>
                    </div>
                    <div class="col">
                        <div class="progress cpu mt-1 mb-2">
                            <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%;" aria-valuenow="0"
                                aria-valuemin="0" aria-valuemax="100">0%</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1 col-2">
                        <span class="resource-label">RAM: </span>
                    </div>
                    <div class="col">
                        <div class="progress ram mt-1 mb-2">
                            <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%;" aria-valuenow="0"
                                aria-valuemin="0" aria-valuemax="100">0%</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cardBody.appendChild(info);
        cardBody.appendChild(row);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        this._meetingWrapper = row;
        this._node = card;
    }

    _cleanMeetingWrapper() {
        for (let n of this._meetingWrapper.children) {
            let found = false;
            for (let m of this.meetings) {
                if (m.node.getAttribute('data-id') == n.getAttribute('data-id')) {
                    found = true;
                    break;
                }
            }
            if (!found)
                n.remove();
        }
    }

    _addMeeting(meeting) {
        let id = `m-${this.id}-${meeting.id}`;
        let old = this._meetingWrapper.querySelector(`.meeting-col[data-id="${id}"`);
        if (old)
            this._meetingWrapper.replaceChild(meeting.node, old);
        else
            this._meetingWrapper.appendChild(meeting.node);
    }

    _setResourceValue(select, val) {
        let div, prog, color;
        div = this.node.querySelector(select);

        if (val < 60)
            color = 'bg-success';
        else if (val < 80)
            color = 'bg-warning';
        else
            color = 'bg-danger';

        prog = div.querySelector('.progress-bar');
        prog.className = 'progress-bar progress-bar-striped ' + color;
        prog.style.width = `${val}%`;
        prog.setAttribute('aria-valuenow', val);
        prog.innerHTML = `${val}%`;
    }

    _setInfoValue(select, val) {
        let div, badge;
        div = this.node.querySelector(select);
        badge = div.querySelector('.badge');
        badge.innerText = val;
    }

    _updateInfoValues() {
        let meetingCount = this.meetings.length;
        let participantCount = 0;
        this.meetings.forEach(m => {
            participantCount += m.participantCount;
        });
        this.participantCount = participantCount;
        this._setInfoValue('.info-meeting-count', meetingCount);
        this._setInfoValue('.info-participant-count', participantCount);
    }

    _getResource() {
        let url = `api/resource.php?id=${this.id}`;
        this.request(url, dom => {
            let data = dom.querySelector('data');
            let reg;
            if (data) {
                reg = /(\d+)-(\d+)-(\d+)/i.exec(data.innerText);
                if (reg) {
                    this.disk = (reg[3] / 1024).toFixed(2);
                    this.cpu = reg[1];
                    this.ram = reg[2];
                    this._setResourceValue('.cpu', reg[1]);
                    this._setResourceValue('.ram', reg[2]);
                    this._setInfoValue('.disk', this.disk + ' GB');
                }
            }
        });
    }

    update() {
        let url = `api/server-item.php?id=${this.id}`;
        this.request(url, dom => {
            this._dom = dom.querySelector('response');
            this.meetings = [];
            this._fetchMeetings();
            this._cleanMeetingWrapper();
            this.meetings.forEach(this._addMeeting, this);
            this._updateInfoValues();
            this._getResource();
        });
    }

}