// src/app/components/athlete-profile/athlete-profile.component.ts

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AthleteService } from '../../services/athlete.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventModalComponent } from './event-modal/event-modal.component';
import {
  CalendarOptions,
  EventClickArg,
  EventInput
} from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatTableDataSource } from '@angular/material/table';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Athlete,
  Competition,
  EventAPI,
  Ranking
} from '../../models/athlete.model';

declare const FB: any;

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('void', style({ height: '0px', opacity: 0 })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class AthleteProfileComponent implements OnInit, AfterViewInit {
  athlete: Athlete | null = null;
  hasError = false;
  modalOpen = false;
  menuOpen = false;
  sharing = false;

  displayedColumns = ['event', 'place', 'points'];
  dataSource = new MatTableDataSource<Ranking & { eventName: string }>([]);

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: [],
    eventClick: this.onEventClick.bind(this),
    height: 'auto'
  };

  @ViewChild('calendarWrap', { static: false })
  calendarWrap!: ElementRef<HTMLElement>;

  @ViewChild('fullcalendar', { static: false })
  fullcalendar!: FullCalendarComponent;

  constructor(
    private route: ActivatedRoute,
    private athleteSvc: AthleteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadFacebookSdk();

    const idParam = this.route.snapshot.paramMap.get('id');
    const athleteId = idParam ? +idParam : null;
    if (athleteId === null || isNaN(athleteId)) {
      console.error('Aucun ID d’athlète fourni dans l’URL');
      this.hasError = true;
      return;
    }

    this.athleteSvc.getAthlete(athleteId).subscribe({
      next: athlete => {
        this.athlete = athlete;
        this.buildRankingsTable();
        this.buildCalendarEvents();
      },
      error: () => {
        this.hasError = true;
      }
    });
  }

  ngAfterViewInit() {}

  private loadFacebookSdk() {
    if ((window as any).fbAsyncInit) return;
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '1926438911094293',
        cookie: true,
        xfbml: true,
        version: 'v14.0'
      });
    };
    const d = document, s = 'script', id = 'facebook-jssdk';
    if (d.getElementById(id)) return;
    const jsElem = d.createElement(s) as HTMLScriptElement;
    jsElem.id = id;
    jsElem.src = 'https://connect.facebook.net/en_US/sdk.js';
    d.getElementsByTagName('head')[0].appendChild(jsElem);
  }

  private buildRankingsTable() {
    if (!this.athlete) return;
    const list: (Ranking & { eventName: string })[] = [];
    this.athlete.competitions.forEach((comp: Competition) => {
      comp.events.forEach((e: EventAPI) => {
        e.rankings.forEach(r => list.push({ ...r, eventName: e.eventTitle }));
      });
    });
    this.dataSource.data = list;
  }

  private buildCalendarEvents() {
    if (!this.athlete) return;

    const obsList: Observable<EventInput>[] = [];

    this.athlete.competitions.forEach((comp: Competition) => {
      comp.events.forEach((e: EventAPI) => {
        const base: Omit<EventInput, 'backgroundColor'|'borderColor'> = {
          id: String(e.id),
          title: e.eventTitle,
          start: comp.dateStart,
          end: comp.dateEnd,
          extendedProps: {
            damesUrl: e.damesUrl,
            messieursUrl: e.messieursUrl,
            mixteUrl: e.mixteUrl,
            competition: {
              title: comp.title,
              dateStart: comp.dateStart,
              dateEnd: comp.dateEnd
            }
          }
        };

        const obs = this.athleteSvc
          .checkEvent(this.athlete!.id, e.id)
          .pipe(
            map(status => {
              let color: string;
              if (status === null) {
                color = 'gray';
                this.snackBar.open(
                  `Veuillez confirmer votre participation à "${e.eventTitle}"`,
                  'Fermer',
                  { duration: 4000 }
                );
              } else if (status === false) {
                color = 'red';
                this.snackBar.open(
                  `Vous avez refusé "${e.eventTitle}"`,
                  'Fermer',
                  { duration: 4000 }
                );
              } else {
                color = 'green';
                this.snackBar.open(
                  `Participation confirmée pour "${e.eventTitle}"`,
                  'Fermer',
                  { duration: 4000 }
                );
              }
              return {
                ...base,
                backgroundColor: color,
                borderColor: color
              } as EventInput;
            })
          );

        obsList.push(obs);
      });
    });

    forkJoin(obsList).subscribe(coloredEvents => {
      this.calendarOptions = {
        ...this.calendarOptions,
        events: coloredEvents
      };
      this.fullcalendar?.getApi().render();
    });
  }

  onEventClick(arg: EventClickArg) {
    if (this.modalOpen || !this.athlete) return;

    const ev = this.athlete.competitions
      .flatMap(c => c.events)
      .find(e => String(e.id) === arg.event.id);
    if (!ev) return;

    this.modalOpen = true;
    this.dialog
      .open(EventModalComponent, {
        data: {
          athleteId: this.athlete.id,
          event: {
            ...ev,
            competition: (arg.event.extendedProps as any).competition
          }
        },
        panelClass: 'event-modal-overlay'
      })
      .afterClosed()
      .subscribe(decision => {
        this.modalOpen = false;
        // immédiatement mettre à jour la couleur
        let newColor = 'gray';
        if (decision === 'accept') newColor = 'green';
        else if (decision === 'decline') newColor = 'red';
        // rappel: arg.event est un CalendarApi
        arg.event.setProp('backgroundColor', newColor);
        arg.event.setProp('borderColor', newColor);
      });
  }
  downloadCsv(): void {
    if (!this.athlete) { return; }
    const header = ['Événement', 'Classement', 'Points'].join(',');
    const rows = this.dataSource.data.map(r =>
      [r.eventName, r.place, r.points].join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.athlete.nom}_classements.csv`;
    link.click();
  }

  downloadRankingsTextPdf() {
    if (!this.athlete) { return; }
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Classements – ${this.athlete.nom}`, 10, 10);
    let y = 20;
    this.dataSource.data.forEach((r, i) => {
      doc.text(
        `${i + 1}. ${r.eventName} – Place : ${r.place}, Points : ${r.points}`,
        10,
        y
      );
      y += 8;
    });
    doc.save('classements.pdf');
  }

  shareCsv() {
    if (!this.athlete) { return; }
    const bullets = this.dataSource.data.map(r =>
      `• ${r.eventName} : place #${r.place} – ${r.points} pts (${r.nation}, ${r.club})`
    );
    const text = `Mes performances – ${this.athlete.nom}\n\n${bullets.join('\n')}`;
    this.copyToClipboard(text)
      .then(() => this.snackBar.open('Texte copié dans le presse-papier.', 'Fermer', { duration: 4000 }))
      .catch(() => this.snackBar.open('Échec de la copie.', 'Fermer', { duration: 4000 }))
      .finally(() => {
        FB.ui({ method: 'share', href: window.location.href }, () => {
          this.sharing = false;
        });
      });
  }

  private copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy') ? resolve() : reject();
      } catch {
        reject();
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  downloadCalendarPdf() {
    if (!this.calendarWrap) { return; }
    html2canvas(this.calendarWrap.nativeElement).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const props = (pdf as any).getImageProperties(img);
      const w = pdf.internal.pageSize.getWidth();
      const h = (props.height * w) / props.width;
      pdf.addImage(img, 'PNG', 0, 0, w, h);
      pdf.save('calendar.pdf');
    });
  }

  downloadCalendarTextPdf() {
    if (!this.athlete) { return; }
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Calendrier – ${this.athlete.nom}`, 10, 10);
    let y = 20;
    this.athlete.competitions.forEach((c, i) => {
      doc.text(`${i + 1}. ${c.title} (${c.dateStart} → ${c.dateEnd})`, 10, y);
      y += 8;
      c.events.forEach(e => {
        doc.text(`- ${e.eventTitle}`, 15, y);
        y += 8;
      });
      y += 4;
    });
    doc.save('calendrier.pdf');
  }

  downloadCalendarImage() {
    if (!this.calendarWrap) { return; }
    html2canvas(this.calendarWrap.nativeElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'calendar.png';
      link.click();
    });
  }
}
