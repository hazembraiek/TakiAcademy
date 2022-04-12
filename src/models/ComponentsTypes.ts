export interface HeaderType {
  icon?: string;
  whithIcon?: boolean;
  text: string;
  type?: string;
  isOpen?: boolean;
}

export interface LiveSessionType {
  date: string | Date;
  subject: string;
  prof: string;
}

export interface ProgressType {
  icon: string;
  progress: number;
  subject: string;
  id: string;
}

export interface columns {
  heading: string;
  value?: string;
}

export interface TableType {
  columns: columns[];
  id?: string;
  ArrayData: examensType[] | HistoryPointsType[];
}

interface exame {
  idExame: string;
  note: number;
}

export interface ChildDataType {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  Phone: string;
  password: string;
  identifier: string;
  examens?: exame[];
  section?: string;
}

export interface examensType {
  id?: string;
  date: string;
  title: string;
  subject: string;
  note?: number;
  idExame?: string;
  prof: string;
  onClick?: (
    title: string,
    subject: string,
    prof: string,
    date: string
  ) => void;
}

export interface sessionsType {
  id: string;
  subject: string;
  date: string;
  title: string;
  time: string;
  prof: string;
}

export interface sessionChildType {
  idSession: string;
  idChild: string;
  status: string | boolean;
}

export interface ProgressChildType {
  childId: string;
  ChapterId: string;
  progress: number;
}

export interface ChapterType {
  id: string;
  title: string;
  prof: string;
  nbVideos: number;
  progress?: number;
}

export interface subjectType {
  id: string;
  title: string;
  icon: string;
  Chapters: ChapterType[];
}

export interface SectionType {
  id: string;
  title: string;
  children: string[];
  subjects: string[];
  sessions?: string;
}

export interface HistoryPointsType {
  idParent: string;
  code: string;
  mode: string;
  Prix: number;
  Description: string;
  Date: string;
  Status: boolean;
}

export interface ParentType {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  children: string[];
}

export interface dataType {
  examens: examensType[];
  sessions: sessionsType[];
  sessionChild: sessionChildType[];
  progressChild: ProgressChildType[];
  subjects: subjectType[];
  sections: SectionType[];
  HistoryPoints: HistoryPointsType[];
  Parents: ParentType[];
  ParentId: string;
  DateLogin: string;
  Week: Date[];
}

export interface ToggleDataType {
  Setting: boolean;
  ExameDetails: boolean;
  exame: examensType;
  ToggleModal: boolean;
  TypeModal: string;
  ChildExist: boolean;
  liveDetails: boolean;
  idLive: string;
  PagginationPage: Number;
  Paggination: Number;
  ClickedSubject: string;
  AllSubject: boolean;
  Session: sessionsType | null;
  ChildValid: boolean;
}

export interface InputType {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  list?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UpdatePageType {
  Event: string;
  Max: Number;
}

export interface SubjectsDataType {
  SubjectProg: subjectType[];
}

export interface SubjectsProgressType {
  id: string;
  progress: number;
}

export interface messageType {
  msg: string;
  sender: boolean;
  date: string;
}
