export interface Workout{
    _id?: string;
    title:string;
    muscle:string;
    level:string;
    reps:string;
    sets:string
    interval:string
    duration:string
    overview:string;
    thumbnail:string
    video:string;
    trainerId?:{
        name:string;
        imageUrl:string;
        experience:string;
        specialized:string
    };
    publish:boolean;
  }