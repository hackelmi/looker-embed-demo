/* MIT License

Copyright (c) 2023 Looker Data Sciences, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

// PAGE NAVIGATION
//
document.addEventListener('DOMContentLoaded', () => {
  // Page Navigation: Switching between different HTML pages
  const pageButtons = document.querySelectorAll('.page-navigation-box button');

  pageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetPage = button.dataset.page;

      // Toggle active class for buttons
      pageButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      // Change the page based on the button clicked
      if (targetPage === 'index') {
        window.location.href = 'index.html';
      } else if (targetPage === 'setup') {
        window.location.href = 'setup.html';
      } else if (targetPage === 'embed') {
        window.location.href = 'embed.html';
      } else if (targetPage === 'demo') {
        window.location.href = 'demo.html';
      }
    });
  });
});
//
//
//
//
//
// SETUP PAGE
//
document.addEventListener('DOMContentLoaded', () => {
  // Default values setup
  var initialValueSetup = {
    logoUrl: '',
    logoColor: '#414BB2',
    primaryColor: '#202124',
    secondaryColor: '#f3f3f3',
    tertiaryColor: '#ffffff',
    buttonDemo: 'Request Demo',
    subPages: {
      subPage1: {
        label: 'Dashboard',
        icon: '→',
      },
      subPage2: {
        label: 'My Services',
        icon: '→',
      },
      subPage3: {
        label: 'About Looker',
        icon: '→',
      },
      subPage4: {
        label: 'About Google',
        icon: '→',
      },
      subPage5: {
        label: 'My Team',
        icon: '→',
      },
    },
  };

  // Form submission handler for saving settings in setup.html
  $('#setup-form').on('submit', function (evt) {
    evt.preventDefault();

    // Collect form values
    const settings = {
      logoUrl: $('#logo-url').val(),
      logoColor: $('#logo-color').val(),
      primaryColor: $('#primary-color').val(),
      secondaryColor: $('#secondary-color').val(),
      tertiaryColor: $('#tertiary-color').val(),
      buttonDemo: $('#button-demo').val(),
      subPages: {
        subPage1: {
          label: $('#sub-page-1').val() || '',
          icon: $('#sub-page-1-icon').val() || '',
        },
        subPage2: {
          label: $('#sub-page-2').val() || '',
          icon: $('#sub-page-2-icon').val() || '',
        },
        subPage3: {
          label: $('#sub-page-3').val() || '',
          icon: $('#sub-page-3-icon').val() || '',
        },
        subPage4: {
          label: $('#sub-page-4').val() || '',
          icon: $('#sub-page-4-icon').val() || '',
        },
        subPage5: {
          label: $('#sub-page-5').val() || '',
          icon: $('#sub-page-5-icon').val() || '',
        },
      },
    };

    // Save settings in localStorage
    localStorage.setItem('setupSettings', JSON.stringify(settings));

    // Notify user that settings have been saved
    alert('Setup configuration saved!');
  });

  // Retrieve saved settings from localStorage and populate the form
  let setupSettings = localStorage.getItem('setupSettings');

  // If there are no saved settings in localStorage, use the default values
  setupSettings = setupSettings ? JSON.parse(setupSettings) : initialValueSetup;

  $('#logo-url').val(setupSettings.logoUrl);
  $('#logo-color').val(setupSettings.logoColor);
  $('#primary-color').val(setupSettings.primaryColor);
  $('#secondary-color').val(setupSettings.secondaryColor);
  $('#tertiary-color').val(setupSettings.tertiaryColor);
  $('#button-demo').val(setupSettings.buttonDemo);

  // Populate sub-pages
  for (let i = 1; i <= 5; i++) {
    const subPage = setupSettings.subPages[`subPage${i}`];
    if (subPage) {
      $(`#sub-page-${i}`).val(subPage.label || '');
      $(`#sub-page-${i}-icon`).val(subPage.icon || '');
    }
  }
});
//
//
//
//
//
// EMBED PAGE
//
document.addEventListener('DOMContentLoaded', () => {
  var definitions = [
    {
      sort: { ui: 01, qs: 00, hash: 00 },
      id: 'embed_secret',
      schema: {
        required: true,
        description: 'Important: Always revoke after your demo!',
      },
    },
    {
      sort: { ui: 02, qs: 00, hash: 01 },
      id: 'host',
      noJSON: true,
      schema: {
        required: true,
        description: "Format: 'customer.looker.com'",
      },
    },
    {
      sort: { ui: 03, qs: 00, hash: 02 },
      id: 'embed_path',
      noJSON: true,
      schema: {
        required: true,
        description:
          "Format: '/embed/asset/id' ... Add '?&theme=theme_name' to append theme",
      },
      fn: (path) => '/login/embed/' + encodeURIComponent(path),
    },
    {
      sort: { ui: 98, qs: 11, hash: 03 },
      id: 'nonce',
      schema: {
        required: false,
        description: 'Unique Value',
      },
      fn: (x) => x || nonce(16),
    },
    {
      sort: { ui: 99, qs: 12, hash: 04 },
      id: 'time',
      schema: {
        required: false,
        description: 'Epoch timestamp',
      },
      fn: (x) => parseInt(x) || parseInt(Date.now() / 1000),
    },
    {
      sort: { ui: 90, qs: 13, hash: 05 },
      id: 'session_length',
      schema: {
        required: true,
        type: 'number',
        minimum: 1,
        description: 'Format: seconds',
      },
    },
    {
      sort: { ui: 04, qs: 14, hash: 06 },
      id: 'external_user_id',
      schema: {
        required: true,
        description: 'External ID for embed user',
      },
    },
    {
      sort: { ui: 05, qs: 31, hash: 00 },
      id: 'first_name',
      schema: { required: true, description: 'First name for embed user' },
    },
    {
      sort: { ui: 06, qs: 32, hash: 00 },
      id: 'last_name',
      schema: { required: true, description: 'Last name for embed user' },
    },
    {
      sort: { ui: 07, qs: 21, hash: 07 },
      id: 'permissions',
      schema: {
        type: 'array',
        required: true,
        uniqueItems: true,
        items: {
          type: 'string',
          enum: [
            'access_data',
            'see_looks',
            'see_user_dashboards',
            'see_lookml_dashboards',
            'explore',
            'create_table_calculations',
            'download_with_limit',
            'download_without_limit',
            'see_drill_overlay',
            'save_content',
            'embed_browse_spaces',
            'schedule_look_emails',
            'schedule_external_look_emails',
            'send_to_sftp',
            'send_to_s3',
            'send_outgoing_webhook',
            'see_sql',
            'send_to_integration',
            'create_alerts',
            'embed_save_shared_space',
            'clear_cache_refresh',
            'create_custom_fields',
          ],
        },
      },
    },
    {
      sort: { ui: 08, qs: 22, hash: 08 },
      id: 'models',
      schema: {
        required: true,
        pattern: '^[-A-Za-z0-9_]+(,\\s*[-A-Za-z0-9_]+)*$',
      },
      fn: (s) => s.split(/,\s*/),
      description: 'Model ID, format: comma-delimit for multiple models',
    },
    {
      sort: { ui: 09, qs: 23, hash: 09 },
      id: 'group_ids',
      schema: {
        required: false,
        pattern: '^$|^[0-9]+(,\\s*[0-9]+)*$',
        description: 'Group ID, format: comma-delimit for multiple models',
      },
      fn: (s) => (s == '' ? [] : s.split(/,\s*/).map((s) => parseInt(s))),
    },
    {
      sort: { ui: 10, qs: 24, hash: 10 },
      id: 'external_group_id',
      schema: {
        required: false,
        description:
          'External Group ID, format: comma-delimit for multiple groups',
      },
      fn: (x) => x || '',
    },
    {
      sort: { ui: 11, qs: 25, hash: 11 },
      id: 'user_attributes',
      schema: {
        required: false,
        type: 'array',
        format: 'table',
        items: {
          type: 'object',
          description: 'Format: user_attribute / value',
          properties: {
            field: { type: 'string' },
            value: { type: 'string' },
          },
        },
      },
      fn: (a) => (a || []).reduce(objByOf(['field'], 'value'), {}),
    },
    {
      sort: { ui: 12, qs: 26, hash: 12 },
      id: 'access_filters',
      schema: {
        type: 'array',
        required: false,
        format: 'table',
        items: {
          type: 'object',
          description: 'Deprecated',
          properties: {
            model: { type: 'string' },
            field: { type: 'string' },
            value: { type: 'string' },
          },
        },
      },
      fn: (a) => (a || []).reduce(objByOf(['model', 'field'], 'value'), {}),
    },
    {
      sort: { ui: 13, qs: 27, hash: 00 },
      id: 'user_timezone',
      schema: {
        type: 'string',
        required: false,
        enum: [
          'UTC',
          'America/Los_Angeles',
          'America/Denver',
          'America/Chicago',
          'America/New_York',
          'America/Phoenix',
          'Pacific/Honolulu',
          'America/Juneau',
          'Africa/Abidjan',
          'Africa/Accra',
          'Africa/Addis_Ababa',
          'Africa/Algiers',
          'Africa/Asmara',
          'Africa/Asmera',
          'Africa/Bamako',
          'Africa/Bangui',
          'Africa/Banjul',
          'Africa/Bissau',
          'Africa/Blantyre',
          'Africa/Brazzaville',
          'Africa/Bujumbura',
          'Africa/Cairo',
          'Africa/Casablanca',
          'Africa/Ceuta',
          'Africa/Conakry',
          'Africa/Dakar',
          'Africa/Dar_es_Salaam',
          'Africa/Djibouti',
          'Africa/Douala',
          'Africa/El_Aaiun',
          'Africa/Freetown',
          'Africa/Gaborone',
          'Africa/Harare',
          'Africa/Johannesburg',
          'Africa/Juba',
          'Africa/Kampala',
          'Africa/Khartoum',
          'Africa/Kigali',
          'Africa/Kinshasa',
          'Africa/Lagos',
          'Africa/Libreville',
          'Africa/Lome',
          'Africa/Luanda',
          'Africa/Lubumbashi',
          'Africa/Lusaka',
          'Africa/Malabo',
          'Africa/Maputo',
          'Africa/Maseru',
          'Africa/Mbabane',
          'Africa/Mogadishu',
          'Africa/Monrovia',
          'Africa/Nairobi',
          'Africa/Ndjamena',
          'Africa/Niamey',
          'Africa/Nouakchott',
          'Africa/Ouagadougou',
          'Africa/Porto-Novo',
          'Africa/Sao_Tome',
          'Africa/Timbuktu',
          'Africa/Tripoli',
          'Africa/Tunis',
          'Africa/Windhoek',
          'America/Adak',
          'America/Anchorage',
          'America/Anguilla',
          'America/Antigua',
          'America/Araguaina',
          'America/Argentina/Buenos_Aires',
          'America/Argentina/Catamarca',
          'America/Argentina/ComodRivadavia',
          'America/Argentina/Cordoba',
          'America/Argentina/Jujuy',
          'America/Argentina/La_Rioja',
          'America/Argentina/Mendoza',
          'America/Argentina/Rio_Gallegos',
          'America/Argentina/Salta',
          'America/Argentina/San_Juan',
          'America/Argentina/San_Luis',
          'America/Argentina/Tucuman',
          'America/Argentina/Ushuaia',
          'America/Aruba',
          'America/Asuncion',
          'America/Atikokan',
          'America/Atka',
          'America/Bahia',
          'America/Bahia_Banderas',
          'America/Barbados',
          'America/Belem',
          'America/Belize',
          'America/Blanc-Sablon',
          'America/Boa_Vista',
          'America/Bogota',
          'America/Boise',
          'America/Buenos_Aires',
          'America/Cambridge_Bay',
          'America/Campo_Grande',
          'America/Cancun',
          'America/Caracas',
          'America/Catamarca',
          'America/Cayenne',
          'America/Cayman',
          'America/Chihuahua',
          'America/Coral_Harbour',
          'America/Cordoba',
          'America/Costa_Rica',
          'America/Creston',
          'America/Cuiaba',
          'America/Curacao',
          'America/Danmarkshavn',
          'America/Dawson',
          'America/Dawson_Creek',
          'America/Detroit',
          'America/Dominica',
          'America/Edmonton',
          'America/Eirunepe',
          'America/El_Salvador',
          'America/Ensenada',
          'America/Fort_Nelson',
          'America/Fort_Wayne',
          'America/Fortaleza',
          'America/Glace_Bay',
          'America/Godthab',
          'America/Goose_Bay',
          'America/Grand_Turk',
          'America/Grenada',
          'America/Guadeloupe',
          'America/Guatemala',
          'America/Guayaquil',
          'America/Guyana',
          'America/Halifax',
          'America/Havana',
          'America/Hermosillo',
          'America/Indiana/Indianapolis',
          'America/Indiana/Knox',
          'America/Indiana/Marengo',
          'America/Indiana/Petersburg',
          'America/Indiana/Tell_City',
          'America/Indiana/Vevay',
          'America/Indiana/Vincennes',
          'America/Indiana/Winamac',
          'America/Indianapolis',
          'America/Inuvik',
          'America/Iqaluit',
          'America/Jamaica',
          'America/Jujuy',
          'America/Kentucky/Louisville',
          'America/Kentucky/Monticello',
          'America/Knox_IN',
          'America/Kralendijk',
          'America/La_Paz',
          'America/Lima',
          'America/Louisville',
          'America/Lower_Princes',
          'America/Maceio',
          'America/Managua',
          'America/Manaus',
          'America/Marigot',
          'America/Martinique',
          'America/Matamoros',
          'America/Mazatlan',
          'America/Mendoza',
          'America/Menominee',
          'America/Merida',
          'America/Metlakatla',
          'America/Mexico_City',
          'America/Miquelon',
          'America/Moncton',
          'America/Monterrey',
          'America/Montevideo',
          'America/Montreal',
          'America/Montserrat',
          'America/Nassau',
          'America/Nipigon',
          'America/Nome',
          'America/Noronha',
          'America/North_Dakota/Beulah',
          'America/North_Dakota/Center',
          'America/North_Dakota/New_Salem',
          'America/Ojinaga',
          'America/Panama',
          'America/Pangnirtung',
          'America/Paramaribo',
          'America/Port-au-Prince',
          'America/Port_of_Spain',
          'America/Porto_Acre',
          'America/Porto_Velho',
          'America/Puerto_Rico',
          'America/Rainy_River',
          'America/Rankin_Inlet',
          'America/Recife',
          'America/Regina',
          'America/Resolute',
          'America/Rio_Branco',
          'America/Rosario',
          'America/Santa_Isabel',
          'America/Santarem',
          'America/Santiago',
          'America/Santo_Domingo',
          'America/Sao_Paulo',
          'America/Scoresbysund',
          'America/Shiprock',
          'America/Sitka',
          'America/St_Barthelemy',
          'America/St_Johns',
          'America/St_Kitts',
          'America/St_Lucia',
          'America/St_Thomas',
          'America/St_Vincent',
          'America/Swift_Current',
          'America/Tegucigalpa',
          'America/Thule',
          'America/Thunder_Bay',
          'America/Tijuana',
          'America/Toronto',
          'America/Tortola',
          'America/Vancouver',
          'America/Virgin',
          'America/Whitehorse',
          'America/Winnipeg',
          'America/Yakutat',
          'America/Yellowknife',
          'Antarctica/Casey',
          'Antarctica/Davis',
          'Antarctica/DumontDUrville',
          'Antarctica/Macquarie',
          'Antarctica/Mawson',
          'Antarctica/McMurdo',
          'Antarctica/Palmer',
          'Antarctica/Rothera',
          'Antarctica/South_Pole',
          'Antarctica/Syowa',
          'Antarctica/Troll',
          'Antarctica/Vostok',
          'Arctic/Longyearbyen',
          'Asia/Aden',
          'Asia/Almaty',
          'Asia/Amman',
          'Asia/Anadyr',
          'Asia/Aqtau',
          'Asia/Aqtobe',
          'Asia/Ashgabat',
          'Asia/Ashkhabad',
          'Asia/Baghdad',
          'Asia/Bahrain',
          'Asia/Baku',
          'Asia/Bangkok',
          'Asia/Barnaul',
          'Asia/Beirut',
          'Asia/Bishkek',
          'Asia/Brunei',
          'Asia/Calcutta',
          'Asia/Chita',
          'Asia/Choibalsan',
          'Asia/Chongqing',
          'Asia/Chungking',
          'Asia/Colombo',
          'Asia/Dacca',
          'Asia/Damascus',
          'Asia/Dhaka',
          'Asia/Dili',
          'Asia/Dubai',
          'Asia/Dushanbe',
          'Asia/Gaza',
          'Asia/Harbin',
          'Asia/Hebron',
          'Asia/Ho_Chi_Minh',
          'Asia/Hong_Kong',
          'Asia/Hovd',
          'Asia/Irkutsk',
          'Asia/Istanbul',
          'Asia/Jakarta',
          'Asia/Jayapura',
          'Asia/Jerusalem',
          'Asia/Kabul',
          'Asia/Kamchatka',
          'Asia/Karachi',
          'Asia/Kashgar',
          'Asia/Kathmandu',
          'Asia/Katmandu',
          'Asia/Khandyga',
          'Asia/Kolkata',
          'Asia/Krasnoyarsk',
          'Asia/Kuala_Lumpur',
          'Asia/Kuching',
          'Asia/Kuwait',
          'Asia/Macao',
          'Asia/Macau',
          'Asia/Magadan',
          'Asia/Makassar',
          'Asia/Manila',
          'Asia/Muscat',
          'Asia/Nicosia',
          'Asia/Novokuznetsk',
          'Asia/Novosibirsk',
          'Asia/Omsk',
          'Asia/Oral',
          'Asia/Phnom_Penh',
          'Asia/Pontianak',
          'Asia/Pyongyang',
          'Asia/Qatar',
          'Asia/Qyzylorda',
          'Asia/Rangoon',
          'Asia/Riyadh',
          'Asia/Saigon',
          'Asia/Sakhalin',
          'Asia/Samarkand',
          'Asia/Seoul',
          'Asia/Shanghai',
          'Asia/Singapore',
          'Asia/Srednekolymsk',
          'Asia/Taipei',
          'Asia/Tashkent',
          'Asia/Tbilisi',
          'Asia/Tehran',
          'Asia/Tel_Aviv',
          'Asia/Thimbu',
          'Asia/Thimphu',
          'Asia/Tokyo',
          'Asia/Ujung_Pandang',
          'Asia/Ulaanbaatar',
          'Asia/Ulan_Bator',
          'Asia/Urumqi',
          'Asia/Ust-Nera',
          'Asia/Vientiane',
          'Asia/Vladivostok',
          'Asia/Yakutsk',
          'Asia/Yekaterinburg',
          'Asia/Yerevan',
          'Atlantic/Azores',
          'Atlantic/Bermuda',
          'Atlantic/Canary',
          'Atlantic/Cape_Verde',
          'Atlantic/Faeroe',
          'Atlantic/Faroe',
          'Atlantic/Jan_Mayen',
          'Atlantic/Madeira',
          'Atlantic/Reykjavik',
          'Atlantic/South_Georgia',
          'Atlantic/St_Helena',
          'Atlantic/Stanley',
          'Australia/ACT',
          'Australia/Adelaide',
          'Australia/Brisbane',
          'Australia/Broken_Hill',
          'Australia/Canberra',
          'Australia/Currie',
          'Australia/Darwin',
          'Australia/Eucla',
          'Australia/Hobart',
          'Australia/LHI',
          'Australia/Lindeman',
          'Australia/Lord_Howe',
          'Australia/Melbourne',
          'Australia/NSW',
          'Australia/North',
          'Australia/Perth',
          'Australia/Queensland',
          'Australia/South',
          'Australia/Sydney',
          'Australia/Tasmania',
          'Australia/Victoria',
          'Australia/West',
          'Australia/Yancowinna',
          'Brazil/Acre',
          'Brazil/DeNoronha',
          'Brazil/East',
          'Brazil/West',
          'CET',
          'CST6CDT',
          'Canada/Atlantic',
          'Canada/Central',
          'Canada/East-Saskatchewan',
          'Canada/Eastern',
          'Canada/Mountain',
          'Canada/Newfoundland',
          'Canada/Pacific',
          'Canada/Saskatchewan',
          'Canada/Yukon',
          'Chile/Continental',
          'Chile/EasterIsland',
          'Cuba',
          'EET',
          'EST',
          'EST5EDT',
          'Egypt',
          'Eire',
          'Etc/GMT',
          'Etc/GMT+0',
          'Etc/GMT+1',
          'Etc/GMT+10',
          'Etc/GMT+11',
          'Etc/GMT+12',
          'Etc/GMT+2',
          'Etc/GMT+3',
          'Etc/GMT+4',
          'Etc/GMT+5',
          'Etc/GMT+6',
          'Etc/GMT+7',
          'Etc/GMT+8',
          'Etc/GMT+9',
          'Etc/GMT-0',
          'Etc/GMT-1',
          'Etc/GMT-10',
          'Etc/GMT-11',
          'Etc/GMT-12',
          'Etc/GMT-13',
          'Etc/GMT-14',
          'Etc/GMT-2',
          'Etc/GMT-3',
          'Etc/GMT-4',
          'Etc/GMT-5',
          'Etc/GMT-6',
          'Etc/GMT-7',
          'Etc/GMT-8',
          'Etc/GMT-9',
          'Etc/GMT0',
          'Etc/Greenwich',
          'Etc/UCT',
          'Etc/UTC',
          'Etc/Universal',
          'Etc/Zulu',
          'Europe/Amsterdam',
          'Europe/Andorra',
          'Europe/Astrakhan',
          'Europe/Athens',
          'Europe/Belfast',
          'Europe/Belgrade',
          'Europe/Berlin',
          'Europe/Bratislava',
          'Europe/Brussels',
          'Europe/Bucharest',
          'Europe/Budapest',
          'Europe/Busingen',
          'Europe/Chisinau',
          'Europe/Copenhagen',
          'Europe/Dublin',
          'Europe/Gibraltar',
          'Europe/Guernsey',
          'Europe/Helsinki',
          'Europe/Isle_of_Man',
          'Europe/Istanbul',
          'Europe/Jersey',
          'Europe/Kaliningrad',
          'Europe/Kiev',
          'Europe/Lisbon',
          'Europe/Ljubljana',
          'Europe/London',
          'Europe/Luxembourg',
          'Europe/Madrid',
          'Europe/Malta',
          'Europe/Mariehamn',
          'Europe/Minsk',
          'Europe/Monaco',
          'Europe/Moscow',
          'Europe/Nicosia',
          'Europe/Oslo',
          'Europe/Paris',
          'Europe/Podgorica',
          'Europe/Prague',
          'Europe/Riga',
          'Europe/Rome',
          'Europe/Samara',
          'Europe/San_Marino',
          'Europe/Sarajevo',
          'Europe/Simferopol',
          'Europe/Skopje',
          'Europe/Sofia',
          'Europe/Stockholm',
          'Europe/Tallinn',
          'Europe/Tirane',
          'Europe/Tiraspol',
          'Europe/Ulyanovsk',
          'Europe/Uzhgorod',
          'Europe/Vaduz',
          'Europe/Vatican',
          'Europe/Vienna',
          'Europe/Vilnius',
          'Europe/Volgograd',
          'Europe/Warsaw',
          'Europe/Zagreb',
          'Europe/Zaporozhye',
          'Europe/Zurich',
          'GB',
          'GB-Eire',
          'GMT',
          'GMT+0',
          'GMT-0',
          'GMT0',
          'Greenwich',
          'HST',
          'Hongkong',
          'Iceland',
          'Indian/Antananarivo',
          'Indian/Chagos',
          'Indian/Christmas',
          'Indian/Cocos',
          'Indian/Comoro',
          'Indian/Kerguelen',
          'Indian/Mahe',
          'Indian/Maldives',
          'Indian/Mauritius',
          'Indian/Mayotte',
          'Indian/Reunion',
          'Iran',
          'Israel',
          'Jamaica',
          'Japan',
          'Kwajalein',
          'Libya',
          'MET',
          'MST',
          'MST7MDT',
          'Mexico/BajaNorte',
          'Mexico/BajaSur',
          'Mexico/General',
          'NZ',
          'NZ-CHAT',
          'Navajo',
          'PRC',
          'PST8PDT',
          'Pacific/Apia',
          'Pacific/Auckland',
          'Pacific/Bougainville',
          'Pacific/Chatham',
          'Pacific/Chuuk',
          'Pacific/Easter',
          'Pacific/Efate',
          'Pacific/Enderbury',
          'Pacific/Fakaofo',
          'Pacific/Fiji',
          'Pacific/Funafuti',
          'Pacific/Galapagos',
          'Pacific/Gambier',
          'Pacific/Guadalcanal',
          'Pacific/Guam',
          'Pacific/Johnston',
          'Pacific/Kiritimati',
          'Pacific/Kosrae',
          'Pacific/Kwajalein',
          'Pacific/Majuro',
          'Pacific/Marquesas',
          'Pacific/Midway',
          'Pacific/Nauru',
          'Pacific/Niue',
          'Pacific/Norfolk',
          'Pacific/Noumea',
          'Pacific/Pago_Pago',
          'Pacific/Palau',
          'Pacific/Pitcairn',
          'Pacific/Pohnpei',
          'Pacific/Ponape',
          'Pacific/Port_Moresby',
          'Pacific/Rarotonga',
          'Pacific/Saipan',
          'Pacific/Samoa',
          'Pacific/Tahiti',
          'Pacific/Tarawa',
          'Pacific/Tongatapu',
          'Pacific/Truk',
          'Pacific/Wake',
          'Pacific/Wallis',
          'Pacific/Yap',
          'Poland',
          'Portugal',
          'ROC',
          'ROK',
          'Singapore',
          'SystemV/AST4',
          'SystemV/AST4ADT',
          'SystemV/CST6',
          'SystemV/CST6CDT',
          'SystemV/EST5',
          'SystemV/EST5EDT',
          'SystemV/HST10',
          'SystemV/MST7',
          'SystemV/MST7MDT',
          'SystemV/PST8',
          'SystemV/PST8PDT',
          'SystemV/YST9',
          'SystemV/YST9YDT',
          'Turkey',
          'UCT',
          'US/Alaska',
          'US/Aleutian',
          'US/Arizona',
          'US/Central',
          'US/East-Indiana',
          'US/Eastern',
          'US/Hawaii',
          'US/Indiana-Starke',
          'US/Michigan',
          'US/Mountain',
          'US/Pacific',
          'US/Pacific-New',
          'US/Samoa',
          'Universal',
          'W-SU',
          'WET',
          'Zulu',
        ],
      },
      fn: (tz) => tz || undefined,
    },
    {
      sort: { ui: 91, qs: 41, hash: 00 },
      id: 'force_logout_login',
      schema: {
        type: 'string',
        required: false,
        enum: ['', 'true', 'false'],
        description: 'Always set true',
      },
      fn: (a) => a !== 'false',
    },
  ]

    .map((d) =>
      set(
        d,
        'schema.type',
        get(d, 'schema.type') || (get(d, 'schema.oneOf') ? undefined : 'string')
      )
    )
    .map((d) => set(d, 'schema.propertyOrder', get(d, 'sort.ui')))
    .map((d) => set(d, 'schema.title', autoLabel(d.id)));

  var initialValueEmbed = {
    embed_path: '/embed/dashboards/1',
    session_length: 180,
    external_user_id: 'john-doe-embed',
    first_name: 'John',
    last_name: 'Doe',
    permissions: ['access_data', 'see_looks', 'see_user_dashboards'],
  };

  // Configuration for JSON editor
  var editorDef = {
    schema: {
      type: 'object',
      title: 'Embed URL',
      options: {
        disable_edit_json: true,
        disable_properties: false,
        remove_empty_properties: true,
      },
      properties: definitions
        .filter((d) => d.sort.ui)
        .reduce(objByOf('id', 'schema'), {}),
    },
    startval:
      tryJSONParse(qh('o')) ||
      tryJSONParse(localStorage.getItem('json-val')) ||
      initialValueEmbed,
    disable_collapse: true,
    disable_properties: true,
    display_required_only: true,
    keep_oneof_values: true,
    disable_edit_json: true,
  };

  // Initialize the JSON editor
  document.location.hash = '';
  var editor = new JSONEditor($('#json-editor')[0], editorDef);
  const savedUrl = localStorage.getItem('embed-url');
  if (savedUrl) {
    $('#url-textarea').val(savedUrl);
  }

  // Listen for changes in the JSON editor and save the changes to localStorage
  editor.on('change', function () {
    localStorage.setItem('json-val', JSON.stringify(editor.getValue()));
  });

  // Event listener for hash change in URL (reload editor with new data)
  window.addEventListener(
    'hashchange',
    function (evt) {
      var newVal = tryJSONParse(qh('o'));
      if (newVal) {
        editor.setValue(newVal);
      }
      document.location.hash = '';
    },
    false
  );

  // Form submission handler
  $('#build-form').on('submit', function (evt) {
    evt.preventDefault();
    $('#msg').hide();
    var errs = editor.validate();
    var editorValue = editor.getValue();
    var maskedEditorValue = Object.assign({}, editorValue, {
      embed_secret: undefined,
    });

    // Handle validation errors
    if (errs.length) {
      $('#msg')
        .text(errs.map((e) => e.path + ': ' + e.message).join('\n'))
        .show();
      return;
    }

    // Process and format editor values for final use
    var definitionValues = definitions
      .map((d) => ({ d: d, val: d.default || '' }))
      .map(({ d, val }) => ({
        d: d,
        val:
          editorValue[d.id] !== undefined && editorValue[d.id] !== ''
            ? editorValue[d.id]
            : val,
      }))
      .map(({ d, val }) => ({ d: d, val: d.fn ? d.fn(val) : val }))
      .map(({ d, val }) => ({
        d: d,
        val: d.noJSON || val === undefined ? val : JSON.stringify(val),
      }));
    var valuesById = definitionValues.reduce(objByOf('d.id', 'val'), {});

    console.log('Values:', valuesById);

    // Signature generation (for security purposes)
    var hashContent = definitionValues
      .filter((dv) => dv.d.sort.hash)
      .sort(sorter('d.sort.hash'))
      .map((dv) => dv.val)
      .join('\n');
    console.log('String to sign:\n', hashContent);
    var shaObj;

    // Compute HMAC using SHA-1
    var signature =
      ((shaObj = new jsSHA('SHA-1', 'TEXT')),
      shaObj.setHMACKey(editorValue.embed_secret, 'TEXT'),
      shaObj.update(hashContent),
      shaObj.getHMAC('B64'));
    console.log('Signature:', signature);

    // Create final URL
    var url =
      'https://' +
      valuesById.host +
      valuesById.embed_path +
      '?' +
      definitionValues
        .filter((dv) => dv.d.sort.qs && dv.val !== undefined)
        .sort(sorter('d.sort.qs')) //Not required, but nice for consistency
        .map(
          (dv) => encodeURIComponent(dv.d.id) + '=' + encodeURIComponent(dv.val)
        )
        .join('&') +
      '&signature=' +
      encodeURIComponent(signature);

    // Display content
    $('#url-textarea').val(url);
    localStorage.setItem('embed-url', url);

    // Notify user that URL have been saved
    alert('Embed onfiguration saved!');
  });

  // --> FUNCTIONS
  // Sets a value at a specified path in an object (supports nested paths)
  function set(obj, path, val) {
    if (path.split) {
      path = path.split('.');
    }
    var head = path[0];
    if (path.length == 1) {
      obj[head] = val;
    } else {
      obj[head] = obj[head] || {};
      set(obj[head], path.slice(1), val);
    }
    return obj;
  }

  // Gets a value from a specified path in an object (supports nested paths)
  function get(obj, path) {
    if (path.split) {
      path = path.split('.');
    }
    var head = path[0];
    if (path.length == 1) {
      return obj && obj[head];
    } else {
      return get(obj[head], path.slice(1));
    }
  }

  // Groups objects by specified keys and optionally maps to a new value
  function objByOf(byKeys, ofKey) {
    byKeys = byKeys instanceof Array ? byKeys : [byKeys];
    return function (accum, x, i) {
      return set(
        accum,
        byKeys.map((k) => get(x, k)),
        ofKey ? get(x, ofKey) : x
      );
    };
  }

  // Returns a comparison function to sort objects based on a path
  function sorter(path) {
    return function (a, b) {
      return get(a, path) - get(b, path);
    };
  }

  // Generates a random alphanumeric string of a specified length
  function nonce(len) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < len; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Converts a snake_case string into a readable label with spaces
  function autoLabel(name) {
    return name
      .replace(/(^|_)([a-z])/g, (s) => s.toUpperCase())
      .replace(/_/g, ' ');
  }

  // Placeholder function for converting an object to a string (not implemented)
  function pathBuilderObjectToString(obj) {}

  // Attempts to safely parse a JSON string
  function tryJSONParse(s) {
    try {
      return JSON.parse(s);
    } catch (e) {
      return undefined;
    }
  }

  // Retrieves a query parameter value by key from the URL search string
  function qs(k) {
    return document.location.search
      .slice(1)
      .split('&')
      .filter(function (p) {
        return p.indexOf(encodeURIComponent(k) + '=') === 0;
      })
      .map(function (p) {
        return decodeURIComponent(p.split('=').slice(1).join('='));
      })[0];
  }

  // Retrieves a hash fragment value by key from the URL hash string
  function qh(k) {
    return document.location.hash
      .slice(1)
      .split('&')
      .filter(function (p) {
        return p.indexOf(encodeURIComponent(k) + '=') === 0;
      })
      .map(function (p) {
        return decodeURIComponent(p.split('=').slice(1).join('='));
      })[0];
  }
});
//
//
//
//
//
// DEMO PAGE
//
document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('embedIframe');
  const embedUrl = localStorage.getItem('embed-url');
  if (embedUrl && iframe) iframe.src = embedUrl;

  const setupSettings = JSON.parse(localStorage.getItem('setupSettings'));
  if (setupSettings) {
    // Update logo
    const logo = document.getElementById('logo');
    if (logo && setupSettings.logoUrl) logo.src = setupSettings.logoUrl;

    // Apply color settings
    if (setupSettings.logoColor)
      document.documentElement.style.setProperty(
        '--logo-color',
        setupSettings.logoColor
      );
    if (setupSettings.primaryColor)
      document.documentElement.style.setProperty(
        '--primary-color',
        setupSettings.primaryColor
      );
    if (setupSettings.secondaryColor) {
      document.documentElement.style.setProperty(
        '--secondary-color',
        setupSettings.secondaryColor
      );
      const rgb = setupSettings.secondaryColor.match(/\d+/g);
      if (rgb)
        document.documentElement.style.setProperty(
          '--secondary-rgb',
          `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`
        );
    }
    if (setupSettings.tertiaryColor)
      document.documentElement.style.setProperty(
        '--tertiary-color',
        setupSettings.tertiaryColor
      );

    // Populate sub-pages navigation
    const subPagesList = document.getElementById('sub-pages');
    Object.values(setupSettings.subPages).forEach((subPage) => {
      if (subPage.label) {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('sub-page-button');
        button.innerHTML = `<span class="sub-page-icon">${
          subPage.icon || '→'
        }</span> <span>${subPage.label}</span>`;
        button.onclick = () => window.open(subPage.label, '_blank');
        listItem.appendChild(button);
        subPagesList.appendChild(listItem);
      }
    });

    // Update demo button text
    const buttonDemo = document.getElementById('buttonDemo');
    if (buttonDemo && setupSettings.buttonDemo)
      buttonDemo.textContent = setupSettings.buttonDemo;
  }

  // Page Navigation
  document.querySelectorAll('.page-navigation-box button').forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = `${button.getAttribute('data-page')}.html`;
    });
  });
});
