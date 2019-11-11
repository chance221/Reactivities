let data: number | string;

data = '42'

data = 42

/*basics of typescript

You can declare an interface and make certain properties optional for when they are inherited from the interface
*/
export interface ICar{
    color:string;
    model: string;
    topSpeed? : number    
}


//you can inherit from the interface 
const car1: ICar = {
    color:'blue',
    model:'BMW;'
}

const car2: ICar = {
    color: 'red',
    model: 'Mercedes',
    topSpeed: 100
}

//When you declare variables you MUST also declare the type of the parameter value being passed in.
//You can also specify the type that is to be returned
const multiply = (x: number, y: number): number => {
    return x*y;
}


export const cars = [car1, car2]