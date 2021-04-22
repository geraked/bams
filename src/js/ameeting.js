import Node from './node.js';
import Lang from './language.js';

export default class AMeeting extends Node {

    constructor(dom, serverId) {
        super(dom);
        this.serverId = serverId;
        this._fetch();
        this._createNode();
    }

    _fetch() {
        this.id = this._find('sco-id');
        this.name = this._find('name');
        this.duration = this._find('length-minutes');
        this.participantCount = this._find('participantcount', false);
        this.dateBegin = this._find('date-begin');
        this.url = this._find('url-path');
    }

    _createNode() {
        let col = document.createElement('div');
        let row = document.createElement('div');
        let meetingCol = document.createElement('div');
        let meetingCard = document.createElement('div');
        let meetingUl = document.createElement('ul');

        col.className = `col-md-2 meeting-col`;
        col.setAttribute('data-id', `m-${this.serverId}-${this.id}`);
        row.className = 'row';
        meetingCol.className = 'col-12 meeting-details-col';
        meetingCard.className = 'card meeting';
        meetingUl.className = 'list-group list-group-flush';

        meetingUl.appendChild(this._createSimpleItem(this.name, 'active name'));
        meetingUl.appendChild(this._createSimpleItem(this.dateBegin, 'date-begin'));
        meetingUl.appendChild(this._createBadgeItem(Lang.val.duration, this.duration, 'duration'));
        meetingUl.appendChild(this._createBadgeItem(Lang.val.participantCount, this.participantCount, 'active-participants'));
        meetingUl.appendChild(this._createLinkItem(Lang.val.join, this.url, 'list-group-item-primary join'));

        meetingCard.appendChild(meetingUl);
        meetingCol.appendChild(meetingCard);
        row.appendChild(meetingCol);
        col.append(row);
        this._node = col;
    }

}