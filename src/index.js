import { of, from, interval, pipe } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  switchMap,
  catchError,
  map,
  scan,
  take,
  delay,
  concatMap,
} from 'rxjs/operators';

const users = ['Enver', 'Elvina', 'Amina', 'Adam'];

const list1 = document.querySelector('.list1');
const list2 = document.querySelector('.list2');

const delayPeriod = 700;

const t1 = fromFetch('https://jsonplaceholder.typicode.com/users')
  .pipe(switchMap((res) => from(res.json())))
  .pipe(
    switchMap((r) =>
      from(r).pipe(
        concatMap((d) =>
          of(d).pipe(
            delay(delayPeriod),
            map((d) => d.name)
          )
        )
      )
    )
  )
  .subscribe((data) => {
    list1.insertAdjacentHTML(
      'afterbegin',
      `<li class="list_layout">${data}</li>`
    );
  });

const t2 = fromFetch('https://jsonplaceholder.typicode.com/users')
  .pipe(switchMap((res) => from(res.json())))
  .pipe(
    switchMap((r) =>
      from(r.reverse()).pipe(
        concatMap((d) =>
          of(d).pipe(
            delay(delayPeriod),
            map((d) => d.name)
          )
        )
      )
    )
  )
  .subscribe((data) => {
    list2.insertAdjacentHTML(
      'afterbegin',
      `<li class="list_layout">${data}</li>`
    );
  });

// interval(2000)
//   .pipe(
//     take(users.length),
//     map((i) => users[i])
//   )
//   .subscribe((data) => console.log(data));

// from(users)
//   .pipe(concatMap((d) => of(d).pipe(delay(1000))))
//   .subscribe((d) => console.log(d));
