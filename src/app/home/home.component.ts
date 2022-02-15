import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { ModalDirective } from 'angular-bootstrap-md'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  joke$?: Observable<any>
  joke: any
  trivia$?: Observable<any>
  trivias: any
  answers: any[] = []
  question: any
  answer: any
  correct: boolean = false
  barColor: Boolean = true
  myName = ''
  inputForm: FormGroup = this.formBuilder.group({})
  radioForm: FormGroup = this.formBuilder.group({})
  @ViewChild('myNameModal')
  public myNameModal!: ModalDirective
  @ViewChild('triviaModal')
  public triviaModal!: ModalDirective
  category: any


  constructor(private api: ApiService,
    private formBuilder: FormBuilder,
    private data: DataService) { }
 




  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      myName: ['', [Validators.minLength(2), Validators.maxLength(20)]],

    })
    this.radioForm = this.formBuilder.group({
      answerControl: ['', [Validators.required]],
    })

    this.answers = []
    this.getTrivia()

  }

  get e() {
    return this.inputForm.controls
  }

  getJoke() {
    const endpoint = 'https://geek-jokes.sameerkumar.website/api?format=json'
    console.log("llama a api")
    this.joke$ = this.api.getData(endpoint)
    this.joke$.subscribe(data => {
      console.log("data", data.joke)
      this.joke = data.joke
    })
  }

  incrementer(){
    this.data.sendClickEvent()
  }

  colorChange() {
    this.barColor = !this.barColor
  }

  sayMyName() {
    if (this.inputForm.value.myName === '') {
      return
    }
    this.myNameModal.show()
  }

  getTrivia() {
    this.answers = []
    this.correct = false
    const endpoint = 'https://api.trivia.willfry.co.uk/questions?categories=movies&limit=1'
    this.trivia$ = this.api.getData(endpoint)
    this.trivia$.subscribe(data => {
      console.log("data", data)
      this.trivias = data

      console.log("correct--", this.trivias[0]['correctAnswer'])
      this.question = this.trivias[0]['question']
      this.category = this.trivias[0]['category']
      this.trivias[0]['incorrectAnswers'].forEach((element: any) => {
        this.answers.push(element)
      });
      this.answers.push(this.trivias[0]['correctAnswer'])
      this.answers = this.randomArrayShuffle(this.answers)


    })
  }

  randomArrayShuffle(array: any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  checkAnswer() {
    console.log("answer", this.answer)
    if(this.answer != this.trivias[0]['correctAnswer']){
      console.log("answer no match")
      this.triviaModal.show()
      
    }else{
      console.log("Correct!")
      this.correct = true
      this.triviaModal.show()
    }
  }






}
