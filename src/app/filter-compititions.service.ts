import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilterCompititionsService {
  private criteriaSource = new BehaviorSubject<any>({});
  private competitionsSource = new BehaviorSubject<any[]>([]);

  criteria = this.criteriaSource.asObservable();
  competitions = this.competitionsSource.asObservable();

  filteredCompetitions: Observable<any[]> = combineLatest([
    this.competitions,
    this.criteria,
  ]).pipe(
    map(([competitions, criteria]) => {
      return competitions.filter((comp) => {
        return (
          (!criteria.saison || comp.saison === criteria.saison) &&
          (!criteria.competition ||
            comp.competition === criteria.competition) &&
          (!criteria.categorie ||
            comp.categoryLabel
              .toLowerCase()
              .includes(criteria.categorie.toLowerCase())) &&
          (!criteria.bassin || comp.bassin === criteria.bassin) &&
          (!criteria.sexe ||
            criteria.sexe === 'all' ||
            comp.sexe === criteria.sexe)
        );
      });
    })
  );

  setCompetitions(data: any[]) {
    this.competitionsSource.next(data);
  }

  sendMessage(criteria: Object) {
    this.criteriaSource.next(criteria);
  }
}
