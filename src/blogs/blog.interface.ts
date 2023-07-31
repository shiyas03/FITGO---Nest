export interface Blog {
    _id: string;
    title: string;
    category: string
    blog: string
    template: string
    trainerId: string
}

export interface Blogs {
    _id: string;
    title: string;
    category: string;
    blog: string;
    template: string;
    trainerId: {
      _id: string;
      name: string;
      experience:number,
      specialized:string,
      about:string;
      imageUrl:string
    };
    approve: boolean;
  }
  