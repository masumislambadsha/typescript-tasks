//? 1
const filterEvenNumbers = (arr: number[]): number[] => {
  return arr.filter((num) => num % 2 === 0);
};

//? 2
const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};

//? 3
type StringOrNumber = string | number;

const checkType = (input: StringOrNumber): string => {
  if (typeof input === "string") {
    return "String";
  }
  return "Number";
}

//? 4
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

//? 5
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

const toggleReadStatus  = (book: Book): object => {
  return {
    ...book,
    isRead: true,
  };
};

//? 6
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

//? 7
const getIntersection = (firstArr: number[], secondArr: number[]): number[] => {
  const result: number[] = [];

  for (const value of firstArr) {
    if (secondArr.includes(value)) {
      result.push(value);
    }
  }

  return result;
};
