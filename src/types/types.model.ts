export interface UserSignUP {
  email: string;
  password: string;
  fullname: string;
}
export interface UserSignin {
  password: string;
}
interface User {
  role: string;
  avatarUrl: string;
  points: number;
  verified: boolean;
  id: number;
  email: string;
  password: string;
  fullname: string;
  updatedAt: string;
  createdAt: string;
  gender: string | null;
  bio: string | null;
  phoneNum: string | null;
  job: string | null;
  websiteUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  youtubeUrl: string | null;
  linkedinUrl: string | null;
  deletedAt: string | null;
}
export interface GetmeData {
  avatarUrl: FileList;
  fullname: string;
  job: string | null;
  linkedinUrl: string | null;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  twitterUrl: string | null;
  bio: string | null;
  gender: string | null;
}
export interface CreateUserResponse {
  error: boolean;
  message: string;
  payload: {
    user: User;
  };
}
export interface ErrorSignUP {
  data: {
    error: boolean;
    message: string;
  };
  status: number;
}
export interface ErrorSignIN {
  data: {
    error: true;
    message: string;
  };
  status: number;
}
export interface GetUserResponse {
  error: boolean;
  message: string;
  payload: User;
}
export interface ServerResponse {
  data: {
    error: boolean;
    message: string;
  };
  status: number;
}
export interface LogoutResponse {
  error: boolean;
  message: string;
  payload: object;
}

interface Category {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  error: boolean;
  message: string;
  payload: {
    categories: Category[];
  };
}
//get home
interface CategoryHome {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseHome {
  id: number;
  thumbnailUrl: string;
  price: null | number; // You may need to update the type for price if it can be a number
  title: string;
  teacherNames: string;
}

interface PayloadHome {
  categories: CategoryHome[];
  bestsellers: CourseHome[]; // Updated to use the Course interface
  recommendations: CourseHome[]; // Updated to use the Course interface
}

export interface getHome {
  error: boolean;
  message: string;
  payload: PayloadHome;
}

//home end

//be teacher start
interface beInstructor {
  id: number;
  fullname: string;
  email: string;
  password: string;
  role: string;
  gender: string | null;
  bio: string | null;
  avatarUrl: string;
  phoneNum: string | null;
  points: number;
  job: string | null;
  websiteUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  youtubeUrl: string | null;
  linkedinUrl: string | null;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface PayloadbeInstructor {
  user: beInstructor;
}

export interface UpgradeResponsebeInstructor {
  error: boolean;
  message: string;
  payload: PayloadbeInstructor;
}

//be teacher end
//add course
export interface AddCoursereq {
  title: string;
  categoryId: number;
}
interface AddCourse {
  thumbnailUrl: string;
  desc: string | null; // Assuming desc can be null
  allowPoints: boolean;
  status: string;
  lang: string;
  level: string;
  id: number;
  title: string;
  categoryId: number;
  updatedAt: string; // Assuming updatedAt is a string in ISO 8601 format
  createdAt: string; // Assuming createdAt is a string in ISO 8601 format
  previewVideoUrl: string | null; // Assuming previewVideoUrl can be null
  subtitle: string | null; // Assuming subtitle can be null
  beneficiaries: string | null; // Assuming beneficiaries can be null
  outline: string | null; // Assuming outline can be null
  prerequisites: string | null; // Assuming prerequisites can be null
  price: number | null; // Assuming price can be null
  deletedAt: string | null; // Assuming deletedAt can be null
}

interface PayloadAddCourse {
  course: AddCourse;
}

export interface AddCourseres {
  error: boolean;
  message: string;
  payload: PayloadAddCourse;
}
//end add course
// teaching Courses
export interface teachingCourse {
  id: number;
  previewVideoUrl: string | null;
  thumbnailUrl: string;
  title: string;
  subtitle: string | null;
  desc: string;
  beneficiaries: any[] | null; // يمكنك تغيير هذا النوع وفقًا للبيانات الفعلية
  outline: any[] | null; // يمكنك تغيير هذا النوع وفقًا للبيانات الفعلية
  prerequisites: any[] | null; // يمكنك تغيير هذا النوع وفقًا للبيانات الفعلية
  price: number | null; // يمكنك تغيير هذا النوع وفقًا للبيانات الفعلية
  allowPoints: boolean;
  status: string;
  lang: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
}

export interface TeachingCourse {
  courseId: number;
  teacherId: number;
  course: teachingCourse;
}

interface teacingCoursesPayload {
  count: number;
  teachingCourses: TeachingCourse[];
}

export interface teacingCoursesRes {
  error: boolean;
  message: string;
  payload: teacingCoursesPayload;
}
// teaching Courses end
