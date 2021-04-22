export default class Lang {

    static _langs = {

        en: {
            lang_dir: 'ltr',
            lang_name: 'English',
            language: 'Language',
            duration: 'Duration',
            recording: 'Recording',
            freeSpace: 'Free Space',
            participants: 'Participants',
            meetings: 'Meetings',
            moderatorCount: 'Moderators',
            participantCount: 'Participants',
            listenerCount: 'Listeners',
            voiceParticipantCount: 'Voice Participants',
            videoCount: 'Videos',
            join: 'Join',
            responseError: 'An error occurred!',
            username: 'Username',
            password: 'Password',
            userEmpty: 'Enter the username',
            passEmpty: 'Enter the password',
            loginErr: 'Username or Password is incorrect!',
            logOut: 'Log Out',
            logIn: 'Login',
            darkLight: 'Dark / Light mode',
            participantShowHide: 'Show / Hide participants',
            meetingShowHide: 'Show / Hide meetings',
            snapshot: 'Snapshot',
        },

        fa: {
            lang_dir: 'rtl',
            lang_name: 'فارسی',
            language: 'زبان',
            duration: 'مدت زمان',
            recording: 'امکان ضبط',
            freeSpace: 'فضای خالی',
            participants: 'شرکت‌کنندگان',
            meetings: 'جلسه‌ها',
            moderatorCount: 'تعداد مجریان',
            participantCount: 'تعداد شرکت‌کنندگان',
            listenerCount: 'تعداد شنوندگان',
            voiceParticipantCount: 'تعداد گویندگان',
            videoCount: 'تعداد تصویر',
            join: 'پیوستن',
            responseError: 'خطایی رخ داده است!',
            username: 'نام کاربری',
            password: 'گذرواژه',
            userEmpty: 'نام کاربری را وارد نمایید',
            passEmpty: 'گذرواژه را وارد نمایید',
            loginErr: 'نام کاربری یا گذرواژه اشتباه است!',
            logOut: 'خروج',
            logIn: 'ورود',
            darkLight: 'حالت تیره / روشن',
            participantShowHide: 'نمایش / پنهان‌سازی شرکت‌کنندگان',
            meetingShowHide: 'نمایش / پنهان‌سازی جلسه‌ها',
            snapshot: 'Snapshot',
        },

    };

    static _values = this._langs['en'];
    static _lang = 'en';

    static set lang(x) {
        if (!(x in this._langs))
            return;

        this._values = this._langs[x];
        this._lang = x;

        if (x == localStorage.getItem('lang')) {
            document.documentElement.lang = x;
            document.documentElement.dir = this.val.lang_dir;

            let rtlBoot = document.getElementById('boot-rtl');
            let ltrBoot = document.getElementById('boot-ltr');
            if (this.val.lang_dir == 'rtl')
                ltrBoot.remove();
            else
                rtlBoot.remove();
        } else {
            localStorage.setItem('lang', x);
            location.reload();
        }
    }

    static get lang() {
        return this._lang;
    }

    static get val() {
        return this._values;
    }

}