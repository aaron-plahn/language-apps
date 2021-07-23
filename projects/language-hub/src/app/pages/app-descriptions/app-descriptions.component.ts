import { Component, OnInit } from '@angular/core';
import { App } from '../../types/App';

@Component({
  selector: 'language-hub-app-descriptions',
  templateUrl: './app-descriptions.component.html',
  styleUrls: ['./app-descriptions.component.css'],
})
export class AppDescriptionsComponent implements OnInit {
  apps: App[] = [
    {
      title: 'Digital Verb Book',
      links: {
        google:
          'https://play.google.com/store/apps/details?id=ca.tsilhqotinlanguage.tsilhqotindvb&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
      },
      image:
        'https://api.tsilhqotinlanguage.ca/uploads/app_icon_dvb_483177a8a0.png',
      description:
        'Version 1.0 is currently published and contains \'Third Person Singular Paradigms\' completed Bella Alphonse. These are really helpful for semi-speakers who need practice with verb stem alternations. To date over 100,000 phrases have been recorded, with about 50,000 named and organized. Version 2.0 of this app will allow us to present this material to learners. This is the main focus of the tech team for 2021-2022.',
    },
    {
      title: 'Tŝilhqot\'in Memory Match',
      links: {
        google:
          'https://play.google.com/store/apps/details?id=ca.tsilhqotinlanguage.memorymatch&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
        web: 'https://www.tsilhqotinlanguage.ca/game/Memory_Match/',
      },
      image:
        'https://api.tsilhqotinlanguage.ca/uploads/app_icon_mm_a31a1eebd4.png',
      description:
        'The Memory Match game is one of Bella’s favourite activities to bring to the schools. That inspired this digital app where you can build your vocabulary as you look for matches.  The current version features Bella Alphonse’s original 6 rounds (also found on the web version) and an additional 6 rounds completed by Maria Myers. Aaron picked a collection of pictures for Maria to describe that included many common or interesting verbs.    We hope more speakers will contribute additional rounds in the future. This app is a favourite among Tŝilhqot’in children.',
    },
    {
      title: 'Tŝilhqot\'in Alphabet',
      links: {
        google:
          'https://play.google.com/store/apps/details?id=ca.tsilhqotinlanguage.tsilhqotinalphabet&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
        web: 'https://www.tsilhqotinlanguage.ca/game/Alphabet/',
      },
      image:
        'https://api.tsilhqotinlanguage.ca/uploads/app_icon_alphabet_25678c6c86.png',
      description:
        'This app goes along with the modernized Tŝilhqot’in Alphabet Poster. It can be used as a ’cheat sheet’ for the poster.',
    },
    {
      title: 'Qungh ʔAnaghunt’in',
      links: {
        google:
          'https://play.google.com/store/apps/details?id=ca.tsilhqotinlanguage.qungh_7anaghunt_in&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
        web: 'https://www.tsilhqotinlanguage.ca/game/Pick_It_Up/',
      },
      image:
        'https://api.tsilhqotinlanguage.ca/uploads/app_icon_qa_c3241de386.png',
      description:
        'This is a prototype for an interactive language learning game. We hope to expand upon this someday.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
