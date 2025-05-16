import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AthleteService } from '../../services/athlete.service';
import { EmailService }   from '../../services/email.service';
import { MatDialog }      from '@angular/material/dialog';
import { HttpClient }     from '@angular/common/http';
import { EventModalComponent } from './event-modal/event-modal.component';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin       from '@fullcalendar/daygrid';
import interactionPlugin   from '@fullcalendar/interaction';
import html2canvas         from 'html2canvas';
import jsPDF               from 'jspdf';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.scss']
})
export class AthleteProfileComponent implements OnInit {
  athlete: any = null;
  showClassements = true;
  menuOpen = false;

  displayedColumns = ['event','place','points'];
  dataSource = new MatTableDataSource<any>([]);

  calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, interactionPlugin ],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.onEventClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    height: 'auto'
  };

  @ViewChild('calendarWrap', { static: true })
  calendarWrap!: ElementRef<HTMLElement>;
  
  constructor(
    private athleteSvc: AthleteService,
    private emailSvc: EmailService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.athleteSvc.getAthlete(1).subscribe(a => {
      if (!a) return;
      this.athlete = a;
      this.calendarOptions.events = a.events.map((e: any) => ({
        id: String(e.id),
        title: e.eventTitle,
        start: e.competition.dateStart,
        end:   e.competition.dateEnd
      }));
      const all = a.events.flatMap((e: any) =>
        e.rankings.map((r: any) => ({ ...r, eventName: e.eventTitle }))
      );
      this.dataSource.data = all;
    });
  }

  onEventClick(arg: EventClickArg) {
    const ev = this.athlete.events.find((e: any) => String(e.id) === arg.event.id);
    if (!ev) return;
    this.dialog.open(EventModalComponent, {
      data: { event: ev },
      panelClass: 'event-modal-overlay'
    });
  }

  toggleClassements() {
    this.showClassements = !this.showClassements;
  }

  downloadRankingsCsv(): Blob {
    const header = ['Event','Place','Points','Name','Nation','Club'].join(',');
    const rows = this.dataSource.data.map((r: any) =>
      [r.eventName,r.place,r.points,r.fullName,r.nation,r.club].join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'classements.csv';
    link.click();
    return blob;
  }

  downloadRankingsTextPdf() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Classements – ${this.athlete.nom}`, 10, 10);
    this.dataSource.data.forEach((r: any, i: number) => {
      doc.text(`${i+1}. ${r.eventName} – Place: ${r.place}, Points: ${r.points}`, 10, 20 + i * 8);
    });
    doc.save('classements.pdf');
  }

  shareCsv() {
    const blob = this.downloadRankingsCsv();
    const form = new FormData();
    form.append('file', blob, 'classements.csv');
    this.http.post('http://localhost:8081/sharefile', form)
      .subscribe(() => alert('Classements shared!'));
  }

  downloadCalendarPdf() {
    html2canvas(this.calendarWrap.nativeElement).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const props = (pdf as any).getImageProperties(img);
      const w = pdf.internal.pageSize.getWidth();
      const h = (props.height * w) / props.width;
      pdf.addImage(img, 'PNG', 0, 0, w, h);
      pdf.save('calendar-image.pdf');
    });
  }

  downloadCalendarTextPdf() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Calendar – ${this.athlete.nom}`, 10, 10);
    this.athlete.events.forEach((e: any, i: number) => {
      doc.text(
        `${i+1}. ${e.eventTitle} (${e.competition.dateStart} → ${e.competition.dateEnd})`,
        10,
        20 + i * 8
      );
    });
    doc.save('calendar-text.pdf');
  }

  downloadCalendarImage() {
    html2canvas(this.calendarWrap.nativeElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'calendar.png';
      link.click();
    });
  }
}
