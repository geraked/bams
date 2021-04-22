import Node from './node.js';

export default class Attendee extends Node {

    constructor(dom) {
        super(dom);
        this._fetch();
        this._createNode();
    }

    _fetch() {
        this.name = this._find('fullname');
        this.id = this._find('userid');
        this.role = this._find('role');
        this.isPresenter = this._find('ispresenter');
        this.isListeningOnly = this._find('islisteningonly');
        this.hasJoinedVoice = this._find('hasjoinedvoice');
        this.hasVideo = this._find('hasvideo');
    }

    _createNode() {
        let className = `attendee-${this.id}`;
        let status = '';

        if (this.role == 'VIEWER')
            status += '<i class="fas fa-user"></i> ';
        if (this.role == 'MODERATOR')
            status += '<i class="fas fa-user-tie"></i> ';
        if (this.isPresenter == 'true')
            status += '<i class="fas fa-chalkboard"></i> ';
        if (this.isListeningOnly == 'true')
            status += '<i class="fas fa-headphones"></i> ';
        if (this.hasJoinedVoice == 'true')
            status += '<i class="fas fa-microphone"></i> ';
        if (this.hasVideo == 'true')
            status += '<i class="fas fa-video"></i>';

        this._node = this._createBadgeItem(this.name, status, className);
    }

}