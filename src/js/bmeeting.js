import Node from './node.js';
import Lang from './language.js';
import Attendee from './attendee.js';

export default class BMeeting extends Node {

    constructor(dom, serverId) {
        super(dom);
        this.serverId = serverId;
        this.attendees = [];
        this._participantEnable = localStorage.getItem('participantEnable') || 1;
        this._fetch();
        this._createNode();
    }

    _fetch() {
        this.id = this._find('meetingid');
        this.title = this._find('bbb-context');
        this.name = this._find('meetingname');
        this.moderatorPassword = this._find('moderatorpw');
        this.attendeePassword = this._find('attendeepw');
        this.origin = this._find('bbb-origin');
        this.originServerName = this._find('bbb-origin-server-name');
        this.createDate = this._find('createdate');
        this.createTime = this._find('createtime');
        this.recording = this._find('recording');
        this.moderatorCount = this._find('moderatorcount', false);
        this.participantCount = this._find('participantcount', false);
        this.listenerCount = this._find('listenercount', false);
        this.voiceParticipantCount = this._find('voiceparticipantcount', false);
        this.videoCount = this._find('videocount', false);
        this.duration = this._find('duration');
        this.join = this._find('join');
        this._fetchAttendees();
    }

    _fetchAttendees() {
        let attendeesDom = this._dom.querySelectorAll('attendee');
        attendeesDom.forEach(a => {
            let attendee = new Attendee(a);
            this.attendees.push(attendee);
        });
    }

    _createNode() {
        let col = document.createElement('div');
        let row = document.createElement('div');
        let meetingCol = document.createElement('div');
        let meetingCard = document.createElement('div');
        let meetingUl = document.createElement('ul');
        let attendeesCol = document.createElement('div');
        let attendeesCard = document.createElement('div');
        let attendeesUl = document.createElement('ul');

        col.className = `col-md-4 meeting-col`;
        col.setAttribute('data-id', `m-${this.serverId}-${this.id}`);
        row.className = 'row';
        meetingCol.className = 'col-sm-6 meeting-details-col cuspad';
        meetingCard.className = 'card meeting';
        meetingUl.className = 'list-group list-group-flush';
        attendeesCol.className = 'col-sm-6 attendees-col';
        attendeesCard.className = 'card attendees';
        attendeesUl.className = 'list-group list-group-flush';

        if (this._participantEnable == 0) {
            col.classList.replace('col-md-4', 'col-md-2');
            attendeesCol.classList.add('d-none');
            meetingCol.classList.replace('col-sm-6', 'col-12');
            meetingCol.classList.remove('cuspad');
        }

        meetingUl.appendChild(this._createSimpleItem(this.title, 'active bbb-context'));
        meetingUl.appendChild(this._createSimpleItem(this.name, 'meetingname'));
        meetingUl.appendChild(this._createSimpleItem(this.origin, 'bbb-origin'));
        meetingUl.appendChild(this._createSimpleItem(this.originServerName, 'bbb-origin-server-name'));
        meetingUl.appendChild(this._createSimpleItem(this.createDate, 'createdate'));
        // meetingUl.appendChild(this._createBadgeItem(Lang.val.recording, this.recording, 'recording'));
        // meetingUl.appendChild(this._createBadgeItem(Lang.val.duration, this.duration, 'duration'));
        meetingUl.appendChild(this._createBadgeItem(Lang.val.moderatorCount, this.moderatorCount, 'moderatorcount'));
        meetingUl.appendChild(this._createBadgeItem(Lang.val.participantCount, this.participantCount, 'participantcount'));
        // meetingUl.appendChild(this._createBadgeItem(Lang.val.listenerCount, this.listenerCount, 'listenercount'));
        // meetingUl.appendChild(this._createBadgeItem(Lang.val.voiceParticipantCount, this.voiceParticipantCount, 'voiceparticipantcount'));
        meetingUl.appendChild(this._createBadgeItem(Lang.val.videoCount, this.videoCount, 'videocount'));
        meetingUl.appendChild(this._createLinkItem(Lang.val.join, this.join, 'list-group-item-primary join'));

        this.attendees.forEach(a => {
            attendeesUl.appendChild(a.node);
        });

        meetingCard.appendChild(meetingUl);
        meetingCol.appendChild(meetingCard);
        attendeesCard.appendChild(attendeesUl);
        attendeesCol.appendChild(attendeesCard);
        row.appendChild(meetingCol);
        row.appendChild(attendeesCol);
        col.append(row);
        this._node = col;
    }

}