export interface UserSignUP {
  email: string;
  password: string;
  fullname: string;
}
export interface UserSignin {
  password: string;
  email: string;
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
  desc: string;
  id: number;
  thumbnailUrl: string;
  price: null | number; // You may need to update the type for price if it can be a number
  title: string;
  teacherNames: string;
  isFaved: boolean;
  isInCart: boolean;
  level: string;
  outline: string[];
  updatedAt: string;
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
//get course by id
interface SectionGetCourseVideo {
  title: string;
  id: number;
  length: number;
  order: number;
  public: boolean;
  sectionId: number;
  // Add other properties as needed
}
interface SectionGetCourse {
  id: number;
  title: string;
  order: number;
  courseId: number;
  totalLength: null | number;
  numOfVideos: string;
  videos: SectionGetCourseVideo[]; // Assuming videos are represented as some other type
}

interface GetCourseResCourse {
  id: number;
  previewVideoUrl: string | null;
  thumbnailUrl: string;
  title: string;
  subtitle: string | null;
  desc: string | null;
  beneficiaries: string | null;
  outline: string[] | null;
  prerequisites: string[] | null;
  price: number | null;
  allowPoints: boolean;
  status: string;
  lang: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  totalReviewsRate: number | null;
  totalLength: string | null;
  numOfVideos: string;
  numOfSections: string;
  teachers: GetCourseResTeacher[];
  sections: SectionGetCourse[];
  reviews: any[];
  category: GetCourseResCategory;
  favorites: any[];
  carts: any[];
  numOfEnrolledStudents: number;
  numOfCourseReviews: number;
  publicVideos: {
    sections: any[]; // You might want to define a type for sections
  };
  isEnrolled: boolean;
}

interface GetCourseResTeacher {
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
  courseTeacher: {
    courseId: number;
    teacherId: number;
  };
  numOfTeachingCourses: number;
  totalStudentsEnrolled: string;
  totalReviews: string;
}

interface GetCourseResCategory {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCourseRes {
  error: boolean;
  message: string;
  payload: {
    course: GetCourseResCourse;
  };
}
//end get course by id
// updata corse
interface UpdataCourse {
  id: number;
  previewVideoUrl: string | null;
  thumbnailUrl: string;
  title: string;
  subtitle: string;
  desc: string;
  beneficiaries: string[] | null;
  outline: string[];
  prerequisites: string[];
  price: number;
  allowPoints: boolean;
  status: string;
  lang: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  totalReviewsRate: number | null;
  totalLength: number | null;
  numOfVideos: string;
  numOfSections: string;
  teachers: UpdataCourseTeacher[];
  sections: any[]; // You may want to define an interface for sections
  reviews: any[]; // You may want to define an interface for reviews
  category: UpdataCourseCategory;
  favorites: any[]; // You may want to define an interface for favorites
  carts: any[]; // You may want to define an interface for carts
}

interface UpdataCourseTeacher {
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
  courseTeacher: {
    courseId: number;
    teacherId: number;
  };
}

interface UpdataCourseCategory {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdataCoursePayload {
  course: UpdataCourse;
  numOfUpdatedRow: number;
}

export interface UpdataCourseRes {
  error: boolean;
  message: string;
  payload: UpdataCoursePayload;
}
// end updata corse
// start getcourses by cats
interface CouursesByCats {
  title: string;
  price: number | null;
  thumbnailUrl: string;
  id: number;
  outline: string[] | null;
  desc: string;
  updatedAt: string;
  level: string;
  teacherNames: string;
  views?: number; // This property is optional as it seems to be present only in the "popular" section
}

export interface getCoursesByCatsRes {
  error: boolean;
  message: string;
  payload: {
    courses: CouursesByCats[];
    popular: CouursesByCats[];
    new: CouursesByCats[];
  };
}
//end getcourses by cats
//Search courses
export interface CoursesSearch {
  id: number;
  thumbnailUrl: string;
  title: string;
  subtitle: string;
  price: number;
  level: string;
  lang: string;
  totalLength: number | null;
  teachers: TeacherSearchCourses[];
}

export interface TeacherSearchCourses {
  fullname: string;
  courseTeacher: {
    courseId: number;
    teacherId: number;
  };
}

export interface SearchCoursesRES {
  error: boolean;
  message: string;
  payload: {
    courses: CoursesSearch[];
  };
}

//end Search courses
//add fave
export interface AddFavRES {
  error: boolean;
  message: string;
  payload: AddFavPayload;
}

interface AddFavPayload {}
//end add fave
//start add new sec
export interface addNewSec {
  courseId: number | undefined;
  sectionTitle: string;
}
interface addNewSecPayload {
  id: number;
  title: string;
  courseId: number;
  order: number;
}

export interface addNewSecRes {
  error: boolean;
  message: string;
  payload: {
    section: addNewSecPayload;
  };
}
//end add new sec
// delete sec
export interface DeleteSectionResponse {
  error: boolean;
  message: string;
  payload: Record<string, any>; // يمكن تعيين أي نوع للبيانات الإضافية هنا
}
export interface DeleteSec {
  courseId: number;
  id: number;
}
// end delete sec
// start Edit Sec
interface RowUpdatedSec {
  id: number;
  title: string;
  order: number;
  courseId: number;
}

interface UpdateSecPayload {
  rowUpdated: RowUpdatedSec;
}

export interface UpdateSecResponse {
  error: boolean;
  message: string;
  payload: UpdateSecPayload;
}
export interface SectionUpdateRES {
  sectionTitle: string;
  courseId: number;
}
// end Edit Sec
//delete Fav
export interface DeleteFavResponse {
  error: boolean;
  message: string;
  payload: any;
}
//end delete Fav
// get course by id
interface getCourseByidTeacher {
  id: number;
  fullname: string;
  email: string;
  // Add other properties as needed
}

interface getCourseByidSection {
  id: number;
  title: string;
  order: number;
  // Add other properties as needed
}

interface getCourseByidCategory {
  id: number;
  categoryName: string;
  // Add other properties as needed
}

interface getCoursebyidFavorite {
  courseId: number;
  userId: number;
  // Add other properties as needed
}

interface getCoursebyId {
  id: number;
  previewVideoUrl: string | null;
  thumbnailUrl: string;
  title: string;
  subtitle: string;
  desc: string;
  beneficiaries: string | null;
  outline: string[];
  prerequisites: string[];
  price: number;
  allowPoints: boolean;
  status: string;
  lang: string;
  level: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  totalReviewsRate: number | null;
  totalLength: number | null;
  numOfVideos: string;
  numOfSections: string;
  teachers: getCourseByidTeacher[];
  sections: getCourseByidSection[];
  reviews: any[]; // Define a proper type if available
  category: getCourseByidCategory;
  favorites: getCoursebyidFavorite[];
  carts: any[]; // Define a proper type if available
  numOfEnrolledStudents: number;
  numOfCourseReviews: number;
  publicVideos: { sections: any[] }; // Define a proper type if available
  isEnrolled: boolean;
}

export interface getCourseByIdResponse {
  error: boolean;
  message: string;
  payload: {
    course: getCoursebyId;
  };
}

//end get course by id
// start upload video
interface UploadVideo {
  id: number;
  length: number;
  sectionId: number;
  title: string;
  public: boolean;
  order: number;
  updatedAt: string;
  createdAt: string;
  videoUrl: string | null;
}

export interface UploadVideoResponse {
  error: boolean;
  message: string;
  payload: {
    video: UploadVideo;
  };
}
// end upload video
//start delete video
export interface DeleteVideo {
  courseId: number;
  sectionId: number;
}
//end delete video
//start Updata vid
interface RowUpdatedvid {
  id: number;
  title: string;
  videoUrl: string | null;
  length: number;
  order: number;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  sectionId: number;
}

interface PayloadRowUpdatedvid {
  rowUpdated: RowUpdatedvid;
}

export interface UpdateVidResponse {
  error: boolean;
  message: string;
  payload: PayloadRowUpdatedvid;
}
export interface UpdateVidInfo {
  title: string;
  public: boolean;
  courseId: number;
}
//end Updata vid
// start get favs
interface CourseGetFavs {
  allowPoints: boolean;
  beneficiaries: null | any; // You may replace 'any' with a more specific type if known
  categoryId: number;
  createdAt: string;
  deletedAt: string | null;
  desc: string;
  id: number;
  lang: string;
  level: string;
  outline: string[];
  prerequisites: string[];
  previewVideoUrl: string | null;
  price: number;
  status: string;
  subtitle: string;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
  views: number;
}

interface CourseArrayElementGetAllFavs {
  course: CourseGetFavs;
  courseId: number;
  userId: number;
}
export interface GetAllFavsRES {
  error: boolean;
  message: string;
  payload: {
    courses: CourseArrayElementGetAllFavs[];
    numOfPages: number;
  };
}
// end get favs
//start Add Cart
interface AddCartCourse {
  title: string;
  price: number | null;
  thumbnailUrl: string;
  courseId: number;
  teacherNames: string;
}

export interface AddCartResponse {
  error: boolean;
  message: string;
  payload: {
    course: AddCartCourse[];
  };
}

//end Add Cart
// start Delete Cart
export interface DeleteCartResponse {
  error: boolean;
  message: string;
  payload: Record<string, never>; // An empty object
}

// end Delete Cart
// start Get all Cart
interface GetAllCartCourse {
  title: string;
  price: number | null;
  thumbnailUrl: string;
  userId: number;
  courseId: number;
  teacherNames: string;
}

export interface GetAllCartResponse {
  error: boolean;
  message: string;
  payload: {
    courses: GetAllCartCourse[];
  };
}
// end Get all Cart
//start get course by id public
interface CourseByIdPublicTeacher {
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
  courseTeacher: {
    courseId: number;
    teacherId: number;
  };
  numOfTeachingCourses: number;
  totalStudentsEnrolled: string;
  totalReviews: string;
}

export interface CourseByIdPublicSectionVideo {
  title: string;
  id: number;
  length: number;
  order: number;
  public: boolean;
  sectionId: number;
}

export interface getCourseByIdPublicSection {
  id: number;
  title: string;
  order: number;
  courseId: number;
  totalLength: number | null;
  numOfVideos: string;
  videos: CourseByIdPublicSectionVideo[];
}

interface getCourseByIdPublicCategory {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface getCoursebyidPublic {
  id: number;
  previewVideoUrl: string | null;
  thumbnailUrl: string;
  title: string;
  subtitle: string;
  desc: string;
  beneficiaries: any; // You might want to define the type for this if it's known
  outline: string[];
  prerequisites: string[];
  price: number;
  allowPoints: boolean;
  status: string;
  lang: string;
  level: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  totalReviewsRate: any; // You might want to define the type for this if it's known
  totalLength: number;
  numOfVideos: string;
  numOfSections: string;
  teachers: CourseByIdPublicTeacher[];
  sections: getCourseByIdPublicSection[];
  reviews: any[]; // You might want to define the type for this if it's known
  category: getCourseByIdPublicCategory;
  favorites: any[]; // You might want to define the type for this if it's known
  carts: any[]; // You might want to define the type for this if it's known
  numOfEnrolledStudents: number;
  numOfCourseReviews: number;
  publicVideos: {
    sections: any[]; // You might want to define the type for this if it's known
  };
  isEnrolled: boolean;
}

export interface GetCourseByIdPublicResponse {
  error: boolean;
  message: string;
  payload: {
    course: getCoursebyidPublic;
  };
}

//end get course by id public
export interface changeOrderSectionREQ {
  courseId?: number;
  currentOrder?: number;
  newOrder?: number;
}
export interface changeOrderSectionRES {
  error: boolean;
  message: string;
  payload: {
    newSection: {
      courseId: number;
      id: number;
      order: number;
      title: string;
    };
  };
}
export interface changeOrderVideoREQ {
  targetSectionId?: number;
  currentSectionId?: number;
  currentOrder?: number;
  newOrder?: number;
  courseId?: number;
}
