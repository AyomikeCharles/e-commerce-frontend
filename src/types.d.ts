//category object type
declare type Cats = {
    _id:string, 
    title:string, 
    icon:string,
    description:string
}


declare interface Data {
    _id: string,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand:string,
    category: string,
    images:string[],
  }

  declare interface DataObject {
    data:Data[],
    total:number,
  }
