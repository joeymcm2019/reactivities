
//error
// let data = 42;
// data = '42';

//works
// let data: any = 42;
// data = '42';

//also works
// let data: number | string = 42;
// data = '42';

export interface Duck {
  name: string;
  numLegs: number;
  makeSound: (sound: string) => void;
}

const duck1: Duck = {
  name: "huey",
  numLegs: 2,
  makeSound: (sound: any) => console.log(sound)
}

const duck2: Duck = {
  name: "dewey",
  numLegs: 2,
  makeSound: (sound: any) => console.log(sound)
}

duck1.makeSound("quack");

export const ducks = [duck1, duck2];

export {}