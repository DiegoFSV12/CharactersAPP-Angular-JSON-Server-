import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  standalone: false,
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;

  constructor(
    private heroService:HeroService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      //delay(3000),
      switchMap(({id})=>this.heroService.getheroById(id))
    )
    .subscribe(
      hero=>{
        if (!hero) {
          setTimeout(() => {
            this.router.navigate(['/heroes/list']);
          }, 500);
          return;
        }
        this.hero=hero;
        console.log(hero);
        return;
      }
    )
  }

  goBack():void{
    this.router.navigateByUrl('/heroes/list');
  }
  
}
