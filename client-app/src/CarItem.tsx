import React from 'react'
import { ICar } from '../../demo'



/*
Below is an example of creating type safety with the type of components you are passing along to your react components

You create an IProps Interface to determine what is being sent down as a prop by stating the type is React.FC (react function component)
you can then refer to any of the props you have set up in the interface. You can then reference any property that is included in
the Iprops Interface directle
 */
interface IProps {
  car: ICar

}

/*This creates a react component called car item that will be rendered in the app. the only difference is the type reference 
points to the interface, meaning you can deconstruct all references within that interface */
export const CarItem:React.FC<IProps> = ({car}) => {
  return (
    <div>
      <h1>({car.color})</h1>
    </div>
  )
}
